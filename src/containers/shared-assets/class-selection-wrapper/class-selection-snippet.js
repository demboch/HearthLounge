import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {icon_filters} from '../../../globals/filters';
import Icon from "../../../components/icon";

const ClassSelectionSnippet = ({page, updatePlayerClass}) =>{

  const handleClassSelection = (e) =>{
    let playerClass = e.currentTarget.id;
    updatePlayerClass(playerClass)
  };

  const listClasses = () =>{
    return (
        icon_filters.playerClass.map(playerClass =>
            <li key={playerClass.url}
                className={playerClass.url}
                id={playerClass.url}
                onClick={handleClassSelection}>
              <Link to={`/${page}/${playerClass.url}`}>
                <Icon name={playerClass.url} />
                <p>{playerClass.name}</p>
              </Link>
            </li>
        )
    )
  };

  return (
    <div className={`container__page container__page--oneSided create-deck`}>
      <div className="container__page--inner container__class-selection">
        <h3>Choose class</h3>
        <ul>
          {listClasses()}
        </ul>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePlayerClass: (playerClass) => (dispatch({
      type: 'UPDATE_PLAYERCLASS', playerClass
    }))
  }
};

export default connect(null, mapDispatchToProps)(ClassSelectionSnippet)