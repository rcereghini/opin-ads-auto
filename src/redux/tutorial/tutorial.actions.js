import { TutorialActionTypes } from "./tutorial.types";

export const setUserPinBox = pinbox => ({
  type: UserActionTypes.SET_USER_PINBOX,
  payload: pinbox
});
