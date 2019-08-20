import React, { Component } from 'react';
import { auth, firestore } from '../../../../firebase/firebase.utils'


import MapContainer from '../../../../components/map-container/map-container.component'
import FormInput from '../../../../components/form-input/form-input.component'
import CustomButton from '../../../../components/custom-button/custom-button.component'

import Typed from 'typed.js';

import './tutorial-two.styles.scss'

class TutorialPageTwo extends Component{
    constructor(){
        super()

        this.state = {
            initialCenter: {
                lat: 43.3349874,
                lng: -111.91664639999999
            },
            markers: [
                {
                    onClick: () => console.log('cactus!'),
                    name: 'Kenyatta International Convention Centre'
                },
                {
                    onClick: () => console.log('potato!'),
                    position: {lat: 37.778519, lng: -122.405640}
                }
            ],
        }
    }

    componentDidMount(){
        var options = {
            strings: ["Where would you like to run your ad?"],
            typeSpeed: 15,
            showCursor: false,
            onComplete: () => {
                this.setState({
                    questionAsked: true
                })
            }
            }
    
            var typed = new Typed("#questionTitle", options);
    }


    handleSubmit = async event => {
        event.preventDefault();
        
    
    }

    handleChange = event => {
       
    }

    handleCurrentPositionClick = () => {
        navigator.geolocation.getCurrentPosition( e => {
          this.setState(
                { 
                    initialCenter: 
                    { 
                        lat: e.coords.latitude, 
                        lng: e.coords.longitude 
                    },
                }, (e) => {
                    // document.querySelector('#map').zoom = 10;
                })
      })
    }

    render(){

        return (
                <div>
                    <h1 id='questionTitle' style={{marginTop: '3em'}}></h1>
                    <div className='mapContainer'>
                        <MapContainer mapStyles={{ width: '40vw', height: '50vh'}} markers={this.state.markers} zoom={10} initialCenter={this.state.initialCenter} center={this.state.initialCenter}/>
                    </div>
                        <button onClick={this.handleCurrentPositionClick}>Current Position</button>
                </div>
            );
    }

} 

export default TutorialPageTwo;