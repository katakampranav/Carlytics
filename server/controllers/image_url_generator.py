import requests
import base64
import os
from dotenv import load_dotenv

load_dotenv()

IMGBB_API_KEY = os.getenv("IMGBB_API_KEY")

def upload_image_to_imgbb(image_bytes: bytes) -> str:
    """
    Uploads raw image bytes to ImgBB and returns the public URL.
    Raises an Exception if upload fails.
    """
    if not IMGBB_API_KEY:
        raise ValueError("❌ IMGBB_API_KEY not found in environment variables.")

    # Convert image bytes → base64 string
    base64_image = base64.b64encode(image_bytes).decode("utf-8")

    response = requests.post(
        "https://api.imgbb.com/1/upload",
        data={
            "key": IMGBB_API_KEY,
            "image": base64_image
        }
    )

    if response.status_code == 200:
        return response.json()["data"]["url"]
    else:
        raise Exception(
            f"❌ Error uploading image: {response.status_code} | {response.text}"
        )
