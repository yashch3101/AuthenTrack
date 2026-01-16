import os
from dotenv import load_dotenv, find_dotenv

print("find_dotenv:", find_dotenv())
load_dotenv(find_dotenv())
print("CLOUD_NAME:", repr(os.getenv("CLOUDINARY_CLOUD_NAME")))
print("API_KEY:", repr(os.getenv("CLOUDINARY_API_KEY")))
print("API_SECRET present:", bool(os.getenv("CLOUDINARY_API_SECRET")))