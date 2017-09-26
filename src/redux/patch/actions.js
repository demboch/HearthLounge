import * as types from "./types";

export function fetchPatchRequest(){
  return {
    type: types.FETCH_PATCH_REQUEST
  }
}

export function fetchPatchSuccess(current){
  return {
    type: types.FETCH_PATCH_SUCCESS,
    payload: current
  }
}

export function fetchPatchFailure(error){
  return {
    type: types.FETCH_PATCH_FAILURE,
    payload: error
  }
}