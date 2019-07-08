import React from 'react';
import Home from './routes/Home';
import Login from './routes/Login';
import Likes from './routes/Likes'
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Routing extends React.Component {
  render() {
    return (  
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/likes" component={Likes} />
      </Router>
      )
  }
}

export default Routing;
