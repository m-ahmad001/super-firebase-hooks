My apologies for missing the Query method. Here's the revised README.md file with the Query method included, along with example code snippets:

```markdown
# FirebaseQuery

FirebaseQuery is a JavaScript class that simplifies Firestore operations by providing easy-to-use methods for querying, inserting, updating, and deleting documents.

## Installation

To use FirebaseQuery in your project, you can install it via npm:

```bash
npm install firebase-query
```

## Usage

### Importing the Module

```javascript
import FirebaseQuery from 'firebase-query';
```

### Initializing FirebaseQuery

```javascript
const firebaseQuery = new FirebaseQuery('collectionName');
```

### Selecting Documents

```javascript
// Select all documents
const { data, error } = await firebaseQuery.select().get();

// Select documents where a field matches a value
const { data, error } = await firebaseQuery.select().where('fieldName', '==', 'value').get();
```

### Querying Documents

```javascript
// Perform advanced queries
const { data, error } = await firebaseQuery.query().orderBy('fieldName').limit(10).get();
```

### Inserting Documents

```javascript
// Insert a single document
const { id, error } = await firebaseQuery.insert({ field1: 'value1', field2: 'value2' });

// Insert multiple documents
const { ids, error } = await firebaseQuery.insertMany([
  { field1: 'value1', field2: 'value2' },
  { field1: 'value3', field2: 'value4' },
]);
```

### Updating Documents

```javascript
// Update a document by ID
const { error } = await firebaseQuery.update('documentId', { field: 'newValue' });
```

### Deleting Documents

```javascript
// Delete a document by ID
const { error } = await firebaseQuery.delete('documentId');
```

## Examples

Showcase usage examples and additional code snippets here.

### Example 1: Selecting Documents

```javascript
const { data, error } = await firebaseQuery.select().get();
console.log(data);
```

### Example 2: Inserting Documents

```javascript
const { id, error } = await firebaseQuery.insert({ field1: 'value1', field2: 'value2' });
console.log(id);
```

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue on GitHub or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

Feel free to customize the README file further based on your project's needs. If you have any more questions or need further assistance, please let me know!
