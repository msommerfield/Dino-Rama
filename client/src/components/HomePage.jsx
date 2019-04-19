import React, { Component } from 'react'
import styled from 'styled-components'


const Wrapper = styled.div`
    color: rgb(255, 248, 220);
    padding-top: 60px;
    margin-top: 90px;
    font-size: 90px;
    text-shadow: 2px 2px 4px #000000;
    font-family: 'Domine', serif;
    `

// font-family: 'Lora', serif;
// font-family: 'Slabo 27px', serif;
// font-family: 'PT Serif', serif;
// font-family: 'Bitter', serif;
// font-family: 'Karla', sans-serif;
// font-family: 'Mukta', sans-serif;
// font-family: 'Domine', serif;
// font-family: 'IBM Plex Sans', sans-serif;
// font-family: 'Special Elite', cursive;

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