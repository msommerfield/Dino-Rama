import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import ArtistList from './components/ArtistList';
import Artist from './components/Artist';
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
                        <h1>Tunr</h1>
                        <div>
                            <div><StyledLink to="/">All Artists</StyledLink></div>
                        </div>
                    </div>

                    <Switch>
                      <Route exact path="/" component={ArtistList}/>
                      <Route path="/artists/:id" component={Artist}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;