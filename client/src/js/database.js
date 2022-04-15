import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async (value) => {
  console.error('getting data from jateDB');
  // Create a connection to the database
  const jateDB = await openDB('jate', 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = jateDB.transaction('jate', 'readwrite')
  // Open up the desired object store.
  const store = tx.objectStore('jate');
  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();
  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  
  }; 
  
// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, value) => {
  console.error('put request to update the jateDB');
// connect to DB and version we want to use
const jateDb = await openDB('jate', 1);
// make new transaction...need to specify the DB we are posting to and the data privileges. 
const tx = jateDb.transaction('jate', 'readwrite');
// open the object store
const store = tx.objectStore('jate');
// use the .add() method to pass in content
const req = store.put({ id: id, value: value })
// confirm the data was added
const res = await req;
console.log('data saved to the jateDB', res);
} 

// Start the database.
initdb();
