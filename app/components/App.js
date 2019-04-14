import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase";

import CommentstsForm from "./CommentsForm/";
import CommentsList from "./CommentsList/";

const firebaseConfig = {
  apiKey: "AIzaSyB6A8jzWVJ23SUsO-lTCWFyz6ATAKUd80w",
  authDomain: "comments-react-21e02.firebaseapp.com",
  databaseURL: "https://comments-react-21e02.firebaseio.com",
  projectId: "comments-react-21e02",
  storageBucket: "comments-react-21e02.appspot.com",
  messagingSenderId: "136848764203"
};
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

class App extends React.PureComponent {
  render() {
    return (
      <div className="comments-box">
        <CommentstsForm />
        <CommentsList />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
