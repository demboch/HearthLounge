import {call, put, takeEvery} from 'redux-saga/effects';
import {getLazyloadDecks} from "../../../firebase/decks/deck/read/index";
import * as actions from "./actions";
import * as types from "./types";

export const fetchDecks = () => {
  let deckPromise = new Promise((resolve, reject) => getLazyloadDecks(resolve, reject));
  return deckPromise.then(decks => ({decks})).catch(err => ({err: err.message}))
};

export function* fetchDecksSaga() {
  const {decks, err} = yield call(fetchDecks);
  if(err){
    yield put(actions.fetchDecksFailure(err));
  } else {
    yield put(actions.fetchDecksSuccess(decks));
  }
}

export function* watchDecks() {
  yield takeEvery(types.FETCH_DECKS_REQUEST, fetchDecksSaga)
}