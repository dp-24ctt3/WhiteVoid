# WhiteVoid - A to-do app

A simple to-do app with a OS aesthetic interface.

Built with Python + FastAPI and React.

## Features
- Create, read, update, and delete tasks.
- Automatic task status updates based on deadline.
- Authentication using Firebase.

## File structure
```
WhiteVoid/
├── backend/
│   ├── config/
│   │   └── firebase_config.py      # Initialises the Firebase Admin SDK
│   ├── dependencies/
│   │   └── auth.py                 # FastAPI dependency: verifies Firebase ID token
│   ├── models/
│   │   └── task_models.py          # Schemas for task request/response validation
│   ├── routes/                     # API endpoints
│   │   ├── tasks.py
│   │   ├── protected.py
│   │   └── default.py
│   ├── main.py                     # FastAPI app entry point
│   ├── requirements.txt            # Python dependencies
│   ├── .env                        # Credentials (not committed)
│   └── .env.example                # Template for .env
│
└── frontend/
    ├── src/
    │   ├── config/
    │   │   └── firebase.js         # Initialises Firebase client SDK
    │   ├── context/
    │   │   └── authContext.jsx     # React context that exposes the current Firebase user
    │   ├── services/
    │   │   ├── auth.js             # Firebase Auth helpers
    │   │   └── tasks.js            # Task-related feature helpers
    │   ├── utils/
    │   │   ├── api.js              # Axios instance: attaches Bearer token to every request
    │   │   └── authErrors.js       # Human-readable messages mapped from Firebase errors
    │   ├── pages/                  # App pages
    │   │   ├── Dashboard.jsx
    │   │   └── Login.jsx
    │   ├── components/             # UI components
    │   │   ├── Taskbar.jsx         
    │   │   ├── CenterPanel.jsx
    │   │   ├── TaskList.jsx
    │   │   ├── TaskCard.jsx
    │   │   ├── DetailPanel.jsx
    │   │   └── Routing.jsx         # Route wrappers
    │   ├── routes.jsx              # Route tree
    │   ├── App.jsx                 # Main app component
    │   ├── main.jsx                # App entry point
    │   ├── index.css
    │   └── App.css
    ├── .env                        # Firebase configuration (not committed)
    ├── .env.example                # Template for .env
    ├── index.html                  # HTML template
    ├── vite.config.js              # Vite config
    └── package.json                # Node dependencies and npm scripts

```

## Installation
> Developed and tested on Python 3, Node 24.14.1, npm 11.11.0.

### 1. Clone the repository
In the terminal, run the following command:
```bash
git clone https://github.com/dp-24ctt3/WhiteVoid.git
cd WhiteVoid
```
#### IMPORTANT:

**The following guide will have 2 terminals open at the same time.**

Starting from WhiteVoid folder:

On one terminal, navigate to backend folder:
```bash
cd backend
```
On the other, navigate to frontend folder:
```bash
cd frontend
```

### 2. Setup Firebase
1. Go to the Firebase Console
2. Create a new project
3. Enable Firestore
4. Enable Authentication on email + password and Google Authentication
5. In Firestore, go to Indexes → Composite and create an index:
   - Collection: tasks
   - Fields: user_id (Ascending), created_at (Descending)
6. Download the service account JSON file
7. Setup .env files

    From backend terminal:
    ```bash
    cp .env.example .env
    ```
    Copy the service account JSON file to the .env in your backend folder, **REMEMBER** to put the keys on a **single line**.

    From frontend terminal:
    ```bash
    cp .env.example .env
    ```
    Copy the Firebase configuration to the .env in your frontend folder.

    > Restart the dev server after any changes to `.env`.

### 3. Install dependencies
From backend terminal:
```bash
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```
From frontend terminal:
```bash
# Install dependencies
npm install
```
### 4. Run the app
Run the backend, from backend terminal:
```bash
uvicorn main:app --reload
```
Run the frontend, from frontend terminal:
```bash
npm run dev
```

## Demo video
[![Demo](https://github.com/user-attachments/assets/9d30e6ed-7a0b-4731-92c2-a1234f9feef8)](https://www.youtube.com/watch?v=zTzxsZPAqoQ)
