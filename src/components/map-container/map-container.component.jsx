import React, { Component } from 'react';
import { Map, InfoWindow, GoogleApiWrapper, Marker, Circle } from 'google-maps-react';

import './map-container.styles.scss'

console.log('circle ===>', Circle)

export class MapContainer extends Component {

  constructor(){
      super();

      this.state = {
          showingInfoWindow: false,
          activeMarker: {},
          currentMarker: null,
          selectedPlace: {},
          markerLocations: [],
          pinBox: {
            one: null,
            two: null,
            three: null,
            four: null,
            five: null
          }
      }
  }

  componentDidMount(){
    console.log('hi')
    console.log('the component ===>', this)
  }

  onMarkerClick = (props, marker, e) => {

    (!this.state.showingInfoWindow) || marker.name != this.state.currentMarker ?
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            currentMarker: marker.name,
            showingInfoWindow: true
        })
    :
        this.setState({
          selectedPlace: props,
          activeMarker: null,
          showingInfoWindow: false
        });
    }

  onClose = props => {
      if (this.state.showingInfoWindow) {
      this.setState({
          showingInfoWindow: false,
          activeMarker: null
      });
      }
  };

  onMapClick = (t, map, c) => {
      let lat = c.latLng.lat();
      let lng = c.latLng.lng();
      let newMarkerLoc = this.state.markerLocations;

      const drawCirclePushLocs = () => {
        let circle = new this.props.google.maps.Circle({
          strokeColor: '#7796CB',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#A3BCF9',
          fillOpacity: 0.3,
          map,
          center: {lat: lat, lng: lng},
          radius: 8047,
        })
  
        newMarkerLoc = [lat, lng, circle]
        console.log('newMarkerLoc ===>', newMarkerLoc)
      }

      if(!this.state.pinBox.one){
        drawCirclePushLocs();
        this.setState({
            pinBox: {
              one: newMarkerLoc,
              two: this.state.pinBox.two,
              three: this.state.pinBox.three,
              four: this.state.pinBox.four,
              five: this.state.pinBox.five
            }
        });
      } else if (!this.state.pinBox.two){
        drawCirclePushLocs();
        this.setState({
          pinBox: {
            one: this.state.pinBox.one,
            two: newMarkerLoc,
            three: this.state.pinBox.three,
            four: this.state.pinBox.four,
            five: this.state.pinBox.five
          }
      });
      } else if (!this.state.pinBox.three){
        drawCirclePushLocs();
        this.setState({
          pinBox: {
            one: this.state.pinBox.one,
            two: this.state.pinBox.two,
            three: newMarkerLoc,
            four: this.state.pinBox.four,
            five: this.state.pinBox.five
          }
      })
      } else if (!this.state.pinBox.four){
        drawCirclePushLocs();
        this.setState({
          pinBox: {
            one: this.state.pinBox.one,
            two: this.state.pinBox.two,
            three: this.state.pinBox.three,
            four: newMarkerLoc,
            five: this.state.pinBox.five
          }
      })
      } else if (!this.state.pinBox.five){
        drawCirclePushLocs();
        this.setState({
          pinBox: {
            one: this.state.pinBox.one,
            two: this.state.pinBox.two,
            three: this.state.pinBox.three,
            four: this.state.pinBox.four,
            five: newMarkerLoc
          }
      })
      } else {
        alert('Limit of 5 pins exceeded. Please remove a pin first.')
      }
  }

  onPinBoxClick = (box) => {
    console.log('box', box)
    console.log('state', this.state)
    switch(box){
      case 'one':
       this.state.pinBox.one[2].setMap(null)
        this.setState({
          pinBox: {
            one: null,
            two: this.state.pinBox.two,
            three: this.state.pinBox.three,
            four: this.state.pinBox.four,
            five: this.state.pinBox.five
          }
        })
        break;
      case 'two':
          this.state.pinBox.two[2].setMap(null)
          this.setState({
            pinBox: {
              one: this.state.pinBox.one,
              two: null,
              three: this.state.pinBox.three,
              four: this.state.pinBox.four,
              five: this.state.pinBox.five
            }
          })
          break;
        case 'three':
            this.state.pinBox.three[2].setMap(null)
            this.setState({
              pinBox: {
                one: this.state.pinBox.one,
                two: this.state.pinBox.two,
                three: null,
                four: this.state.pinBox.four,
                five: this.state.pinBox.five
              }
            })
          break;
        case 'four':
            this.state.pinBox.four[2].setMap(null)
            this.setState({
              pinBox: {
                one: this.state.pinBox.one,
                two: this.state.pinBox.two,
                three: this.state.pinBox.three,
                four: null,
                five: this.state.pinBox.five
              }
            })
          break;
        case 'five':
            this.state.pinBox.five[2].setMap(null)
            this.setState({
              pinBox: {
                one: this.state.pinBox.one,
                two: this.state.pinBox.two,
                three: this.state.pinBox.three,
                four: this.state.pinBox.four,
                five: null
              }
            })
          break;
    }
   
  }

  render() {
    
    let pinBoxes = Object.getOwnPropertyNames(this.state.pinBox)
    
    return (
      <div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <div className='pinBox'>
            {
              pinBoxes.map((pinSlot, i) => {
                return <p key={i} onClick={() => this.onPinBoxClick(pinSlot)} style={this.state.pinBox[pinBoxes[i]] ? {backgroundColor: 'blue'} : null}>Pin {i+1}</p>
              })
            }
          </div>
        </div>
        <Map  id='mapComponent' google={this.props.google}
                zoom={10}
                onClick={this.onMapClick}
                className='map'
                initialCenter={{
                  lat: 33.373332,
                  lng: -111.940023
                }}
                >
                  {
                    pinBoxes.map((pinSlot, i) => {
                      return this.state.pinBox[pinSlot] ? <Marker key={i+1} onClick={this.onMarkerClick} name={i+1} position={{lat: this.state.pinBox[pinSlot][0], lng: this.state.pinBox[pinSlot][1]}}/> : null       
                    })
                  }
                  

                 
                              <InfoWindow
                      marker={this.state.activeMarker}
                      visible={this.state.showingInfoWindow}
                      onClose={this.onClose}
                  >
                      <div>
                          <h4 style={{ textAlign: 'center' }}>{this.state.selectedPlace.name + ' miles'}</h4>
                          <input type="range" min="5" max="15" value="10" className="slider"></input>
                      </div>
                  </InfoWindow>
                </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC5_YmwrvVnI11fY_3WE3JynwbyWcrEdl4'
})(MapContainer);