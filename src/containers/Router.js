import React from 'react';
import {syncHistoryWithStore} from 'react-router-redux';
import { Router, Route, browserHistory, IndexRoute, Redirect} from 'react-router';

import Home from './pages/home/home';

import Cards from './pages/cards/cards';
// import {Forum} from './pages/forum/forum';
import {Tournaments} from './pages/tournaments/tournaments';


import DeckSelection from "./pages/decks/deck-selection/deck-selection";
import Deck from './pages/decks/deck/deck';


// import {ArenaPicker} from './pages/arena-picker/arena-picker';
// import {ArenaPickerClassSelection} from './pages/arena-picker/class-selection';
// import {ArenaPickerClassSelected} from './pages/arena-picker/class-selected';

import Expansions from './pages/expansions/expansions';
import Expansion from './pages/expansions/right-container/expansion';
import ExpansionDetails from './pages/expansions/right-container/details';

import Adventures from './pages/adventures/adventures';
import Adventure from './pages/adventures/right-container/adventure';
import AdventureDetails from './pages/adventures/right-container/content/details';

import CreateDeck from './pages/create-deck/create-deck';
import CreateDeckClassSelection from './pages/create-deck/before-class-selection/class-selection';
import CreateDeckClassSelected from './pages/create-deck/after-class-selection/create-deck';

// import {Streams} from './pages/streams/streams';
// import Iframe from './pages/streams/iframe';


import Reddit from './pages/reddit/reddit';
import RedditPost from './pages/reddit/post/post';
import RedditPosts from './pages/reddit/posts/posts';

import Entry from './pages/entry/entry';
import SignUp from './pages/entry/right-container/sign-up/sign-up';
import SignUpUpdateProfile from './pages/entry/right-container/sign-up/second-phase/sign-up-update-profile';
import SignInResetPassword from './pages/entry/right-container/reset-password/reset-password';
import SignIn from './pages/entry/right-container/sign-in/sign-in';

import NotFound from './shared-assets/not-found';

import {Dashboard} from './pages/dashboard/dashboard';
import Rank from './pages/miscellaneous/rank/rank';
import Issues from './pages/miscellaneous/issues/issues';
import Miscellaneous from './pages/miscellaneous/container';
import PrivacyPolicy from './pages/miscellaneous/privacy-policy/privacy-policy';
import Main from './Main';

const App = ({store}) =>{
  const history = syncHistoryWithStore(browserHistory, store);
  return (
    <Router history={history}>
      <Route path="/"                   component={Main}>
        <IndexRoute                     component={Home} />
        <Redirect from="HearthLounge" to="/" />
        <Redirect from="HearthLounge/" to="/" />
        <Redirect from="/HearthLounge/" to="/" />
        <Redirect from="/HearthLounge" to="/" />
        <Redirect from="home" to="/" />
        <Route path=""                  component={Home} />


        <Route path="decks"     component={DeckSelection}>
          <Route path=":playerClass" component={DeckSelection} />
          <Route path=":deckId/:deckTitle"   component={Deck}/>
        </Route>

        <Route path="cards"             component={Cards} />

        {/*<Redirect from="arena-picker" to="arena-picker/class-selection" />*/}
        {/*<Route path="arena-picker"      component={ArenaPicker}>*/}
          {/*<Route path="class-selection" component={ArenaPickerClassSelection} />*/}
          {/*<Route path=":class"          component={ArenaPickerClassSelected} />*/}
        {/*</Route>*/}

        <Redirect from="expansion" to="expansions"/>
        <Route path="expansions"        component={Expansions}>
          <Redirect from=":expansion" to=":expansion/overview"/>
          <Route path=":expansion"      component={Expansion}>
            <Route path=":details"      component={ExpansionDetails}>
              <Route path=":detailsChild" />
            </Route>
          </Route>
        </Route>

        <Redirect from="adventure" to="adventures"/>
        <Route path="adventures"    component={Adventures}>
          <Redirect from=":adventure" to=":adventure/overview"/>
          <Route path=":adventure"  component={Adventure}>
            <Route path=":details"  component={AdventureDetails}>
              <Route path=":detailsChild" />
            </Route>
          </Route>

        </Route>

        <Redirect from="create-deck" to="create-deck/class-selection" />
        <Route path="create-deck"         component={CreateDeck}>
          <Route path="class-selection"   component={CreateDeckClassSelection} />
          <Route path=":class"            component={CreateDeckClassSelected} />

        </Route>

        {/*<Route path="forum"             component={Forum} />*/}
        <Route path="tournaments"       component={Tournaments} />

        {/*<Redirect from="twitch" to="twitch/all" />*/}
        {/*<Route path="twitch"         component={Streams}>*/}
          {/*<Route path=":channel"     component={Iframe}/>*/}
        {/*</Route>*/}

        <Redirect from="reddit" to="reddit/posts" />
        <Route path="reddit"              component={Reddit}>
          <Route path="posts"             component={RedditPosts} />
          <Route path="post/:id/:post"    component={RedditPost} />
          <Route path="post/:id"          components={RedditPost} />
        </Route>

        <Route path="entry"      component={Entry}>
          <Redirect from="/sign-up/" to="/sign-up"/>

          <Route path="/sign-in" component={SignIn}>
            <Route path="reset-password" />
          </Route>
          <Route path="/sign-up" component={SignUp}>
            <Route path="update-profile" component={SignUpUpdateProfile} />
          </Route>
        </Route>

        <Route path="dashboard" component={Dashboard} />
        <Route component={Miscellaneous}>
          <Route path="privacy-policy" component={PrivacyPolicy} />
        </Route>

        <Route path="rank" component={Rank} />
        <Route path="issues" component={Issues}/>
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
};

export default App;