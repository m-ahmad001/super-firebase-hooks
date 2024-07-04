import {
  addDoc,
  setDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

/**
 * FirebaseQuery class to handle Firestore operations
 */
class FirebaseQuery {
  /**
   * Constructor to initialize FirebaseQuery with a Firestore instance
   * @param {Firestore} firestoreInstance - Firestore instance
   */
  constructor(firestoreInstance) {
    this.db = firestoreInstance;
    this.firestoreCollection = null;
    this.firestoreQuery = null;
  }

  /**
   * Method to select a collection
   * @param {string} collectionName - Name of the collection
   * @returns {FirebaseQuery} - Returns the FirebaseQuery instance for chaining
   */
  select(collectionName) {
    this.firestoreCollection = collection(this.db, collectionName);
    this.firestoreQuery = this.firestoreCollection;
    return this;
  }

  /**
   * Method to filter documents based on a field and value
   * @param {string} field - Name of the field to filter
   * @param {string} operator - Comparison operator (e.g., '==', '>', '<')
   * @param {any} value - Value to compare against
   * @returns {FirebaseQuery} - Returns the FirebaseQuery instance for chaining
   */
  where(field, operator, value) {
    this.firestoreQuery = query(
      this.firestoreQuery,
      where(field, operator, value)
    );
    return this;
  }

  /**
   * Method to execute the query and fetch documents
   * @returns {Promise<{data: Object[], error: string}>} - Returns the data or error
   */
  async get() {
    try {
      const snapshot = await getDocs(this.firestoreQuery);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return { data };
    } catch (error) {
      return { error: error.message };
    }
  }

  /**
   * Method to insert a new document into the collection
   * @param {Object} data - Data to be inserted
   * @param {string} [id] - Optional ID of the document
   * @returns {Promise<{id: string, error: string}>} - Returns the inserted document ID or error
   */
  async insert(data, id) {
    try {
      let docRef;
      if (id) {
        docRef = doc(this.firestoreCollection, id);
        await setDoc(docRef, data);
      } else {
        docRef = await addDoc(this.firestoreCollection, data);
      }
      return { id: docRef.id };
    } catch (error) {
      return { error: error.message };
    }
  }

  /**
   * Method to insert multiple documents into the collection
   * @param {Object[]} data - Array of data to be inserted
   * @returns {Promise<{ids: string[], error: string}>} - Returns the inserted document IDs or error
   */
  async insertMany(data) {
    try {
      const ids = [];

      // Create a batched write operation
      data.forEach(async (docData) => {
        const docRef = await addDoc(this.firestoreCollection, docData);

        ids.push(docRef.id);
      });

      return { ids };
    } catch (error) {
      return { error: error.message };
    }
  }

  /**
   * Method to update an existing document in the collection
   * @param {string} id - ID of the document to update
   * @param {Object} data - Updated data
   * @returns {Promise<{error: string}>} - Returns an error message if any
   */
  async update(id, data) {
    try {
      const docRef = doc(this.firestoreCollection, id);
      await updateDoc(docRef, data);
      return {};
    } catch (error) {
      return { error: error.message };
    }
  }

  /**
   * Method to delete a document from the collection
   * @param {string} id - ID of the document to delete
   * @returns {Promise<{error: string}>} - Returns an error message if any
   */
  async delete(collection, id) {
    console.log("🚀 ~ FirebaseQuery ~ delete ~ id:", id, collection);
    try {
      const docRef = doc(this.db, collection, id);
      await deleteDoc(docRef);
      return {};
    } catch (error) {
      return { error: error.message };
    }
  }

  /**
   * Method to retrieve a document by its ID
   * @param {string} id - ID of the document to retrieve
   * @returns {Promise<{data: Object, error: string}>} - Returns the document data or error
   */
  async getById(id) {
    try {
      const docRef = doc(this.firestoreCollection, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { data: { id: docSnap.id, ...docSnap.data() } };
      } else {
        return { error: "Document does not exist" };
      }
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default FirebaseQuery;
