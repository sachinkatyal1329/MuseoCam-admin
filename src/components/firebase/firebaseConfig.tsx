import * as firebase from 'firebase/app';
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCSOcIEV7IgvCf-tfUIKRuz4yVOLnhE1co",
    authDomain: "pennmuseumtest.firebaseapp.com",
    databaseURL: "https://pennmuseumtest.firebaseio.com",
    projectId: "pennmuseumtest",
    storageBucket: "pennmuseumtest.appspot.com",
}

firebase.initializeApp(firebaseConfig)
export const storage = firebase.storage()