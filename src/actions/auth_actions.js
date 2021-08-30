import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from "./types";
import { AsyncStorage } from "react-native";
import * as Facebook from "expo-facebook";

export const facebookLogin = () => async (dispatch) => {
  let token = await AsyncStorage.getItem("fb_token");
  console.log(token);
  if (token) {
    // Dispatch an action saying FB login is done
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    // Start up FB login process
    doFacebookLogin(dispatch);
  }
};

const doFacebookLogin = async (dispatch) => {
  try {
    await Facebook.initializeAsync({
      appId: "264458098841655",
    });
    let { token, type } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile"],
    });
    if (type === "cancel") {
      return dispatch({ type: FACEBOOK_LOGIN_FAIL });
    }
    await AsyncStorage.setItem("fb_token", token);
    console.log(token);

    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } catch ({ message }) {
    alert(`${message}`);
  }
};
