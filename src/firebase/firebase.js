import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { config } from "./config";

if (!firebase.apps.length) {
  console.log("I am initializing new firebase app");
  firebase.initializeApp(config);
}

export default firebase;
