import { initializeApp } from 'firebase/app';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getFirestore,
} from 'firebase/firestore';
import { FIREBASE_API } from '../config-global';
import uuidv4 from 'src/utils/uuidv4';

// Initialize Firebase app
const app = initializeApp(FIREBASE_API);
const DB = getFirestore(app);

/**
 * FirebaseQuery class to handle Firestore operations
 */
class FirebaseQuery {
  /**
   * Constructor to initialize FirebaseQuery with a collection name
   * @param {string} collectionName - Name of the Firestore collection
   */
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.firestoreCollection = collection(DB, collectionName);
    this.firestoreQuery = null;
  }

  /**
   * Method to select specific fields from the collection
   * @param {string|string[]} [fields='*'] - Field(s) to select. Pass '*' to select all fields.
   * @returns {FirebaseQuery} - Returns the FirebaseQuery instance for chaining
   */
  select(fields = '*') {
    try {
      if (fields === '*') {
        this.firestoreQuery = this.firestoreCollection;
      } else {
        this.firestoreQuery = query(this.firestoreCollection, ...fields);
      }
      return this;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Method to filter documents based on a field and value
   * @param {string} field - Name of the field to filter
   * @param {string} operator - Comparison operator (e.g., '==', '>', '<')
   * @param {any} value - Value to compare against
   * @returns {FirebaseQuery} - Returns the FirebaseQuery instance for chaining
   */
  where(field, operator, value) {
    try {
      this.firestoreQuery = query(this.firestoreQuery, where(field, operator, value));
      return this;
    } catch (error) {
      throw new Error(error.message);
    }
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
   * @returns {Promise<{id: string, error: string}>} - Returns the inserted document ID or error
   */
  async insert(data) {
    try {
      const docRef = await addDoc(this.firestoreCollection, data);
      return { id: docRef.id };
    } catch (error) {
      return { error: error.message };
    }
  }

  /**
   * Method to insert multiple documents into the collection
   * @param {Object[]} data - Array of data objects to be inserted
   * @returns {Promise<{ids: string[], error: string}>} - Returns an array of inserted document IDs or an error
   */
  async insertMany(data) {
    try {
      const ids = [];

      // Create a batched write operation
      for (const docData of data) {
        const docRef = await addDoc(this.firestoreCollection, docData);
        ids.push(docRef.id); // Extract and store the ID of the inserted document
      }

      // Return the IDs of the inserted documents
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
  async delete(id) {
    try {
      const docRef = doc(this.firestoreCollection, id);
      await deleteDoc(docRef);
      return {};
    } catch (error) {
      return { error: error.message };
    }
  }
}

// (async () => {
//   try {
//     // Query: SELECT * FROM countries WHERE name = 'Albania'
//     const { data: countriesData, error: countriesError } = await new FirebaseQuery('countries')
//       .select()
//       .where('name', '==', 'Albania')
//       .get();

//     console.log('Countries Data:', countriesData);
//     if (countriesError) console.error('Countries Error:', countriesError);

//     // Query: SELECT * FROM countries WHERE population > 1000000
//     const { data: populousCountriesData, error: populousCountriesError } = await new FirebaseQuery(
//       'countries'
//     )
//       .select()
//       .where('population', '>', 1000000)
//       .get();

//     console.log('Populous Countries Data:', populousCountriesData);
//     if (populousCountriesError) console.error('Populous Countries Error:', populousCountriesError);

//     // Query: SELECT id, name FROM countries WHERE continent = 'Europe' AND population > 5000000
//     const { data: europeanBigCountriesData, error: europeanBigCountriesError } =
//       await new FirebaseQuery('countries')
//         .select(['id', 'name'])
//         .where('continent', '==', 'Europe')
//         .where('population', '>', 5000000)
//         .get();

//     console.log('European Big Countries Data:', europeanBigCountriesData);
//     if (europeanBigCountriesError)
//       console.error('European Big Countries Error:', europeanBigCountriesError);

//     // Insert: INSERT INTO countries (name, population) VALUES ('Germany', 83000000)
//     const { id: germanyId, error: germanyError } = await new FirebaseQuery('countries').insert({
//       name: 'Germany',
//       population: 83000000,
//     });

//     console.log('Germany ID:', germanyId);
//     if (germanyError) console.error('Germany Insert Error:', germanyError);

//     // Update: UPDATE countries SET population = 85000000 WHERE id = germanyId
//     await new FirebaseQuery('countries').update(germanyId, { population: 85000000 });

//     // Delete: DELETE FROM countries WHERE id = germanyId
//     await new FirebaseQuery('countries').delete(germanyId);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// })();

export default FirebaseQuery;
