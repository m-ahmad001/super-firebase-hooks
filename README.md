## FirebaseQuery

FirebaseQuery is a simple utility class for handling Firestore operations in Firebase. It provides methods for querying, inserting, updating, and deleting documents in Firestore collections.

### Installation

You can install FirebaseQuery from npm using the following command:

```bash
npm install firebase-query
```

### Usage

To use FirebaseQuery in your project, follow these steps:

1. Initialize Firebase in your project and obtain a Firestore instance.
2. Import the FirebaseQuery class from the `firebase-query` package.
3. Create an instance of FirebaseQuery with the Firestore instance.
4. Chain methods to build and execute Firestore queries.

Here's an example of how to use FirebaseQuery:

```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import FirebaseQuery from 'firebase-query';

// Initialize Firebase app
const app = initializeApp(FIREBASE_API);
const DB = getFirestore(app);

// Create an instance of FirebaseQuery
const firebaseQuery = new FirebaseQuery(DB);

// Example usage: Query documents from the 'countries' collection
const { data, error } = await firebaseQuery
  .select('countries') // Specify the collection name
  .where('population', '>', 1000000) // Filter documents
  .get(); // Execute the query

if (error) {
  console.error('Error:', error);
} else {
  console.log('Data:', data);
}
```

### Methods

#### `select(collectionName: string, fields: string[] | string = '*'): FirebaseQuery`

Selects specific fields from the specified collection. If `fields` is '*', selects all fields. Returns a FirebaseQuery instance for chaining.

Example:
```javascript
firebaseQuery.select('countries', ['name', 'population']);
```

#### `where(field: string, operator: string, value: any): FirebaseQuery`

Filters documents based on a field, operator, and value. Returns a FirebaseQuery instance for chaining.

Example:
```javascript
firebaseQuery.where('population', '>', 1000000);
```

#### `get(): Promise<{data: Object[], error: string}>`

Executes the query and fetches documents from Firestore. Returns an object containing the data array or an error message.

Example:
```javascript
const { data, error } = await firebaseQuery.get();
```

#### `insert(data: Object): Promise<{id: string, error: string}>`

Inserts a new document into the collection. Returns an object containing the inserted document ID or an error message.

Example:
```javascript
const { id, error } = await firebaseQuery.insert({ name: 'Germany', population: 83000000 });
```

#### `insertMany(data: Object[]): Promise<{ids: string[], error: string}>`

Inserts multiple documents into the collection. Returns an object containing the inserted document IDs or an error message.

Example:
```javascript
const { ids, error } = await firebaseQuery.insertMany([
  { name: 'France', population: 67000000 },
  { name: 'Italy', population: 60000000 },
]);
```

#### `update(id: string, data: Object): Promise<{error: string}>`

Updates an existing document in the collection. Returns an object containing an error message if any.

Example:
```javascript
await firebaseQuery.update('GermanyId', { population: 85000000 });
```

#### `delete(id: string): Promise<{error: string}>`

Deletes a document from the collection by its ID. Returns an object containing an error message if any.

Example:
```javascript
await firebaseQuery.delete('GermanyId');
```

#### `getById(id: string): Promise<{data: Object, error: string}>`

Retrieves a document by its ID. Returns an object containing the document data or an error message.

Example:
```javascript
const { data, error } = await firebaseQuery.getById('GermanyId');
```

### Notes

- Ensure you have initialized Firebase in your project and obtained a Firestore instance before using FirebaseQuery.
- Make sure to handle errors appropriately when using asynchronous methods by checking the `error` property in the returned object.

This concludes the documentation for FirebaseQuery. If you have any further questions or need assistance, feel free to reach out!
