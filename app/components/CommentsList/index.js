import React from "react";
import firebase from "firebase";
import * as _ from "lodash";
import Comment from "../Comment";
import ComponentsTitle from "../CommentsTitle";
import CommentsToggleButton from "../CommentsToogleButton";

export default class CommentsList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showComments: true,
      comments: []
    };
  }
  componentDidMount() {
    const dbRef = firebase.database().ref("comments");
    dbRef.on("value", snapshot => {
      const comments = snapshot.val();
      if (!comments && !comments.length) return;
      this.setState({
        comments
      });
    });
  }
  _toggleShowComments = () => {
    this.setState({
      showComments: !this.state.showComments
    });
  };
  _getCountComents = comments => {
    if (Array.isArray(comments)) return comments.filter(Boolean).length;
    if (typeof comments == "object") return Object.keys(comments).length;
    else 0; //if not valid format data
  };
  render() {
    const { showComments, comments } = this.state;
    const commentsCount = this._getCountComents(comments);
    return (
      <div className="comments-body">
        <ComponentsTitle counter={commentsCount} />
        <CommentsToggleButton
          toggleComments={this._toggleShowComments}
          isShow={showComments}
        />
        {commentsCount > 0 && showComments && (
          <ul className="comments-list">
            {_.map(comments, (comment, index) => (
              <Comment {...comment} key={index} id={index} />
            ))}
          </ul>
        )}
      </div>
    );
  }
}
