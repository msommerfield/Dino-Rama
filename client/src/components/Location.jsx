import React, { Component } from 'react';

class Location extends Component {
    state={
        location: {
            id: '',
            diet: ''
        }
    }
    
    componentDidMount(){
        console.log("trying to set")
      
    }
    dinoInfo=()=>{
        let copyDiet = {...this.state.diet}
        copyDiet = this.props.dietResponse
        this.setState({diet: copyDiet})
    }
    
    render() {
        return (
            <div>
             <form>
                 <input type="text"/>
             </form>
            {this.props.dietResponse.diet}
            <button onClick={this.dinoInfo}> CLICK ME </button>
            </div>
        );
    }
}

export default Location;