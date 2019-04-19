import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'


const StyledLink = styled.link`
  color: palevioletred;
  font-weight: bold;
  text-decoration: none;
  `;

const FancyFont = styled.div`
`;

const FormDinosaur = styled.div`
    text-shadow: 2px 2px 4px #000000;
`;

const Pics = styled.div`
img {
    width: 250px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin: 0 auto;
}
`;

const ButtonWrapper = styled.div`
`;

class Dinosaur extends Component {

    state = {
        error: '',
        dinosaur: {},
        newDinosaur: {
            name: '',
            estimated_height: '',
            estimated_mass: '',
            image: '',
            fossil: '',
        },
        isDinosaurFormDisplayed: false,
        redirect: false
    }

    componentDidMount() {
        const dinosaurId = this.props.match.params.id;
        this.fetchDinosaur(dinosaurId)
    }

    fetchDinosaur = async (dinosaurId) => {
        try {
            const dinosaurResponse = await axios.get(`/api/v1/dinosaurs/${dinosaurId}/`)
            this.setState({
                dinosaur: dinosaurResponse.data,
            })
            console.log(dinosaurResponse)
        }
        catch (error) {
            console.log(error)
            this.setState({error: error.message})
        }
    }

    fetchDinosaur = async (dinosaurId) => {
        try {
            const res = await axios.get(`/api/v1/dinosaurs/${dinosaurId}/`)
            this.setState({
                dinosaur: res.data,
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    deleteDinosaur = async () => {
        try {
            const res = await axios.delete(`/api/v1/dinosaurs/${this.props.match.params.id}/`)
            this.setState({
                redirectToHome: true
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    updateDinosaur = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(`/api/v1/dinosaurs/${this.props.match.params.id}/`, this.state.dinosaur)
            this.setState({
                dinosaur: res.data,
                isEditFormDisplayed: false
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    handleChange = (e) => {
        const clonedDinosaur = { ...this.state.dinosaur }
        clonedDinosaur[e.target.name] = e.target.value

        this.setState({
            dinosaur: clonedDinosaur
        })
    }

    toggleDinosaurForm = () => {
        this.setState((state, props) => {
            return { isDinosaurFormDisplayed: !state.isDinosaurFormDisplayed }
        })
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={`/dinosaurs/`} />
        }
        return (

            <div>
                <FancyFont>
                    <h1>Dinos</h1>
                </FancyFont>

                <FormDinosaur>
                    <Pics>
                        <img src={this.state.dinosaur.image}></img>
                    </Pics>
                    <Pics>
                        <img src={this.state.dinosaur.fossil}></img>
                    </Pics>
                    <div>{this.state.dinosaur.name}</div>
                    <div>{this.state.dinosaur.estimated_height}</div>
                    <div>{this.state.dinosaur.estimated_mass}</div>
                    <div>{this.state.dinosaur.diet}</div>
                    <div>{this.state.dinosaur.location}</div>
                    <div>
                        <button onClick={this.toggleDinosaurForm}>Evolve Dino</button>
                        {
                            this.state.isDinosaurFormDisplayed
                            ?
                        <form>
                            <div>
                                <label htmlFor="name">Name: </label>
                                <input
                                    value={this.state.dinosaur.name}
                                    type="text"
                                    name="name"
                                    onChange={this._handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="estimated_height">Estimated Height</label>
                                <input
                                    value={this.state.dinosaur.estimated_height}
                                    type="text"
                                    name="estimated_height"
                                    onChange={this._handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="estimated_mass">Estimated Mass:</label>
                                <input
                                    value={this.state.dinosaur.estimated_mass}
                                    type="text"
                                    name="estimated_mass"
                                    onChange={this._handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="diet">Diet</label>
                                <input
                                    value={this.state.dinosaur.diet}
                                    type="text"
                                    name="diet"
                                    onChange={this._handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="location">location</label>
                                <input
                                    value={this.state.dinosaur.location}
                                    type="text"
                                    name="location"
                                    onChange={this._handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="image">Image Link: </label>
                                <input
                                    value={this.state.dinosaur.image}
                                    type="text"
                                    name="image"
                                    onChange={this._handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="fossil">Fossil Link: </label>
                                <input
                                    value={this.state.dinosaur.fossil}
                                    type="text"
                                    name="fossil"
                                    onChange={this._handleChange}
                                />
                            </div>
                        <ButtonWrapper>
                            <div>
                                <button type="submit" onClick={this.updateDinosaur}>Modify Dino</button>
                            </div>

                            <div>
                                <button onClick={this.deleteDinosaur}>Make Extinct</button>
                            </div>
                        </ButtonWrapper>
                        </form>
                        :
                        null
                        }
                    </div>
                </FormDinosaur>

            </div>
        )
    }
}

export default Dinosaur;