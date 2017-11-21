import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";
import AboutDeck from "./save-deck-assets/about-deck";
import Preview from "./save-deck-assets/preview";
import {default as saveDeck} from "../../../../../../../firebase/decks/deck/create/deck";
import {error} from "../../../../../../../utils/messages";
import {updateDeckProperty} from "../../../../../../../redux/actions/create-deck/deck-options.action";
import {previewCardProps} from "../../../../../../../components/text-editor/utils/preview-card-props";

const updateDeckText = _.debounce((updateDeckProperty, value, cards) => {
  let deckText = !cards.loading && previewCardProps(value, cards.allCards) || value;
  updateDeckProperty({deckText})
}, 300);

const DeckOptions = ({authenticated, cards, playerClass, deckstring, patch, user, deckMode, deckTitle, deckArchetype, deckText, deckAdventure, deckBoss, deckTextControlled, simplifiedDeck, updateDeckProperty}) => {
  const handleInputChange = (e) => {
    let target = e.target.id;
    let value = e.target.value;
    if(target === "deckTextControlled") {
      updateDeckProperty({deckTextControlled: value});
      if(e.keyCode === 13){
        value += "<br>\n";
      }
      updateDeckText(updateDeckProperty, value, cards);
    } else {
      updateDeckProperty({[target]: value});
    }
  };

  const handleSelectChange = (v, selector) => {
    let key= `deck${_.upperFirst(selector)}`;
    updateDeckProperty({[key]: v});
  };

  const handleSaveDeckSubmit = (e) => {
    e.preventDefault();
    if(authenticated && user){
      const {uid, username} = user;
      saveDeck(patch, playerClass, deckTitle, deckMode, deckArchetype, _.kebabCase(deckAdventure), _.kebabCase(deckBoss), simplifiedDeck, deckText, deckstring, uid, username);
    } else {
      error("You have to be logged in in order to save your deck.", 6)
    }
  };
  return (
      <div className="container__details">
        <AboutDeck playerClass={playerClass}
                   deckTitle={deckTitle}
                   deckMode={deckMode}
                   deckArchetype={deckArchetype}
                   deckAdventure={deckAdventure}
                   deckBoss={deckBoss}
                   deckTextControlled={deckTextControlled}
                   handleInputChange={handleInputChange}
                   handleSelectChange={handleSelectChange}
                   handleSaveDeckSubmit={(e)=>handleSaveDeckSubmit(e)}
                   handleTagInsertion={updateDeckProperty}/>
        <Preview deckText={deckText}/>
      </div>
  )
};


const mapStateToProps = (state) => {
  const {deckTitle, deckMode, deckArchetype, deckAdventure, deckBoss, deckText, deckTextControlled} = state.deckDetails;
  return {
    deckTitle, deckMode, deckArchetype, deckAdventure, deckBoss, deckText, deckTextControlled
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateDeckProperty: props => dispatch(updateDeckProperty(props))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckOptions)

DeckOptions.propTypes = {
  playerClass: PropTypes.string,
  user: PropTypes.object,
  deckMode: PropTypes.string,
  deckTitle: PropTypes.string,
  deckArchetype: PropTypes.string,
  deckText: PropTypes.string,
  deckTextControlled: PropTypes.string,
  simplifiedDeck: PropTypes.object,
  updateDeckProperty: PropTypes.func
};