import React, { Component } from "react";

import CustomButton from "../../../../components/custom-button/custom-button.component";

import Typed from "typed.js";

import "./tutorial-three.styles.scss";

class TutorialPageThree extends Component {
  constructor() {
    super();

    this.state = {
      questionAsked: false
    };
  }

  componentDidMount() {
    var options = {
      strings: ["Is this ad for a specific listing?"],
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

  render() {
    return (
      <div>
        <h1 id="questionTitle" style={{ marginTop: "3em" }}></h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <p
            className={
              "specListingAnswerButtons" +
              (this.state.specificListing === "Y" ? " buttonActive" : "")
            }
            onClick={() => {
              this.setState({
                specificListing: "Y"
              });
            }}
          >
            YES
          </p>
          <p
            className={
              "specListingAnswerButtons" +
              (this.state.specificListing === "N" ? " buttonActive" : "")
            }
            onClick={() => {
              this.setState({
                specificListing: "N"
              });
            }}
          >
            NO
          </p>
        </div>
        {this.state.specificListing === "Y" ? (
          <div className="formDiv">
            <h1>Please provide any of the following: </h1>
            <div>
              <p>Address:</p>
              <input></input>
            </div>
            <div>
              <p>Address 2:</p>
              <input></input>
            </div>
            <div>
              <p>City:</p>
              <input></input>
            </div>
            <div>
              <p>State:</p>
              <input></input>
            </div>
            <div>
              <p>Zip:</p>
              <input></input>
            </div>
            <div>
              <p>MLS:</p>
              <input></input>
            </div>
            <div>
              <p>Zillow:</p>
              <input></input>
            </div>
          </div>
        ) : null}
        {this.state.specificListing === "N" ? (
          <div className="formDiv">
            <h1>Please describe the type of ad you'd like to run:</h1>
            <textarea rows="15" cols="80"></textarea>
          </div>
        ) : null}
        {this.state.specificListing ? (
          <div
            style={{
              margin: "5em",
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <CustomButton>Continue</CustomButton>
          </div>
        ) : null}
      </div>
    );
  }
}

export default TutorialPageThree;
