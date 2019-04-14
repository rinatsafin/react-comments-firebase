import React from "react";

export default class ComponentsTitle extends React.PureComponent {
  _getCommentsTitle(commentsCounter) {
    if (commentsCounter == 0) return "No Cometns yet";
    if (commentsCounter == 1) return "1 comment";
    else return `${commentsCounter} comments`;
  }
  render() {
    const { counter } = this.props;
    return (
      <div className="comments-title">{this._getCommentsTitle(counter)}</div>
    );
  }
}
