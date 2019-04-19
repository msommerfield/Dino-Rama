import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import DinosaurList from './components/DinosaurList';
import Dinosaur from './components/Dinosaur';
import NavigationBar from './components/NavigationBar';
import HomePage from './components/HomePage';
import "./App.css";
import styled from 'styled-components';


const StyledLink = styled(Link)`
  color: palevioletred;
  font-weight: bold;
  text-decoration: none;
`;

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <div>
                        <NavigationBar/>
                    </div>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <Route exact path="/dinosaurs/" component={DinosaurList}/>
                        <Route path="/dinosaurs/:id/" component={Dinosaur}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;