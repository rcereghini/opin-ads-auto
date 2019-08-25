import React, { Component } from "react";
import { auth, firestore } from "../../firebase/firebase.utils";

import TutorialPageOne from "./pages/TutorialPageOne/tutorial-one.component";
import TutorialPageTwo from "./pages/TutorialPageTwo/tutorial-two.component";
import TutorialPageThree from "./pages/TutorialPageThree/tutorial-three.component";

import "./tutorial.styles.scss";

class TutorialPage extends Component {
  constructor() {
    super();

    this.state = {
      tutorialCurrentPage: 0
    };
  }

  componentDidMount() {
    let componentScope = this;
    console.log("hi");

    let { uid } = auth.currentUser;
    let userRef = firestore.collection("users").doc(uid);
    let currentPage;

    userRef.onSnapshot(function(doc) {
      let userData = doc.data();
      componentScope.setState({
        tutorialCurrentPage: userData.tutorialCurrentPage
      });
    });

    this.setState({
      tutorialCurrentPage: currentPage
    });
  }

  render() {
    switch (this.state.tutorialCurrentPage) {
      case 1:
        return <TutorialPageOne></TutorialPageOne>;
        break;
      case 2:
        return <TutorialPageTwo></TutorialPageTwo>;
        break;
      case 3:
        return <TutorialPageThree></TutorialPageThree>;
        break;
      default:
        return <span></span>;
        break;
    }
  }
}

export default TutorialPage;
