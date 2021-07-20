import React from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Pets from './Pets';
import Events from './Events';
import logo from './assets/logo.png';

const App = () =>  {

  return (
    <Router>
      <div className='page'>
        <Switch>
          <Route path='/' exact>
          <header className="page__header">
            <img src={logo} alt="logo" className="heading__logo" />
            <h1 className="page__heading">Welcome at dog's shelter!</h1>
          </header>
          <nav className="page__navigation">
            <Link to='/dogs' className="nav__link">Our dogs</Link>
            <Link to='/events' className="nav__link">Events</Link>
          </nav>
          </Route>
          <Route path='/dogs'>
            <Pets/>
          </Route>
          <Route path='/events' >
            <Events />
          </Route>
          <Route>
            <h2 style={{textAlign : 'center', lineHeight : '100vh'}} >This site doesn't exist</h2>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
