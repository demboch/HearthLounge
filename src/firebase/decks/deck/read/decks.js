import {refParent} from '../../../../keys';
import {getSimplifiedUser} from "../../../user/read/index";

export default function (playerClass, callback) {
  let decksRef = refParent('decks');

  let decks = {};

  if(playerClass){

    let pageQuery = decksRef.orderByChild('votes').limitToLast(10);
    // console.log(pageQuery)


    pageQuery.once('value', snapshot => {
      callback(null);
      // console.log(_.map(snapshot.val()).filter(deck => deck.playerClass === playerClass));
      getSimplifiedUser(snapshot.val().authorId, username =>  Object.assign(decks, {[snapshot.val().deckId]: Object.assign(snapshot.val(), username)}));
      callback(decks);
    })
  } else {
    let pageQuery = decksRef.orderByChild('votes').limitToLast(10);
    pageQuery.on('child_added', snapshot => {
      getSimplifiedUser(snapshot.val().authorId, username => Object.assign(decks, {[snapshot.val().deckId]: Object.assign(snapshot.val(), username)}));

      callback(decks);
    })
  }
}