import React, { Component } from "react";
import { auth, firestore } from "../../../../firebase/firebase.utils";

import MapContainer from "../../../../components/map-container/map-container.component";
import FormInput from "../../../../components/form-input/form-input.component";
import CustomButton from "../../../../components/custom-button/custom-button.component";

import Typed from "typed.js";

import "./tutorial-two.styles.scss";

class TutorialPageTwo extends Component {
  constructor() {
    super();

    this.state = {
      initialCenter: {
        lat: 43.3349874,
        lng: -111.91664639999999
      },
      pinBox: {
        one: null,
        two: null,
        three: null,
        four: null,
        five: null
      }
    };
  }

  componentDidMount() {
    var options = {
      strings: ["Where would you like to run your ad?"],
      typeSpeed: 15,
      showCursor: false,
      onComplete: () => {
        this.setState({
          questionAsked: true
        });
      }
    };

    var typed = new Typed("#questionTitle", options);
  }

  handleSubmit = async event => {
    event.preventDefault();
  };

  handleChange = event => {};

  handleCurrentPositionClick = () => {
    navigator.geolocation.getCurrentPosition(e => {
      this.setState(
        {
          initialCenter: {
            lat: e.coords.latitude,
            lng: e.coords.longitude
          }
        },
        e => {
          // document.querySelector('#map').zoom = 10;
        }
      );
    });
  };

  handleContinueClick = () => {
    let { uid } = auth.currentUser;
    let userRef = firestore.collection("users").doc(uid);

    let pinBoxToSubmit = { ...this.state.pinBox };
    let pinBoxProperties = ["one", "two", "three", "four", "five"];

    pinBoxProperties.forEach(pinSlot => {
      if (pinBoxToSubmit[pinSlot]) {
        let radius = pinBoxToSubmit[pinSlot][2].radius;
        pinBoxToSubmit[pinSlot].pop();
        pinBoxToSubmit[pinSlot].push(radius);
      }
    });

    userRef.update({
      tutorialPinBox: pinBoxToSubmit
    });
  };

  render() {
    return (
      <div>
        <h1 id="questionTitle" style={{ marginTop: "3em" }}></h1>
        <div className="mapContainer">
          <MapContainer
            pinBoxCallback={pinBox => {
              this.setState({ pinBox: pinBox });
            }}
            mapStyles={{ width: "40vw", height: "50vh" }}
            markers={this.state.markers}
            zoom={10}
            initialCenter={this.state.initialCenter}
            center={this.state.initialCenter}
          />
        </div>
        {this.state.pinBox.one ? (
          <div style={{ position: "fixed", bottom: "5em", right: "5em" }}>
            <CustomButton onClick={this.handleContinueClick}>
              Continue
            </CustomButton>
          </div>
        ) : null}
        {/* 
        div> */}
        {/* <button style={{ marginTop: '5em'}} onClick={this.handleCurrentPositionClick}>Current Position</button> */}
      </div>
    );
  }
}

export default TutorialPageTwo;
