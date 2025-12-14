# 🔐 AuthenTrack – Smart Attendance & Approval System

AuthenTrack is a **full-stack smart attendance management system** that automates student attendance verification using **face recognition**, generates **verified PDFs**, and supports **multi-level approval with digital signatures**.

This project solves real-world problems of fake attendance, manual verification, and paper-based approval workflows.

---

## 🚀 Features

### 👨‍🎓 Student Module
- Event registration
- Face capture & attendance marking
- Live attendance verification
- Secure submission with timestamp & location

### 🧑‍💼 Coordinator Module
- Create & manage events
- Review live attendance
- Approve verified students
- Generate **Verified Attendance PDF**
- Send report to Academic Head

### 🧑‍🏫 Academic Head (Director) Module
- View latest event automatically
- Review coordinator-generated PDF
- Draw or upload **digital signature**
- **Final approval**
- Generate **Final Signed PDF (Merged)**
- Share or download final report

### 🔐 Security & Authentication
- JWT-based authentication
- Role-based authorization (Student / Coordinator / Director)
- Secure API access
- Protected routes on frontend & backend

### 🧠 Advanced Highlights
- Digital signature capture using Canvas
- PDF generation using PDFKit
- Final PDF merging using pdf-lib
- Cloudinary integration for image storage
- MongoDB relational referencing
- Fully responsive UI (Mobile + Desktop)

---

## 🧠 Smart Workflow

Student → Face Verification → Coordinator Approval → PDF Generation
→ Director Signature → Final Signed PDF → Archive

---

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Framer Motion
- Lucide Icons
- HTML5 Canvas (Digital Signature)
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- PDFKit (Coordinator PDF)
- pdf-lib (PDF merge + signature embedding)
- Multer
- Cloudinary (Signature & image storage)

---

## 📂 Project Structure

AuthenTrack/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── public/
│   │   ├── director_pdfs/
│   │   └── final_signed_pdfs/
│   ├── server.js
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
│
└── README.md


### ⚙️ Installation & Setup

1️⃣ Clone Repository

- git clone https://github.com/your-username/AuthenTrack.git
- cd AuthenTrack

2️⃣ Backend Setup

- cd backend
- npm install

### Create .env file:

- PORT=5000
- MONGO_URI=your_mongodb_url
- JWT_SECRET=your_secret
- CLOUDINARY_NAME=xxx
- CLOUDINARY_API_KEY=xxx
- CLOUDINARY_API_SECRET=xxx

### Run backend:
- nodemon server.js

3️⃣ Frontend Setup

- cd frontend
- npm install
- npm run dev

### Frontend runs on:
- http://localhost:5173


### 📄 PDF Workflow Explained

1️⃣ Coordinator verifies students
2️⃣ Coordinator generates Verified Attendance PDF
3️⃣ Director reviews PDF
4️⃣ Director adds digital signature
5️⃣ System merges PDF + signature
6️⃣ Final signed PDF stored & shared

- ✔ No data tampering
- ✔ Full audit trail


### 🧪 Tested Scenarios

- Multiple event handling
- Deleted event recovery
- Invalid event protection
- Signature upload validation
- PDF merge accuracy
- Role-based access testing


### 📌 Use Cases

- Colleges & Universities
- Event attendance management
- Academic audits
- Official attendance certification


### 🏆 Project Status

✅ Fully Integrated
✅ Production-ready
🚀 Scalable Architecture


## 👨‍💻 Development Team

This project was collaboratively developed by:

- **Yash** – MERN Stack Developer | App Developer | AI/ML Enthusiast
- **Anshi** – Machine Learning | Python | Deep Learning (TensorFlow/PyTorch) | Computer Vision
- **Supriya** – Expertise in frontend development | Enthusiastic AI/ML 
- **Shreya** – Python | Django | 


### ⭐ Final Note

- “This project was built after debugging countless errors, refining workflows, and ensuring real-world usability. Every feature reflects a practical problem solved with code.”