import React from 'react';
import Tooltip from 'antd/lib/tooltip';
import Icon from "../../../../../../../components/icon";

const GameDetails = ({deckAuthor}) =>{
  const {username} = deckAuthor;
  return (
    <Tooltip title={`${username}'s in-game info`} placement="bottom">
      <div className="game-details-wrapper">
        <Icon name="battletag"/>
        <p>EU</p>
        <p><Icon name="priest"/></p>
      </div>
    </Tooltip>
  )
};

export default GameDetails;