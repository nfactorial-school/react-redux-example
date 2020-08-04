import firebase from "../firebase/firebase";

import { FETCH_POSTS, NEW_USER } from "./types";

export const fetchPosts = () => async (dispatch) => {
  firebase
    .database()
    .ref("/posts")
    .on("value", function (snapshot) {
      console.log("value is ", Object.values(snapshot.val()));
      dispatch({ type: FETCH_POSTS, payload: Object.values(snapshot.val()) });
    });
};

export const fetchUser = () => async (dispatch) => {
  firebase.auth().onAuthStateChanged((user) => {
    console.log("got new user", user);
    dispatch({ type: NEW_USER, payload: user });
  });
};

export const register = (email, password) => async (dispatch) => {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const login = (email, password) => async (dispatch) => {
  await firebase.auth().signInWithEmailAndPassword(email, password);
};

export const signout = () => async (dispatch) => {
  await firebase.auth().signOut();
};

export const post = (values) => async (dispatch) => {
  await firebase.database().ref("posts").push(values);
};
