import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'



const StyledLink = styled.link`
  color: palevioletred;
  font-weight: bold;
  text-decoration: none;
  `;

const FancyFont = styled.div`
    color: rgb(255, 248, 220);
    margin-top: 20px;
    font-size: 40px;
    text-shadow: 2px 2px 4px #000000;
    font-family: 'Domine', serif;
`;

const FormDinosaur = styled.div`
    text-shadow: 2px 2px 4px #000000;
    color: rgb(255, 248, 220);
    margin: 20px;
    background-color: rgba(4, 44, 61, .5);
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
        redirect: false,
        dietResponse: {
            diet: ''
        },
        locationResponse: {
            region: '',
            time_period: ''
        }
    }

    componentDidMount() {
        const dinosaurId = this.props.match.params.id;
        // this.fetchDinosaur(dinosaurId).then(()=>{
        //     this.fetchDiet( `${this.state.dinosaur.diet}`)}
            
        //     )
        // .then(()=>{
        //     this.fetchLocation( `${this.state.dinosaur.location}`)}
        //     )
        this.fetchDinosaur()
        this.fetchLocation()
        this.fetchDiet()
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

    fetchLocation = async (locationId) => {
        try {
            const res = await axios.get(`/api/v1/locations/${locationId}/`)
            this.setState({
                locationResponse: res.data,
            })
        }
        catch (err) {
            console.log(err)
        }
    }
        fetchDiet = async (dietId) => {
        try {
            const res = await axios.get(`/api/v1/diets/${dietId}/`)
            this.setState({
                dietResponse: res.data
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    deleteDinosaur = async (e) => {
        e.preventDefault()
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
            const dinoRes = await axios.put(`/api/v1/dinosaurs/${this.state.dinosaur.id}/`, this.state.dinosaur)
            const dietRes = await axios.put(`/api/v1/diets/${this.state.dietResponse.id}/`, this.state.dietResponse)
            const locationRes = await axios.put(`/api/v1/locations/${this.state.locationResponse.id}/`, this.state.locationResponse)
            this.setState({
                dinosaur: dinoRes.data,
                dietResponse: dietRes.data,
                locationResponse: locationRes.data,
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

    handleDietChange = (e) => {
        const clonedDiet = { ...this.state.dietResponse }
        clonedDiet[e.target.name] = e.target.value

        this.setState({
            dietResponse: clonedDiet
        })
    }
    handleLocationChange = (e) => {
        const clonedLocation = { ...this.state.locationResponse }
        clonedLocation[e.target.name] = e.target.value

        this.setState({
            locationResponse: clonedLocation
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
                    <div>{this.state.dietResponse.diet}</div>
                    <div>{this.state.locationResponse.region}</div>
                    <div>{this.state.locationResponse.time_period}</div>
                   

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
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="estimated_height">Estimated Height</label>
                                <input
                                    value={this.state.dinosaur.estimated_height}
                                    type="text"
                                    name="estimated_height"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="diet">Diet</label>
                                <input
                                    id="diet"
                                    value={this.state.dietResponse.diet}
                                    type="text"
                                    name="diet"
                                    onChange={this.handleDietChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="region">Region</label>
                                <input
                                    id="region"
                                    value={this.state.locationResponse.region}
                                    type="text"
                                    name="region"
                                    onChange={this.handleLocationChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="time_period">Time Period</label>
                                <input
                                    id="time_period"
                                    value={this.state.locationResponse.time_period}
                                    type="text"
                                    name="time_period"
                                    onChange={this.handleLocationChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="estimated_mass">Estimated Mass:</label>
                                <input
                                    value={this.state.dinosaur.estimated_mass}
                                    type="text"
                                    name="estimated_mass"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="image">Image Link: </label>
                                <input
                                    value={this.state.dinosaur.image}
                                    type="text"
                                    name="image"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="fossil">Fossil Link: </label>
                                <input
                                    value={this.state.dinosaur.fossil}
                                    type="text"
                                    name="fossil"
                                    onChange={this.handleChange}
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