import React, { Component } from 'react';
import { Map, InfoWindow, GoogleApiWrapper, Marker } from 'google-maps-react';

import './map-container.styles.scss'

export class MapContainer extends Component {

  constructor(){
      super();

      this.state = {
          showingInfoWindow: false,
          activeMarker: {},
          currentMarker: null,
          selectedPlace: {},
          markerLocations: []
      }
  }

  onMarkerClick = (props, marker, e) => {
    console.log('marker ===>', marker);
    console.log('props ===>', props);
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
      if(newMarkerLoc.length >= 5) newMarkerLoc.shift();
      newMarkerLoc.push([lat, lng])

      this.setState({
          markerLocations: newMarkerLoc
      });
  }

  render() {
    return (
      <div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <div className='pinBox'>
            <p>Pin 1</p>
            <p>Pin 2</p>
            <p>Pin 3</p>
            <p>Pin 4</p>
            <p>Pin 5</p>
          </div>
        </div>
        <Map   google={this.props.google}
                zoom={10}
                onClick={this.onMapClick}
                className='map'
                initialCenter={{
                lat: 33.373332,
                lng: -111.940023
                }}
                >
                  {
                      this.state.markerLocations.map((markerLoc, i) => {
                          return (
                              <Marker key={i} onClick={this.onMarkerClick} name={i} position={{lat: markerLoc[0], lng: markerLoc[1]}}
                              />
                          )
                      })
                  }
                  {/* <Marker
                      onClick={this.onMarkerClick}
                      name={'Kiwanis Dojo'}
                  /> */}
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