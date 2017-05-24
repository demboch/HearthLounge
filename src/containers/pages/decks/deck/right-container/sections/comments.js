import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';

import SectionHeader from './comment-assets/section-header';
import SectionBody from './comment-assets/section-body';
import SectionFooter from './comment-assets/section-footer';

import {fetchComments, postComment, rateComment} from '../../../../../../server/decks/deck-comments';

const updateCommentText = _.debounce((updateComment, value) => {
  updateComment({deckComment: value})
}, 300);

class DeckComments extends Component {
  componentDidMount(){
    const { deckId } = this.props.currentDeck;
    fetchComments(deckId, (comments)=>this.props.updateComments(deckId, comments))
  }

  handleInputChange = (e) => {
    let value = e.target.value;
    this.props.updateComment({deckCommentControlled: value});
    updateCommentText(this.props.updateComment, value);
  };

  handlePreviewClick = () => {
    let isActive = this.props.previewIsActive === false ? true : false;
    this.props.togglePreview(isActive);
  };

  handleAddCommentClick = () => {
    this.props.toggleCommentBox(true);
  };


  handleHideCommentClick = () => {
    this.props.toggleCommentBox(false);
    this.props.togglePreview(false);
  };

  handlePostCommentClick = () => {
    const {deckId, author} = this.props.currentDeck;

    postComment(author, this.props.deckComment, deckId, this.props.activeUser.uid);
    fetchComments(deckId, (comments)=>this.props.updateComments(deckId, comments))
  };

  handleCommentRatingClick = (e, vote) =>{
    let commentId = e.currentTarget.id;
    const {deckId, author} = this.props.currentDeck;
    rateComment(deckId, commentId, this.props.user.uid, vote)
  };

  render() {
    const {comments, deckComment, deckCommentControlled, updateComment, commentBoxIsActive, previewIsActive} = this.props;
    let mappedComments = _.map(comments);
    return (
        <div className={`container__details--section container__details--comments ${commentBoxIsActive ? 'editorActive' : ''}`}>
          <SectionHeader />

          <SectionBody comments={mappedComments}
                       deckComment={deckComment}
                       previewIsActive={previewIsActive}
                       handleCommentRatingClick={this.handleCommentRatingClick}/>

          <SectionFooter commentBoxIsActive={commentBoxIsActive}
                         deckCommentControlled={deckCommentControlled}
                         updateComment={updateComment}
                         handleInputChange={this.handleInputChange}
                         handleAddCommentClick={this.handleAddCommentClick}
                         handlePostCommentClick={this.handlePostCommentClick}
                         handleHideCommentClick={this.handleHideCommentClick}
                         handlePreviewClick={this.handlePreviewClick}/>
        </div>
    )
  }

}

const mapStateToProps = (state) => {
  const {comments, deckComment, deckCommentControlled, commentBoxIsActive, previewIsActive} = state.deckView;
  return {comments, deckComment, deckCommentControlled, commentBoxIsActive, previewIsActive}
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateComment: (props) => (dispatch({
      type: 'UPDATE_COMMENT', props
    })),
    toggleCommentBox: (commentBoxIsActive) => (dispatch({
      type: 'TOGGLE_COMMENT_BOX', commentBoxIsActive
    })),
    togglePreview: (previewIsActive) => (dispatch({
      type: 'TOGGLE_PREVIEW', previewIsActive
    })),
    updateComments: (deckId, comments) => (dispatch({
      type: 'FETCH_COMMENTS',  comments: {[deckId]: _.map(comments)}
    }))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(DeckComments)

DeckComments.propTypes = {
  updateComment: PropTypes.func
};