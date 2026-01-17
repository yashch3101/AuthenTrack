import json
import tempfile
import numpy as np
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse
from deepface import DeepFace

app = FastAPI(title="Face Verify API")

def get_embedding(upload: UploadFile):
    contents = upload.file.read()

    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp:
        tmp.write(contents)
        tmp_path = tmp.name

    reps = DeepFace.represent(
        img_path=tmp_path,
        model_name="Facenet512",
        enforce_detection=True
    )

    # Accept multiple DeepFace formats
    emb = (
        reps[0].get("embedding") or
        reps[0].get("embeddings") or
        reps[0].get("representation")
    )

    if emb is None:
        raise ValueError("DeepFace embedding not found")

    # Ensure pure python list
    if isinstance(emb, list) and len(emb) == 512:
        return emb

    # Clean numpy floats → python floats
    clean = [float(x) for x in list(emb)[:512]]

    return clean

def cosine_similarity(a, b):
    a = np.array(a)
    b = np.array(b)
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

@app.get("/")
def health():
    return {"status": "ML service running"}

@app.on_event("startup")
def preload_models():
    DeepFace.build_model("VGG-Face")

@app.post("/embedding/register")
async def register_face(file: UploadFile = File(...)):
    try:
        emb = get_embedding(file)
        return {
            "embedding": emb,
            "length": len(emb)
        }
    except Exception as e:
        raise HTTPException(400, str(e))

@app.post("/verify")
async def verify_face(
    live_file: UploadFile = File(...),
    registered_embedding: str = Form(...)
):
    print("RAW EMBEDDING =>", registered_embedding[:100])
    print("RAW LENGTH =>", len(registered_embedding))

    cleaned = registered_embedding.strip().strip('"').strip("'")

    print("CLEANED LENGTH =>", len(cleaned))

    try:
        reg_emb = json.loads(cleaned)
        if not isinstance(reg_emb, list) or len(reg_emb) < 10:
            raise ValueError("Parsed embedding invalid")
    except Exception as e:
        raise HTTPException(400, f"Invalid registered_embedding: {str(e)}")

    reg_emb = np.array(reg_emb, dtype=np.float32)

    try:
        live_emb = get_embedding(live_file)
        live_emb = np.array(live_emb, dtype=np.float32)
    except Exception as e:
        return {"match": False, "reason": "no_face_detected"}

    reg_norm = reg_emb / np.linalg.norm(reg_emb)
    live_norm = live_emb / np.linalg.norm(live_emb)

    sim = float(np.dot(reg_norm, live_norm))
    score = round(sim * 100, 2)

    return {
        "match": score >= 50,
        "similarity": sim,
        "score_percent": score,
        "distance": round(1 - sim, 3)
    }