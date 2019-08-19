import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {

    constructor(){
        super();

        this.state = {
            markers: []
        }
    }

  handleMapClick = (e) => {

  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={this.props.zoom}
        style={this.props.mapStyles ? this.props.mapStyles : mapStyles}
        initialCenter={this.props.initialCenter}
        center={this.props.center}
        onClick={(e) => console.log('e ===>', e)}>
        {
                (this.props.markers) ? this.props.markers.map(marker => (
                        <Marker onClick={marker.onClickFunc} name={marker.name} position={marker.position}></Marker>
                    )
                ) : ''   
        }
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC5_YmwrvVnI11fY_3WE3JynwbyWcrEdl4'
})(MapContainer);