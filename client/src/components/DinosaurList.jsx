import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

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
            const res = await axios.get('/dinosaurs');
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
            const res = axios.post('/api/v1/', this.state.newDinosaur)
        }
        catch(err) {
            console.log(err)
        }
    }

    handleChange = (e) => {
        const clonedNewDinosaur = {...this.state.newDinosaur}
        clonedNewDinosaur[e.target.name] = e.target.value

        this.setState({
            newArtist: clonedNewDinosaur
        })
    }

    render() {
        if (this.state.error){
            return <div>{this.state.error}</div>
        }
        return (
            <div>
                <h1>All Dinosaurs</h1>
                {this.state.dinosaurs.map((dinosaur, i )=> (
                    <div key={i}>
                        <Link to={`/dinosaur/${dinosaur.id}`} >{dinosaur.name}</Link>
                    </div>
                ))}
            </div>
        );
    }
}

export default DinosaurList;