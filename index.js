// Import stylesheets
import './style.css';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import * as firebaseui from 'firebaseui';

// Document elements
const startRsvpButton = document.getElementById('startSRVP');
const guestbookContainer = document.getElementById('guestbook-container');

const form = document.getElementById('leave-message');
const input = document.getElementById('message');
const guestbook = document.getElementById('guestbook');
const numberAttending = document.getElementById('number-attending');
const rsvpYes = document.getElementById('rsvp-yes');
const rsvpNo = document.getElementById('rsvp-no');

var rsvpListener = null;
var guestbookListener = null;

// Add Firebase project configuration object here
const firebaseConfig = {
  apiKey: "AIzaSyDl8L86gUB6cBwoJ1uqfskUzwni6JtPLTU",
  authDomain: "fir-web-codelab-5109e.firebaseapp.com",
  databaseURL: "https://fir-web-codelab-5109e.firebaseio.com",
  projectId: "fir-web-codelab-5109e",
  storageBucket: "fir-web-codelab-5109e.appspot.com",
  messagingSenderId: "527347559381",
  appId: "1:527347559381:web:621d7ec63b6077bf9aeb5c"
};

firebase.initializeApp(firebaseConfig);

// FirebaseUI config
const uiConfig = {
credentialHelper: firebaseui.auth.CredentialHelper.NONE,
signInOptions: [
// Email / Password Provider.
firebase.auth.EmailAuthProvider.PROVIDER_ID
],
callbacks: {
signInSuccessWithAuthResult: function(authResult, redirectUrl){
// Handle sign-in.
// Return false to avoid redirect.
return false;
}
}
};

const ui = new firebaseui.auth.AuthUI(firebase.auth());

startRsvpButton.addEventListener("click", ()=> {
if (firebase.auth().currentUser) {
firebase.auth().signOut();
} else {
ui.start("#firebaseui-auth-container", uiConfig);
}
});

firebase.auth().onAuthStateChanged((user)=> {
if (user) {
startRsvpButton.textContent = "LOGOUT";
guestbookContainer.style.display = "block";
} else {
startRsvpButton.textContent = "RSVP";
guestbookContainer.style.display = "none";
}
});

form.addEventListener("submit", (e)=>{
  e.preventDefault();

  firebase.firestore().collection("guestbook").add({
    text: input.value,
    timestamp: Date.now(),
    name: firebase.auth().currentUser.displayName,
    userId: firebase.auth().currentUser.uid
  });

  input.value = "";
  return false;
});

