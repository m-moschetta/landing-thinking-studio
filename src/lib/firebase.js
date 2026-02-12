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

// Firebase si inizializza solo se la config è presente
const isConfigured = !!firebaseConfig.apiKey && !!firebaseConfig.projectId;
const app = isConfigured ? initializeApp(firebaseConfig) : null;
const db = app ? getFirestore(app) : null;

/**
 * Crea una nuova conversazione in Firestore.
 * Ritorna l'ID del documento creato, o null se Firebase non è configurato.
 */
export async function createConversation(initialMessages) {
  if (!db) return null;
  try {
    const docRef = await addDoc(collection(db, "conversations"), {
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

/**
 * Aggiorna i messaggi di una conversazione esistente.
 */
export async function updateConversation(conversationId, messages, status) {
  if (!db || !conversationId) return;
  try {
    await updateDoc(doc(db, "conversations", conversationId), {
      messages,
      ...(status ? { status } : {}),
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn("Firebase: impossibile aggiornare conversazione", err);
  }
}

/**
 * Salva i dati di contatto del lead sulla conversazione.
 */
export async function saveLeadContact(conversationId, email, phone) {
  if (!db || !conversationId) return;
  try {
    await updateDoc(doc(db, "conversations", conversationId), {
      email,
      phone,
      status: "lead_captured",
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn("Firebase: impossibile salvare contatto", err);
  }
}
