import os
from pathlib import Path
from dotenv import load_dotenv, find_dotenv
import cloudinary
import cloudinary.uploader

dotenv_path = find_dotenv()
if dotenv_path:
    load_dotenv(dotenv_path)
else:
    possible = Path(__file__).resolve().parent / ".env"
    if possible.exists():
        load_dotenv(possible)

CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME")
API_KEY = os.getenv("CLOUDINARY_API_KEY")
API_SECRET = os.getenv("CLOUDINARY_API_SECRET")

if not (CLOUD_NAME and API_KEY and API_SECRET):
    raise RuntimeError(
        "Cloudinary credentials not found in environment. Check your .env "
        f"(checked: {dotenv_path or str(possible)})"
    )

cloudinary.config(
    cloud_name=CLOUD_NAME,
    api_key=API_KEY,
    api_secret=API_SECRET,
    secure=True
)

def upload_file(file_path_or_bytes, folder=None, public_id=None):
    options = {}
    if folder:
        options["folder"] = folder
    if public_id:
        options["public_id"] = public_id

    res = cloudinary.uploader.upload(file_path_or_bytes, **options)
    return {"url": res.get("secure_url"), "public_id": res.get("public_id")}