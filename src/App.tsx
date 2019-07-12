import '@babel/core';

import React from 'react';
import { Terminal } from './components';

import './App.css';

class App extends React.PureComponent {
  public render() {
    return (
      <div className="bb__app">
        <Terminal />
      </div>
    );
  }
}

export default App;
