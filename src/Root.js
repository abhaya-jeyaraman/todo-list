import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import TodoList from './TodoList';
import BucketManager from './BucketManager';
import './Root.css'

class Root extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/list'>
            <TodoList />
          </Route>
          <Route path='/'>
            <BucketManager />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default Root;
