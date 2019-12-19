import React, { Component } from 'react';

//Class Component, child component
export default class FirstComponent extends Component {    //component starts with Capital letter
    render() {
      return (
        <div className="firstComponent">
          First Component
        </div>
      );
    }
  }

export class ThirdComponent extends Component {
  render(){
    return(
      <div className="thirdomponent">
          Third Component
        </div>
    );
  }
}