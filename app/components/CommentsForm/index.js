import React from "react";
import firebase from "firebase";

export default class CommentstsForm extends React.PureComponent {
  _submitForm = event => {
    event.preventDefault();
    const comment = {
      name: this._name.value || "",
      text: this._text.value || ""
    };
    if (comment.name.length > 1 && comment.text.length > 2)
      return firebase
        .database()
        .ref()
        .child("comments")
        .push(comment)
        .then(() => {
          this._name.value = "";
          this._text.value = "";
        })
        .catch(console.error);
    if (comment.name.length < 2) {
      alert("Please enter a name more than 1 character!");
      return this._name.focus();
    }
    if (comment.text.length < 3) {
      alert("Please enter your comment message more than 1 character!");
      return this._text.focus();
    }
  };
  render() {
    return (
      <form className="comments-form" onSubmit={this._submitForm}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          ref={input => (this._name = input)}
        />
        <label htmlFor="text">Comment</label>
        <textarea
          name="text"
          id="text"
          ref={textarea => (this._text = textarea)}
        />
        <input type="submit" value="post commit" />
      </form>
    );
  }
}
