import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    background-color: rgba(4, 44, 61, .5);
    height: 70px;
    color: white;
    text-decoration: none;
    display: flex;
    justify-content: space-around;


    a {
    color: white;
    text-decoration: none;
    font-family: 'Pacifico', cursive;
    font-size: 25px;
    cursor: pointer;
    text-shadow: 2px 2px 4px #000000;
    margin-top: 20px;
    }
    `

class NavigationBar extends Component {
    render() {
        return (
            <Wrapper>
                <a href="/">Home</a>
                <a href="/dinosaur">Dinosaur</a>
                <a href="/dinosaur/:dinosaurId">All Dinos</a>
            </Wrapper>
        )
    }
}

export default NavigationBar