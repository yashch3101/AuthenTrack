import os
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from .cloudinary_utils import upload_file
from .ml_utils import generate_embedding_from_bytes, verify_embeddings

load_dotenv()

app = FastAPI(title="Face-ML Service")

REGISTERED_FOLDER = os.getenv("CLOUDINARY_REGISTERED_FOLDER", "smart_attendance/registered_photos")
LIVE_FOLDER = os.getenv("CLOUDINARY_LIVE_FOLDER", "smart_attendance/live_photos")

@app.post("/embedding/register")
async def register_embedding(file: UploadFile = File(...)):
    
    contents = await file.read()
    
    # generate embedding
    emb = generate_embedding_from_bytes(contents, enforce_detection=True)
    if emb is None:
        raise HTTPException(status_code=400, detail="No face detected in registration photo")

    # cloudinary 
    upload_res = upload_file(contents, folder=REGISTERED_FOLDER)
    return JSONResponse({"photo_url": upload_res.get("url"), "public_id": upload_res.get("public_id"), "embedding": emb})

@app.post("/verify")
async def verify_face(
    live_file: UploadFile = File(...),
    registered_embedding: str = Form(None)
):
    import json
    live_bytes = await live_file.read()
    
       # upload live photo first
    upload_res = upload_file(live_bytes, folder=LIVE_FOLDER)
    live_url = upload_res.get("url")
    live_pid = upload_res.get("public_id")
    
    #live embedding
    live_emb = generate_embedding_from_bytes(live_bytes, enforce_detection=True)
    if live_emb is None:
        return JSONResponse({"match": False, "reason": "no_face_detected_live", "live_photo_url": live_url}, status_code=200)
    
        #registered embedding
    if not registered_embedding:
        return JSONResponse({"error": "registered_embedding required (stringified JSON array)"}, status_code=400)

    try:
        registered_emb = json.loads(registered_embedding)
        if not isinstance(registered_emb, list):
            raise ValueError("registered_embedding should be a list")
    except Exception:
        try:
            registered_emb = [float(x) for x in registered_embedding.split(",")]
        except Exception:
            return JSONResponse({"error": "cannot parse registered_embedding"}, status_code=400)
        
        #compare
    result = verify_embeddings(registered_emb, live_emb)
    result.update({"live_photo_url": live_url, "live_public_id": live_pid})
    return JSONResponse(result)
