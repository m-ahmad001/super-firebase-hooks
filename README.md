Here's the documentation for the `FirebaseQuery` class along with code examples for each method:

---

# FirebaseQuery Class Documentation

The `FirebaseQuery` class provides methods to interact with Firestore databases, including selecting, filtering, inserting, updating, deleting documents, and retrieving documents by their IDs.

## Constructor

### `constructor(DB: Firestore): FirebaseQuery`

- Initializes a new instance of the `FirebaseQuery` class with a Firestore instance.

#### Parameters
- `DB` (Firestore): The Firestore instance to use for database operations.

---

## Methods

### `select(collectionName: string, fields: string|string[] = '*'): FirebaseQuery`

- Selects documents from the specified collection with optional fields to retrieve.

#### Parameters
- `collectionName` (string): Name of the collection to select documents from.
- `fields` (string|string[], optional): Fields to retrieve. Pass '*' to select all fields. Default is '*'.

#### Returns
- `FirebaseQuery`: Returns the `FirebaseQuery` instance for chaining.

#### Example
```javascript
const { data, error } = await firebaseQuery.select('users').get();
```

---

### `where(field: string, operator: string, value: any): FirebaseQuery`

- Filters documents based on a field, comparison operator, and value.

#### Parameters
- `field` (string): Name of the field to filter.
- `operator` (string): Comparison operator (e.g., '==', '>', '<').
- `value` (any): Value to compare against.

#### Returns
- `FirebaseQuery`: Returns the `FirebaseQuery` instance for chaining.

#### Example
```javascript
const { data, error } = await firebaseQuery.select('users').where('age', '>', 30).get();
```

---

### `get(): Promise<{ data: Object[], error: string }>`

- Executes the query and fetches documents.

#### Returns
- `Promise<{ data: Object[], error: string }>`: Returns the fetched data or error.

#### Example
```javascript
const { data, error } = await firebaseQuery.select('users').get();
```

---

### `insert(data: Object): Promise<{ id: string, error: string }>`

- Inserts a new document into the collection.

#### Parameters
- `data` (Object): Data to be inserted.

#### Returns
- `Promise<{ id: string, error: string }>`: Returns the inserted document ID or error.

#### Example
```javascript
const { id, error } = await firebaseQuery.select('users').insert({ name: 'John', age: 30 });
```

---

### `insertMany(data: Object[]): Promise<{ ids: string[], error: string }>`

- Inserts multiple documents into the collection.

#### Parameters
- `data` (Object[]): Array of data to be inserted.

#### Returns
- `Promise<{ ids: string[], error: string }>`: Returns the inserted document IDs or error.

#### Example
```javascript
const { ids, error } = await firebaseQuery.select('users').insertMany([{ name: 'John' }, { name: 'Alice' }]);
```

---

### `update(id: string, data: Object): Promise<{ error: string }>`

- Updates an existing document in the collection.

#### Parameters
- `id` (string): ID of the document to update.
- `data` (Object): Updated data.

#### Returns
- `Promise<{ error: string }>`: Returns an error message if any.

#### Example
```javascript
await firebaseQuery.update('USER_ID', { age: 40 });
```

---

### `delete(id: string): Promise<{ error: string }>`

- Deletes a document from the collection.

#### Parameters
- `id` (string): ID of the document to delete.

#### Returns
- `Promise<{ error: string }>`: Returns an error message if any.

#### Example
```javascript
await firebaseQuery.delete("collections",'USER_ID');
```

---

### `getById(id: string): Promise<{ data: Object, error: string }>`

- Retrieves a document by its ID.

#### Parameters
- `id` (string): ID of the document to retrieve.

#### Returns
- `Promise<{ data: Object, error: string }>`: Returns the document data or error.

#### Example
```javascript
const { data, error } = await firebaseQuery.getById('USER_ID');
```

---

This concludes the documentation for the `FirebaseQuery` class, providing an overview of its methods along with code examples demonstrating their usage.
