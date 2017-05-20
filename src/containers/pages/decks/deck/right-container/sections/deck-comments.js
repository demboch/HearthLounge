import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../../view/comment';

const DeckComments = () =>{
  return (
      <div className="container__details--section container__details--comments">
        <div className="section__header">
          <div className="line"></div>
          <h1>104 comments</h1>
        </div>
        <div className="section__body">
          <Comment/>
          <Comment/>
          <Comment/>
          <Comment/>
          <Comment/>
          <Comment/>
          <Comment/>
          <Comment/>
          <Comment/>
          <Comment/>
          <Comment/>
          <Comment/>
          <Comment/>
        </div>
      </div>
  )
};

export default DeckComments;

// DeckComments.propTypes = {
//   currentDeck: PropTypes.object
// };