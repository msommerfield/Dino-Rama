import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
const SPACE_KEY = process.env.REACT_APP_KEY


const Wrapper = styled.div`
img {
    height: 300px;
    width:300px;
    border-radius: 50%;
}
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
              <button onClick={() => this.toggleImage()}>Tooo scary....HIDE!</button>
              :
              <button onClick={() => this.toggleImage()}>How Did Dinosaurs Die?</button>

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
