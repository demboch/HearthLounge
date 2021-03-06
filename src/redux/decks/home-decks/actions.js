import * as types from "./types";

export function fetchHotDecksRequest(){
  return {
    type: types.FETCH_HOT_DECKS_REQUEST
  }
}

export function fetchHotDecksSuccess(decks){
  return {
    type: types.FETCH_HOT_DECKS_SUCCESS,
    payload: decks
  }
}

export function fetchHotDecksFailure(error){
  return {
    type: types.FETCH_HOT_DECKS_FAILURE,
    payload: error
  }
}

export function filterHotDecks(payload){
  return {
    type: types.FILTER_HOT_DECKS,
    payload
  }
}