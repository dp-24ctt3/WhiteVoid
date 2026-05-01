import os
import json
import firebase_admin

from dotenv import load_dotenv
load_dotenv()

from firebase_admin import credentials, firestore

def init_firebase_admin():
    if not firebase_admin._apps:
        cred_dict = json.loads(os.getenv('FIREBASE_SERVICE_ACCOUNT'))
        cred = credentials.Certificate(cred_dict)
        firebase_admin.initialize_app(cred)

def get_firestore():
    init_firebase_admin()
    return firestore.client()
