import React, { useState, useEffect } from 'react';
import firebase from '../env/firebase';

const useUnits = () => {
  const [units, setUnits] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('units')
      .orderBy('unit', 'asc')
      .onSnapshot((snapshot) => {
        const newUnits = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(newUnits);
        setUnits(newUnits);
      });
    return unsubscribe;
  }, []);

  return units;
};

const AddEntries = () => {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('');
  const units = useUnits();
  function onSubmit(e) {
    e.preventDefault();
    firebase
      .firestore()
      .collection('inventory')
      .add({
        item,
        quantity,
        unit,
        date: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log('added');
        setItem('');
        setQuantity(0);
        setUnit('');
        console.log(item, quantity, unit);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <form className="my-4" onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="item">Item Name</label>
        <input
          type="text"
          className="form-control"
          id="item"
          placeholder="Cereal"
          required
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Item Name</label>
        <input
          type="number"
          className="form-control"
          id="quantity"
          placeholder="0"
          min="0"
          step="1"
          required
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="unit">Select Unit</label>
        <select
          className="form-control"
          id="unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          <option> </option>
          {units.map((item) => (
            <option key={item.id}>{item.unit}</option>
          ))}
        </select>
      </div>
      <div>
        <button
          disabled={item && quantity ? false : true}
          className="btn btn-primary"
          type="submit"
        >
          Add Entry
        </button>
      </div>
    </form>
  );
};
export default AddEntries;
