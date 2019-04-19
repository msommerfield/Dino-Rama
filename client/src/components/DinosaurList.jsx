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
        }
    }

    componentDidMount(){
        this.fetchDinosaurs();
    }

    fetchDinosaurs = async () => {
        try {
            const res = await axios.get('/api/v1/dinosaurs/');
            this.setState({dinosaurs: res.data});
        }
        catch (err) {
            console.log(err)
            this.setState({error: err.message})
        }
    }

    createDinosaur = async (e) => {
        e.preventDefault()
        try {
            const res = axios.post('/api/v1/dinosaurs/', this.state.newDinosaur)
        }
        catch(err) {
            console.log(err)
        }
    }

    handleChange = (e) => {
        const clonedNewDinosaur = {...this.state.newDinosaur}
        clonedNewDinosaur[e.target.name] = e.target.value

        this.setState({
            newDinosaur: clonedNewDinosaur
        })
    }
    render() {
        if (this.state.error){
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
            </div>
        );
    }
}


export default DinosaurList;