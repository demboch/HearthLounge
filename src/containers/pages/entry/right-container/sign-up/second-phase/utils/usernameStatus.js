import React from 'react';

/**
 * Returns username status
 *
 * @param {string} signUp_username
 * @param {bool} usernameFree
 */
export default (signUp_username, usernameFree) =>{
  if((!usernameFree && (signUp_username.length < 3 || signUp_username.length > 10)) || (usernameFree && (signUp_username.length < 3 || signUp_username.length > 10))){
    return null;
  }
  if(usernameFree && signUp_username.length >= 3){
    return <span>x</span>;
  }
  if(!usernameFree && signUp_username.length >= 3) {
    return <span>✓</span>;
  }
};
