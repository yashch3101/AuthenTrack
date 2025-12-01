import os
import tempfile
import numpy as np
from deepface import DeepFace
from deepface.commons import functions
from dotenv import load_dotenv

load_dotenv()

MODEL_NAME = os.getenv("MODEL_NAME", "Facenet512")
DEFAULT_THRESHOLD = float(os.getenv("THRESHOLD", 0.65))

def _write_bytes_to_tempfile(b):
    tf = tempfile.NamedTemporaryFile(delete=False, suffix=".jpg")
    tf.write(b)
    tf.flush()
    tf.close()
    return tf.name

def generate_embedding_from_path(image_path, enforce_detection=True):
    """
    Return embedding list (or None on failure)
    """
    try:
        reps = DeepFace.represent(img_path=image_path, model_name=MODEL_NAME, enforce_detection=enforce_detection)
        if isinstance(reps, list) and len(reps) > 0:
            emb = reps[0].get("embedding") or reps[0].get("embeddings")
            return emb
        # fallback approach
        img = functions.preprocess_face(img=image_path, target_size=(160,160), enforce_detection=enforce_detection)
        model = DeepFace.build_model(MODEL_NAME)
        vec = model.predict(img)[0].tolist()
        return vec
    except Exception as e:
        # face not detected or model error
        print("generate_embedding_from_path error:", e)
        return None

def generate_embedding_from_bytes(image_bytes, enforce_detection=True):
    path = _write_bytes_to_tempfile(image_bytes)
    return generate_embedding_from_path(path, enforce_detection=enforce_detection)

def compare_embeddings(emb1, emb2):
    """
    Returns euclidean distance (float) or None if invalid
    """
    if emb1 is None or emb2 is None:
        return None
    a = np.array(emb1)
    b = np.array(emb2)
    if a.shape != b.shape:
        try:
            b = b.reshape(a.shape)
        except Exception:
            return None
    dist = float(np.linalg.norm(a - b))
    return dist

def verify_embeddings(registered_embedding, live_embedding, threshold=DEFAULT_THRESHOLD):
    """
    Returns dict: { match: bool, distance: float, score: float }
    score is intuitive 0..1 where higher is better (1 - normalized distance)
    """
    dist = compare_embeddings(registered_embedding, live_embedding)
    if dist is None:
        return {"match": False, "distance": None, "score": 0.0}

    # simple score: 1 - dist, clipped
    score = max(0.0, 1.0 - dist)
    match = dist <= threshold
    return {"match": bool(match), "distance": dist, "score": float(round(score, 4))}
