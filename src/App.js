import React, { Component } from 'react';
import RecentEntries from './components/RecentEntries';
import AddEntries from './components/AddEntries';

class App extends Component {
  render() {
    return (
      <div className="container">
        <RecentEntries />
        <AddEntries />
      </div>
    );
  }
}
export default App;
