import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
const SPACE_KEY = process.env.REACT_APP_KEY


const Wrapper = styled.div`
img {
    height: 300px;
    width:300px;
    border-radius: 50%;
    margin-top: 20px;
}
    `
const Button = styled.button`
color: rgb(255, 248, 220);
text-shadow: 2px 2px 4px #000000;
background-color: rgba(4, 44, 61, .5);
font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border: 2px;
border-radius: 3px;
`

export default class DinoSoundz extends Component {

    state = {
        spaceData: {},
        showImage: false,
    }

    componentDidMount() {
        this.getSpace()
    }

    getSpace = () => {
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=${SPACE_KEY}`).then(res => {
            this.setState({spaceData: res.data})
        })
    }

    toggleImage = () => {
        this.setState((state, props) => {
            return ({showImage: !state.showImage})
        })

    }
  render() {
    return (
      <Wrapper>
          {
              this.state.showImage ?
              <Button onClick={() => this.toggleImage()}>Tooo scary....HIDE!</Button>
              :
              <Button onClick={() => this.toggleImage()}>How Did Dinosaurs Die?</Button>

          }
        {
            this.state.showImage ?
            <img src={this.state.spaceData.hdurl} alt={this.state.spaceData.title}/>
            : null
        }
      </Wrapper>
    )
  }
}
