from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse
from controllers.image_captioning import generate_caption
from controllers.sale_prediction import sale_prediction
from controllers.image_url_generator import upload_image_to_imgbb

router = APIRouter(
    prefix="/predict_sale",
    tags=["Image Captioning"]
)

@router.post("/analysis")
async def predict_sale(
    image: UploadFile = File(...),
    additional_info: str = Form(...)
):
    try:
        # Read image as bytes
        image_bytes = await image.read()
        
        if not image_bytes:
            raise HTTPException(status_code=400, detail="Uploaded image is empty.")

        # Upload to ImgBB → get public URL
        image_url = upload_image_to_imgbb(image_bytes)

        if not image_url:
            raise HTTPException(status_code=500, detail="Image upload failed")

        # Generate caption with Hive API
        caption = generate_caption(image_url)
        if not caption:
            raise HTTPException(status_code=500, detail="Failed to generate caption.")
        print("status code: 200, caption generated")

        # Predict sale
        prediction = sale_prediction(caption, additional_info)
        if not prediction:
            raise HTTPException(status_code=500, detail="Failed to generate sale prediction.")

        return JSONResponse(
            status_code=201,
            content={"caption": caption, "sale_prediction": prediction}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
