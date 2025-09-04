from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import sale_prediction_route

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# routes
app.include_router(sale_prediction_route.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
