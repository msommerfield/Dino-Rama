import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import DinosaurList from './components/DinosaurList';
import Dinosaur from './components/Dinosaur';
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
                        <h1>Dino-rama</h1>
                        <div>
                            <div><StyledLink to="/">All Dinos</StyledLink></div>
                        </div>
                    </div>

                    <Switch>
                      <Route exact path="/" component={DinosaurList}/>
                      <Route path="/dinosaurs/:id" component={Dinosaur}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;