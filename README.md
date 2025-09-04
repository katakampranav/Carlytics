# Carlytics

Carlytics is an AI-powered web application that allows users to upload images of their cars and receive detailed analyses, including estimated price and reasoning behind the valuation. Built using **React**, **FastAPI**, and **AI-driven image captioning & sale prediction models**, Carlytics makes car valuation intuitive and engaging.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Details](#api-details)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **AI-based Image Captioning:**  
  Carlytics uses an image captioning model to automatically analyze the uploaded car photo and extract key visual details, such as make, model, color, visible damages, and overall condition. This step transforms raw visual data into structured textual information, which is essential for accurate price prediction.

- **Generative AI (Gemini) for Reasoning:**  
  Gemini is used to interpret the structured information from the image along with user-provided car details. It generates a comprehensive reasoning and explanation for the estimated resale price, making the analysis transparent and understandable.

- **Car Sale Prediction Model:**  
  Using the captioned image and additional details (year, mileage, fuel type, transmission, city, and notes), a custom Python model predicts a realistic price range for the car. The model accounts for factors like damage severity, market trends, and car condition.

- **Detailed Reasoning for Price:**  
  Beyond providing just a number, Carlytics generates a breakdown of how each factor (damages, mileage, year, fuel type, etc.) affects the estimated price. This allows users to understand the logic behind the prediction and make informed decisions.

- **End-to-End AI Pipeline:**  
  The app seamlessly combines computer vision (image captioning), generative AI (Gemini), and predictive modeling to provide a fully automated analysis from image upload to price reasoning.

---

## Tech Stack

- **Frontend:** React, TailwindCSS
- **Backend:** FastAPI, Python 3.11
- **AI Models:**  
  - Image Captioning (Hive API)  
  - Sale Prediction (Google Gemini Flash 2.5)
- **File Storage:** ImgBB API (for image hosting)
- **HTTP Requests:** Axios
- **Routing:** React Router DOM

---

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/katakampranav/Carlytics.git
cd carlytics
````

2. **Install frontend dependencies:**

```bash
cd client
npm install
```

3. **Install backend dependencies:**

```bash
cd ../server
python -m venv .venv
.venv/Scripts/Activate
pip install -r requirements.txt
```

4. **Run the backend:**

```bash
python main.py
```

5. **Run the frontend:**

```bash
cd ../client
npm run dev
```

---

## Usage

1. Open the app in your browser (default: `http://localhost:3000`).
2. Upload a car image and enter additional details (year, mileage, fuel type, etc.).
3. Click **Get Price Estimate**.
4. View the result on the **Result Page**, including the price estimate and reasoning.
5. Use **Analyze Another Car** button to restart.

---

## Project Structure

```
Carlytics/
│
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── CarForm.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── ResultPage.jsx
│   │   └── App.jsx
│   └── package.json
│
├── server/                  # FastAPI backend
│   ├── controllers/
│   │   ├── image_captioning.py
│   │   ├── sale_prediction.py
│   │   └── image_url_generator.py
│   ├── main.py
│   ├── requirements.txt
│   └── routes.py
│
└── README.md
```

---

## API Details

**Endpoint:** `POST /predict_sale/analysis`

**Request:** `multipart/form-data`

* `image` – Car image file (PNG, JPG, up to 10MB)
* `additional_info` – Text input with extra car details

**Response:** JSON

```json
{
  "caption": "...",         // Optional, used for internal reasoning
  "sale_prediction": "..."  // Price estimate and detailed reasoning
}
```

---

## Contributing

We welcome contributions!

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes.
4. Commit your changes: `git commit -m "Add feature"`
5. Push to the branch: `git push origin feature-name`
6. Open a Pull Request.

---

## Screenshots

**Home Page:**

<img width="1916" height="871" alt="Image" src="https://github.com/user-attachments/assets/27222e53-5ac9-45f5-b348-33da700a370b" />


**Result Page:**

<img width="1894" height="871" alt="Image" src="https://github.com/user-attachments/assets/988db1e0-ce8a-496e-99ff-5a56039e5038" />
<img width="1896" height="228" alt="Image" src="https://github.com/user-attachments/assets/85e9dcf1-f09a-4298-91c1-394e1f5f6860" />

---

## Author

**Katakam Pranav Shankar** – [GitHub](https://github.com/yourusername)

---
