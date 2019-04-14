import React from "react";
import firebase from "firebase";

export default class Comment extends React.PureComponent {
  _removeComment = event => {
    event.preventDefault();
    if (confirm("Are you really want to remove this awesome comment?")) {
      const { id } = this.props;
      firebase
        .database()
        .ref("comments")
        .child(id)
        .remove();
    }
  };
  render() {
    const { name, text } = this.props;
    return (
      <li className="comments-item">
        <h3>
          {name}
          <a href="#" onClick={this._removeComment}>
            delete
          </a>
        </h3>
        <p>{text}</p>
      </li>
    );
  }
}
