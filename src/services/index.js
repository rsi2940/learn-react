import firebase from '../env/firebase';

export async function GetInventory(limit = -1) {
  console.log('hello getinventory', limit);
  let entries = [];
  firebase
    .firestore()
    .collection('inventory')
    .limit(limit)
    .orderBy('item', 'asc')
    .onSnapshot((snapshot) => {
      entries = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });

  console.log(entries);
  return entries;
}
