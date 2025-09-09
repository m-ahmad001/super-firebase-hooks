```markdown
# super-firebase-hook

`super-firebase-hook` is a simple wrapper around Firebase Firestore SDK version 9 that provides a chainable API for performing CRUD operations.


```
## Installation
1. Install Firebase SDK version 9 in your project:
```javascript
npm install firebase super-firebase-hooks
```
2. Create a new file named `firebase.js` and import the `FirebaseQuery` wrapper. Initialize it with your Firebase configuration and export it:

```javascript
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import FirebaseQuery from 'super-firebase-hooks';


const firebaseConfig = {
  // your Firebase config here
};

const firebaseApp = initializeApp(firebaseConfig);

const DB = getFirestore(firebaseApp);

const firebase = new FirebaseQuery(DB);

export default firebase;
````

## Usage

Import the `firebase` wrapper in your file and use it to perform CRUD operations:

### Select documents

Select all documents from the `users` collection:

```javascript
import firebase from "./firebase";

const { data, error } = await firebase.select("users").get();
console.log(data);
```

### Select documents by ID

Select all documents from the `users` collection:

```javascript
import firebase from "./firebase";

const { data, error } = await firebase.select("users").getById("userid");
console.log(data);
```

### Query documents

Query documents from the `users` collection where the `age` field is greater than or equal to 18:

```javascript
import firebase from "./firebase";

const { data, error } = await firebase
  .select("users")
  .where("age", ">=", 18)
  .get();
console.log(data);
```

### Insert a document

Insert a new document into the `users` collection:

```javascript
import firebase from "./firebase";

const { error } = await firebase.select("users").insert({ name: "Ahmad" });
console.log(error);
```

Insert a new document into the `users` collection with id:

```javascript
import firebase from "./firebase";

const { error } = await firebase
  .select("users")
  .insert({ name: "Ahmad" }, "docId");
console.log(error);
```

### Insert many document

Insert a new document into the `users` collection:

```javascript
import firebase from "./firebase";

const { ids, error } = await firebase
  .select("users")
  .insertMany([{ name: "Ahmad" }, { name: "Ali" }]);
console.log(error);
```

### Update a document

Update a document in the `users` collection by its document ID:

```javascript
import firebase from "./firebase";

const { error } = await firebase
  .select("users")
  .update("docId", { name: "John" });
console.log(error);
```

### Delete a document

Delete a document in the `users` collection by its document ID:

```javascript
import firebase from "./firebase";

const { error } = await firebase.select("users").delete("docId");
console.log(error);
```

## License

`super-firebase-hooks` is released under the MIT License.

## Github Repo for open source contribute

```
https://github.com/m-ahmad001/super-firebase-hooks
```


<!-- Security scan triggered at 2025-09-02 00:24:32 -->

<!-- Security scan triggered at 2025-09-09 05:27:26 -->