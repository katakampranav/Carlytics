from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

HIVE_API_KEY = os.getenv('HIVE_API_KEY')

def generate_caption(img_url):
    client = OpenAI(base_url="https://api.thehive.ai/api/v3/", api_key=HIVE_API_KEY)

    response = client.chat.completions.create(
        model="hive/vision-language-model",
        messages=[
            {"role":"user","content":[
                {"type":"text","text": "You are an automotive inspection AI. Look at this car image and provide a detailed inspection report including: " +
                "- Estimated make and model (if visible)\n" +
                "- Color\n" +
                "- Visible damages (scratches, dents, broken glass, missing parts)\n" +
                "- Severity of damages (minor, moderate, severe)\n" +
                "- Location of damages on the car\n" +
                "- Overall condition of the car (Good, Fair, Poor)\n" +
                "- Any other visible notes relevant to resale (tires, headlights, cosmetic imperfections)\n\n" +
                "Output in a structured bullet-point format. Do NOT add any information that cannot be inferred from the image."},
                {"type":"image_url","image_url":{"url": img_url}}
            ]}
        ],
        max_tokens=50,
    )
    
    return response.choices[0].message.content
