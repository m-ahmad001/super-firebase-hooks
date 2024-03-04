Sure, here's an example of a `README.md` file for the `superquery` wrapper:

```markdown
# superquery

`superquery` is a simple wrapper around Firebase Firestore SDK version 9 that provides a chainable API for performing CRUD operations.

## Installation

1. Install Firebase SDK version 9 in your project:
```
npm install firebase@9
```
2. Create a new file named `firebase.js` and import the `superquery` wrapper. Initialize it with your Firebase configuration and export it:
```javascript
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import FirestoreWrapper from './superquery';

const firebaseConfig = {
  // your Firebase config here
};

const superquery = new FirestoreWrapper(firebaseConfig);

export default superquery;
```

## Usage

Import the `superquery` wrapper in your file and use it to perform CRUD operations:

### Select documents

Select all documents from the `users` collection:

```javascript
import superquery from './firebase';

const { data, error } = await superquery.select("users").get();
console.log(data);
```

### Insert a document

Insert a new document into the `users` collection:

```javascript
import superquery from './firebase';

const { error } = await superquery.select("users").insert({ name: 'Ahmad' });
console.log(error);
```

### Update a document

Update a document in the `users` collection by its document ID:

```javascript
import superquery from './firebase';

const { error } = await superquery.select("users").update('docId', { name: 'John' });
console.log(error);
```

### Delete a document

Delete a document in the `users` collection by its document ID:

```javascript
import superquery from './firebase';

const { error } = await superquery.select("users").delete('docId');
console.log(error);
```

## License

`superquery` is released under the MIT License.
```

You can customize this `README.md` file to fit your specific needs and add more examples if necessary.
