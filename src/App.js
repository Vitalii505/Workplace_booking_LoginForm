import React from 'react';
import './App.css';
// import { LoginForm } from './components/LoginForm'
import Login from './components/LoginForm'


class App extends React.Component {

  render() {

    return (
      <div className="App">
        {/* <LoginForm /> */}
        <Login></Login>
      </div>
    );
  };
}

export default App;