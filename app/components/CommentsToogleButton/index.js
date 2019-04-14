import React from "react";

export default class CommentsToggleButton extends React.PureComponent {
  render() {
    const { toggleComments, isShow } = this.props;
    return (
      <button className="button" onClick={toggleComments}>
        {isShow ? "hide" : "show"} comments
      </button>
    );
  }
}
