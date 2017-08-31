import * as types from '../../types/reddit';

const initialState = {
  posts: [],
  collapsedComments: [],
  activeCategoryFilter: 'hot'
};

export default function(state=initialState, {type, payload}){
  console.log("foo", type);
  switch(type){
    case types.FETCH_REDDIT_POSTS_REQUEST:
      return{
      ...state,
      loading: true
    };
    case types.FETCH_REDDIT_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: payload
      };
    case types.FETCH_REDDIT_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      };

    case types.UPDATE_FILTERED_POSTS: return {
      ...state,
      filteredPosts: payload
    };
    case types.UPDATE_ACTIVE_POST: return {
      ...state,
      activePost: payload
    };
    case types.UPDATE_POST_COMMENTS: return {
        ...state,
      postComments: payload
    };
    case types.TOGGLE_COLLAPSE: return {
        ...state,
        collapsedComments: payload
    };
    case types.TOGGLE_DOMAIN_FILTER: return {
      ...state,
      activeDomainFilter: payload
    };
    case types.TOGGLE_CATEGORY_FILTER: return {
      ...state,
      activeCategoryFilter: payload
    };
    default: return state;
  }
}