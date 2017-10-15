import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import DecksBlock from './decks/decks';
// import ArenaPickerBlock from './arena-picker/arena-picker';
import CardsBlock from './cards/cards';
import ExtensionsBlock from './extensions/extensions';
import TournamentsBlock from './tournament/tournaments';
import CreateDeckBlock from './create-deck/create-deck';
import HomeBlock from './block';
import { TwitchBlock } from './twitch/twitch';
import {updateViews} from "../../../firebase/decks/deck/update";
import ForumBlock from './forum/forum';
import {fetchFilteredDecks, isFilterActive} from "./utils/deck-filters";
import {FETCH_HOT_DECKS_REQUEST} from "../../../redux/decks/home-decks/types";
import {FETCH_REDDIT_POSTS_REQUEST} from "../../../redux/reddit/posts/types";
import {UPDATE_ACTIVE_POST} from "../../../redux/reddit/active-post/types";
import {FETCH_REDDIT_POST_COMMENTS_REQUEST} from "../../../redux/reddit/comments/types";
import {FETCH_ACTIVE_DECK_SUCCESS} from "../../../redux/deck/active-deck/types";
import {UPDATE_ACTIVE_DECK_COPY} from "../../../redux/deck/active-deck-copy/types";
class Home extends PureComponent{

  componentDidMount() {
    const {updateDecks, updateRedditPosts, posts, hotDecks} = this.props;
    if(hotDecks.loading) {
      updateDecks();
    }
    if(posts.loading) {
      updateRedditPosts();
    }
  }

  handleDeckClick = (e) =>{
    const {hotDecks, updateActiveDeck} = this.props;
    const {all} = hotDecks;
    let deckId = e.currentTarget.id;
    let activeDeck = all.find(deck => deck.deckId === deckId);
    updateActiveDeck(activeDeck);
    updateViews(deckId);
  };

  handleRedditPostClick = post =>{
    const {updateActivePost, updatePostComments} = this.props;
    const {id} = post;

    updateActivePost(post);
    updatePostComments(id);
  };

  handleFilterClick = (e) =>{
    const {updateDeckFilters, updateDecks, deckFilters} = this.props;
    let targetId = e.currentTarget.id;
    let filter = e.currentTarget.dataset.filter;
    let isActive = e.currentTarget.classList.contains('active');

    isFilterActive(filter, targetId, isActive, updateDeckFilters);
    fetchFilteredDecks(deckFilters, filter, targetId, updateDecks);
  };

  render() {
    const {hotDecks, posts, deckFilters} = this.props;
    return (
        <div className="container__index home">
          <ul className="home__list">
            <DecksBlock hotDecks={hotDecks}
                        deckFilters={deckFilters}
                        handleDeckClick={this.handleDeckClick}
                        handleFilterClick={this.handleFilterClick}/>
            <HomeBlock icon="create-deck">
              <CreateDeckBlock/>
            </HomeBlock>
            <HomeBlock icon="trophy" blockTitle="tournaments">
              <TournamentsBlock/>
            </HomeBlock>
            <HomeBlock icon="expansions" blockTitle="extensions" width={2}>
              <ExtensionsBlock/>
            </HomeBlock>
            <HomeBlock icon="reddit">
              <ForumBlock posts={posts}
                          handleRedditPostClick={this.handleRedditPostClick}/>
            </HomeBlock>
            <HomeBlock icon="card" title="cards">
              <CardsBlock/>
            </HomeBlock>

            {/*<HomeBlock icon="twitch" width={2} title="top HS broadcasters">*/}
              {/*<TwitchBlock/>*/}
            {/*</HomeBlock>*/}
            {/*<HomeBlock icon="bubbles2" title="forum" >*/}
            {/*<ForumBlock />*/}
            {/*</HomeBlock>*/}

          </ul>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {hotDecks} = state.home;
  const {deckFilters} = hotDecks;
  const {posts} = state.redditPosts;
  return {hotDecks, posts, deckFilters};
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateDecks: () => dispatch({type: FETCH_HOT_DECKS_REQUEST}),
    updateActiveDeck: payload => dispatch({type: FETCH_ACTIVE_DECK_SUCCESS, payload}),
    updateDeckFilters: (deckFilters) => dispatch({
      type: 'UPDATE_DECK_FILTERS', deckFilters
    }),
    updateRedditPosts: () => dispatch({type: FETCH_REDDIT_POSTS_REQUEST}),
    updateActivePost: payload => dispatch({
      type: UPDATE_ACTIVE_POST, payload
    }),
    updatePostComments: payload => dispatch({
      type: FETCH_REDDIT_POST_COMMENTS_REQUEST, payload
    }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);