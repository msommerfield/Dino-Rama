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
    margin: 0 auto;
img {
    width: 250px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin: 0 auto;
    margin-left: 30px;
}
`;
const FormDinosaur = styled.div`
    text-shadow: 2px 2px 4px #000000;
    color: rgb(255, 248, 220);
    margin: 20px;
    background-color: rgba(4, 44, 61, .5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
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
            location: ''
        },
        newDiet: '',
        newLocation: {
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
        },
        dietOptions: [],
        locationOptions: [],
    }

    componentDidMount() {
        this.fetchDinosaurs();
        this.fetchDietAndLocation()
    }

    fetchDietAndLocation = async () => {
        try {
            const dietRes = await axios.get('/api/v1/diets/')
            const locationRes = await axios.get('/api/v1/locations/')
            this.setState({
                dietOptions: dietRes.data,
                locationOptions: locationRes.data,
            })
        }
        catch (err) {
            console.log(err)
        }
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
        let { name, estimated_height, estimated_mass, image, fossil, diet, location } = this.state.newDinosaur
        try {
            //    fix state to individ packages
            const dinoRes = await axios.post(`/api/v1/dinosaurs/`, {
                name: name,
                estimated_height: estimated_height,
                estimated_mass: estimated_mass,
                image: image,
                fossil: fossil,
                diet: diet || this.state.dietOptions[0].id,
                location: location || this.state.locationOptions[0].id
            })
            console.log(dinoRes)

        } catch (err) {
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

    handleNewLocationChange = (e) => {
        const clonedLocation = { ...this.state.newLocation }
        clonedLocation[e.target.name] = e.target.value
        this.setState({
            newLocation: clonedLocation
        })
    }

    handleNewDietChange = (e) => {
        this.setState({
            newDiet: e.target.value
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

    createDiet = async (e) => {
        e.preventDefault()
        const res = await axios.post('/api/v1/diets/', { diet: this.state.newDiet })
    }

    createLocation = async (e) => {
        e.preventDefault()
        const res = await axios.post('/api/v1/locations/',  this.state.newLocation )
    }

    deleteDiet = async (dietId) => {
        const res = await axios.delete(`/api/v1/diets/${dietId}/`)
        this.fetchDietAndLocation()
    }

    deleteLocation = async (locationId) => {
        const res = await axios.delete(`/api/v1/locations/${locationId}/`)
        this.fetchDietAndLocation()
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
                                {/* <div className="pickies"> */}
                                <Pics>
                                    <img src={this.state.newDinosaur.image}></img>
                                </Pics>
                                {/* </div> */}
                                {/* <div className="pickies"> */}
                                <Pics>
                                    <img src={this.state.newDinosaur.fossil}></img>
                                </Pics>
                                {/* </div> */}
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
                                    <select id="diet" name="diet" onChange={this.handleChange}>
                                        {
                                            this.state.dietOptions.map(diet => {
                                                return (
                                                    <option key={diet.id} value={diet.id}>{diet.diet}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="location">Location</label>
                                    <select id="location" name="location" onChange={this.handleChange}>
                                        {
                                            this.state.locationOptions.map(location => {
                                                return (
                                                    <option key={location.id} value={location.id}>{`${location.region} - ${location.time_period}`}</option>
                                                )
                                            })
                                        }
                                    </select>
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
                    <div>
                        <FormDinosaur>
                            <div>
                                {this.state.dietOptions.map(diet => {
                                    return (
                                        <div key={diet.id}>
                                            <p>{diet.diet}</p>
                                            <button onClick={() => this.deleteDiet(diet.id)}>Delete</button>
                                        </div>
                                    )
                                })

                                }
                                <form onSubmit={this.createDiet}>
                                    <label>+ Diet</label>
                                    <input
                                        value={this.state.newDiet}
                                        type="text"
                                        name="diet"
                                        onChange={this.handleNewDietChange}
                                    />
                                    <div>
                                        <button onClick={this.createDiet}>Create Diet</button>
                                    </div>
                                </form>
                            </div>
                            <div>

                                <div>
                                    {this.state.locationOptions.map(location => {
                                        return (
                                            <div key={location.id}>
                                                <p>{location.time_period}</p>
                                                <p>{location.region}</p>
                                                <button onClick={() => this.deleteLocation(location.id)}>Delete</button>
                                            </div>
                                        )
                                    })

                                    }
                                    <form onSubmit={this.createLocation}>
                                        <label>+ Time Period</label>
                                        <input
                                            value={this.state.newLocation.time_period}
                                            type="text"
                                            name="time_period"
                                            onChange={this.handleNewLocationChange}
                                        />
                                        <div>
                                            <button onClick={this.createLocation}>+ Time Period</button>
                                        </div>


                                        <label htmlFor="region">+ Region</label>
                                        <input
                                            value={this.state.newLocation.region}
                                            type="text"
                                            name="region"
                                            onChange={this.handleNewLocationChange}
                                        />
                                        <div>
                                            <button onClick={this.createLocation}>+ Region</button>
                                        </div>
                                    </form>

                                </div>

                            </div>
                        </FormDinosaur>
                    </div>
            </div>
        );
    }
}


export default DinosaurList;