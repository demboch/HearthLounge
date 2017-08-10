import {FETCH_ADVENTURE_DECKS} from "../../types/adventures/boss";


export default function(state={}, action){
  switch(action.type){
    case FETCH_ADVENTURE_DECKS: return {
        ...state,
      decks: action.decks
    };
    default: return state;
  }
}