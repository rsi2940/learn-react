import React, { useState, useEffect } from 'react';
import firebase from '../env/firebase';
import Modal from './Modal';
const useEntries = (count) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('inventory')
      .limit(count)
      .orderBy('item', 'asc')
      .onSnapshot((snapshot) => {
        const newEntries = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEntries(newEntries);
      });
    return unsubscribe;
  }, [count]);
  return entries;
};
const updateItem = (action, entry) => {
  const newQuantity =
    action === 'add'
      ? ++entry.quantity
      : action === 'remove'
      ? --entry.quantity
      : entry.quantity;
  console.log(entry.item, newQuantity);
  firebase
    .firestore()
    .collection('inventory')
    .doc(entry.id)
    .update({ quantity: newQuantity });
};
const Entry = ({ count }) => {
  const entries = useEntries(count);
  const [show, setShow] = useState(false);

  const closeModalHandler = () => setShow(false);
  return (
    <React.Fragment>
      {show ? (
        <div onClick={closeModalHandler} className="back-drop"></div>
      ) : null}
      {entries.map((entry) => (
        <div key={entry.id} className="card my-2 mx-2 col-md-3">
          <div className="card-body">
            <h2 className="card-subtitle">{entry.item}</h2>
            <div className="card-subtitle mt-2">
              {entry.quantity}
              {entry.unit ? ', ' + entry.unit : ''}
            </div>
            <div className="d-flex justify-content-between mt-4">
              <div className="update-buttons">
                <button
                  onClick={() => updateItem('add', entry)}
                  className="mr-2 btn btn-primary"
                >
                  +
                </button>
                <button
                  disabled={entry.quantity < 1 ? true : false}
                  onClick={() => updateItem('remove', entry)}
                  className="ml-2 btn btn-secondary"
                >
                  -
                </button>
              </div>
              <div className="delete-button">
                <button
                  type="button"
                  className="mx-4 btn btn-danger"
                  onClick={() => setShow(true)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Modal show={show} close={closeModalHandler} />
    </React.Fragment>
  );
};

export default Entry;
