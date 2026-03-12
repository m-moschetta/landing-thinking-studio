import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const isConfigured = !!firebaseConfig.apiKey && !!firebaseConfig.projectId;
const app = isConfigured ? initializeApp(firebaseConfig) : null;
const db = app ? getFirestore(app) : null;

export async function createConversation(initialMessages) {
  if (!db) return null;
  try {
    const docRef = await addDoc(collection(db, "landingbot_conversations"), {
      messages: initialMessages,
      createdAt: serverTimestamp(),
      status: "active",
    });
    return docRef.id;
  } catch (err) {
    console.warn("Firebase: impossibile creare conversazione", err);
    return null;
  }
}

export async function updateConversation(conversationId, messages, status) {
  if (!db || !conversationId) return;
  try {
    await updateDoc(doc(db, "landingbot_conversations", conversationId), {
      messages,
      ...(status ? { status } : {}),
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn("Firebase: impossibile aggiornare conversazione", err);
  }
}

export async function saveLeadContact(conversationId, email, phone) {
  if (!db || !conversationId) return;
  try {
    await updateDoc(doc(db, "landingbot_conversations", conversationId), {
      email,
      phone,
      status: "lead_captured",
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn("Firebase: impossibile salvare contatto", err);
  }
}

export async function saveFormLead(data) {
  if (!db) return null;
  try {
    const docRef = await addDoc(collection(db, "landingbot_form_leads"), {
      ...data,
      createdAt: serverTimestamp(),
      status: "new",
    });
    return docRef.id;
  } catch (err) {
    console.warn("Firebase: impossibile salvare form lead", err);
    return null;
  }
}
