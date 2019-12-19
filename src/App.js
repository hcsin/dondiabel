import React, { Component } from 'react';     //Default export can be normally imported, all other imports needs to be between {}
import logo from './logo.svg';
import './App.css';
import FirstComponent, { ThirdComponent } from './components/learning-examples/FirstComponent'
import FourthComponent from './components/learning-examples/FourthComponent'


//Parent Component
class App extends Component {   //App is the root, everything that needs to show needs to be included in app
  render() {
    return (                  //return within parenthesis ()
      <div className="App">
        My Hello World
        <FirstComponent></FirstComponent>
        <SecondComponent/>
        <ThirdComponent/>
        <FourthComponent/>
      </div>
    );
  }
}

//Funcion Component, child component
function SecondComponent(){
  return(
    <div className="secondComponent">
        Second Component
      </div>
  );
}


export default App;
