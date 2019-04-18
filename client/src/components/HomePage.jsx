import React, { Component } from 'react'
import styled from 'styled-components'


const Wrapper = styled.div`
    /* height: 40px; */
    color: white;
    padding-top: 60px;
    margin-top: 90px;
    font-size: 80px;
    text-shadow: 2px 2px 4px #000000;

    /* a {
    color: white;
    text-decoration: none;
    font-family: 'Pacifico', cursive;
    font-size: 25px;
    cursor: pointer;
    text-shadow: 2px 2px 4px #000000;
    } */
    `



class HomePage extends Component {
    render() {
        return (
            <Wrapper>
                Dinorama
            </Wrapper>
        )
    }
}

export default HomePage