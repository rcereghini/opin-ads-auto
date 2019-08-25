import { TutorialActionTypes } from "./tutorial.types";

const INITIAL_STATE = {
  pinBox: {
    one: null,
    two: null,
    three: null,
    four: null,
    five: null
  }
};

const tutorialReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TutorialActionTypes.SET_PINBOX:
      return {
        ...state,
        pinBox: action.payload
      };
    default:
      return state;
  }
};

export default tutorialReducer;
