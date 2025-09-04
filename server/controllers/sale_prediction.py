import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

# Configure Gemini API client
genai.configure(api_key=GEMINI_API_KEY)

# Configure the generation settings for the AI model
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192
}

# Initialize the generative AI model
story_model = genai.GenerativeModel(
    model_name="gemini-2.0-flash-exp",
    generation_config=generation_config,
)

def sale_prediction(image_caption: str, additional_info: str):
    
    prompt = f"""
        You are a professional automotive valuation AI. 
        Your ONLY task is to provide:

        1. **Price Estimate (INR)** → a realistic resale/auction price range in India.  
        2. **Reasoning** → a detailed, structured explanation of how each factor (damages, mileage, year, fuel type, transmission, city, and other notes) impacts the price.  

        Strict rules:
        - Do NOT include introductions like "Okay, here is the report".
        - Do NOT add disclaimers or ask for more info.
        - Output ONLY in the following Markdown format:

        ### Price Estimate (INR)
        ₹X – ₹Y

        ### Reasoning
        - [Factor 1]: [Impact on price]
        - [Factor 2]: [Impact on price]
        - ...
        - Final adjustment explanation.

        --- Car Inspection Report (from VLM) ---
        {image_caption}

        --- Additional User Information ---
        {additional_info}
    """
    response = story_model.generate_content(prompt)
    return response.text