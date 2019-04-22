import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';


const FancyFont = styled.div`
    color: rgb(255, 248, 220);
    margin-top: 70px;
    font-size: 50px;
    text-shadow: 2px 2px 4px #000000;
    font-family: 'Domine', serif;

    #dinoz{
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    padding: 10px;
    margin: 0 auto;
    
    }
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
const FormDinosaur = styled.div`
    text-shadow: 2px 2px 4px #000000;
    color: rgb(255, 248, 220);
    margin: 20px;
    background-color: rgba(4, 44, 61, .5);
`;

class DinosaurList extends Component {
    state = {
        error: '',
        dinosaurs: [],
        newDinosaur: {
            name: '',
            estimated_height: '',
            estimated_mass: '',
            image: '',
            fossil: '',
            diet: '',
            region: '',
            time_period: ''
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
        this.fetchDinosaurs();
    }

    fetchDinosaurs = async () => {
        try {
            const res = await axios.get('/api/v1/dinosaurs/');
            this.setState({ dinosaurs: res.data });
        }
        catch (err) {
            console.log(err)
            this.setState({ error: err.message })
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

    createDinosaur = async (e) => {
        e.preventDefault()
        try {
        //    fix state to individ packages
            const dietRes = await axios.post(`/api/v1/diets/`, this.state.dietResponse)
            let clonedDiet = { ...this.state.newDinosaur}
            console.log(dietRes)
            console.log(dietRes.data.id)
            clonedDiet.diet = dietRes.data.id;
            this.setState({ newDinosaur: clonedDiet})  
            
        }catch (err) {
            console.log(err)
        }
        try{
            const locationRes = await axios.post(`/api/v1/locations/`, this.state.locationResponse)
            // this.setState({ location: locationRes.id})
            const dinoRes = await axios.post(`/api/v1/dinosaurs/`, this.state.dinosaur)
            // this.fetchDinosaurs();
        }
        catch (err) {
            console.log(err)
        }
    }

    handleChange = (e) => {
        const clonedNewDinosaur = { ...this.state.newDinosaur }
        clonedNewDinosaur[e.target.name] = e.target.value

        this.setState({
            newDinosaur: clonedNewDinosaur
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
        if (this.state.error) {
            return <div>{this.state.error}</div>
        }
        return (
            <div>
                <FancyFont>
                    <h1>All Dinosaurs</h1>
                </FancyFont>
                <div>
                    {this.state.dinosaurs.map(dinosaur => (
                        <div id="dinoz" key={dinosaur.id}>
                            <Link to={`/dinosaurs/${dinosaur.id}`} >{dinosaur.name}</Link>
                        </div>
                    ))}
                </div>
                <div>
                    <FormDinosaur>
                    <h2>Create Dino</h2>
                    <form onSubmit={this.createDinosaur}>
                    <Pics>
                        <img src={this.state.newDinosaur.image}></img>
                    </Pics>
                    <Pics>
                        <img src={this.state.newDinosaur.fossil}></img>
                    </Pics>
                    <div>{this.state.newDinosaur.name}</div>
                    <div>{this.state.newDinosaur.estimated_height}</div>
                    <div>{this.state.newDinosaur.estimated_mass}</div>
                    <div>{this.state.dietResponse.diet}</div>
                    <div>{this.state.locationResponse.region}</div>
                    <div>{this.state.locationResponse.time_period}</div>
                        <div>
                            <label htmlFor="name">Name: </label>
                            <input
                                value={this.state.newDinosaur.name}
                                type="text"
                                name="name"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="estimated_height">Estimated Height</label>
                            <input
                                value={this.state.newDinosaur.estimated_height}
                                type="text"
                                name="estimated_height"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="diet">Diet</label>
                            <input
                                // id="diet"
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
                                value={this.state.newDinosaur.estimated_mass}
                                type="text"
                                name="estimated_mass"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="image">Image Link: </label>
                            <input
                                value={this.state.newDinosaur.image}
                                type="text"
                                name="image"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="fossil">Fossil Link: </label>
                            <input
                                value={this.state.newDinosaur.fossil}
                                type="text"
                                name="fossil"
                                onChange={this.handleChange}
                            />
                        </div>
                        <button>+ Dino</button>
                    </form>
                    </FormDinosaur>
                </div>

            </div>
        );
    }
}


export default DinosaurList;