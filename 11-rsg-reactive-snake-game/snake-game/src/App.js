import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import ComponentTester from './containers/ComponentTester'

class App extends Component {
  render() {
    return (
      <div>
        
        <Switch>
          <Route path='/test' component={ComponentTester} />
        </Switch>
      </div>
    );
  }
}

export default App;
