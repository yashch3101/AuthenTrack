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
        
        print("generate_embedding_from_path error:", e)
        return None

def generate_embedding_from_bytes(image_bytes, enforce_detection=True):
    path = _write_bytes_to_tempfile(image_bytes)
    return generate_embedding_from_path(path, enforce_detection=enforce_detection)

def compare_embeddings(emb1, emb2):
    if emb1 is None or emb2 is None:
        return None
    try:
        emb1 = np.array(emb1)
        emb2 = np.array(emb2)
        dist = float(np.linalg.norm(emb1 - emb2))
        return dist
    except Exception:
        return None

def _ensure_np(x):
    return np.array(x, dtype=np.float32)

def l2_normalize(v):
    v = np.array(v, dtype=np.float32)
    norm = np.linalg.norm(v)
    return v if norm == 0 else v / norm

def cosine_similarity(a, b):
    a = l2_normalize(a)
    b = l2_normalize(b)
    return float(np.dot(a, b))

def verify_embeddings(registered_embedding, live_embedding, threshold=0.85):
    sim = cosine_similarity(registered_embedding, live_embedding)
    score_percent = round(sim * 100, 2)

    return {
        "match": score_percent >= threshold * 100,
        "similarity": round(sim, 4),
        "score_percent": score_percent
    }