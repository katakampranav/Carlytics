import requests
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv('IMGBB_API_KEY')

def upload_image_to_imgbb(image_data):
    """Uploads base64 image data to ImgBB and returns the URL"""
    response = requests.post(
        "https://api.imgbb.com/1/upload",
        data={
            "key": api_key,
            "image": image_data
        }
    )
    
    if response.status_code == 200:
        return response.json()["data"]["url"]
    else:
        print(f"❌ Error uploading image: {response.text}")
        return None
    
    
print(upload_image_to_imgbb('''iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAYAAAA+5mJIAAAABHNCSVQICAgIfAhkiAAAAAlwSFlz'''))