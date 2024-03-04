// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

class FirestoreWrapper {
  constructor(config) {
    initializeApp(config);
    this.db = getFirestore();
  }

  select(collectionName) {
    this.collectionRef = collection(this.db, collectionName);
    return this;
  }
  where(field, operator, value) {
    this.queryRef = query(this.collectionRef, where(field, operator, value));
    return this;
  }

  // Select documents
  async get() {
    try {
     if (!this.queryRef) {
      this.queryRef = query(this.collectionRef);
    }
    const querySnapshot = await getDocs(this.queryRef);
    const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return { data, error: null };
    } catch (error) {
      console.error("Error getting documents: ", error);
      return { data: null, error };
    }
  }

  // Insert a document
  async insert(doc) {
    try {
      const docRef = await addDoc(this.collectionRef, doc);
      return { error: null };
    } catch (error) {
      console.error("Error adding document: ", error);
      return { error };
    }
  }

  // Update a document
  async update(docId, updates) {
    try {
      const docRef = doc(this.db, this.collectionRef.path, docId);
      await updateDoc(docRef, updates);
      return { error: null };
    } catch (error) {
      console.error("Error updating document: ", error);
      return { error };
    }
  }

  // Delete a document
  async delete(docId) {
    try {
      const docRef = doc(this.db, this.collectionRef.path, docId);
      await deleteDoc(docRef);
      return { error: null };
    } catch (error) {
      console.error("Error deleting document: ", error);
      return { error };
    }
  }
}

const superquery = new FirestoreWrapper({
  // your Firebase config here
});

export default superquery;
