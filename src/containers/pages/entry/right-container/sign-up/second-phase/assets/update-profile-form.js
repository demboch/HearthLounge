import React, {Component} from 'react';
import {connect} from 'react-redux';
import Input from '../../../../../../../components/inputs/input';
import {usernameStatus} from "../utils";
import Button from "../../../../../../../components/buttons/button";
import {updateUsername} from "../../../../../../../firebase/user/update";

class UpdateProfileForm extends Component {

  handleUpdateProfileFormSubmit = (e) => {
    e.preventDefault();
    const {activeUser, signUp_username, updateSignUpStatus} = this.props;
    updateUsername(activeUser, signUp_username, updateSignUpStatus)
  };

  render() {
    const {signUp_username, handleInputChange, usernameFree} = this.props;

    return (
      <form onSubmit={this.handleUpdateProfileFormSubmit}>

        <div className="divider"><span>Required</span></div>

        <div className="username-wrapper">
          <Input id="signUp_username"
                 type="text"
                 placeholder="Joe"
                 handleInputChange={handleInputChange}
                 value={signUp_username}/>
          {usernameStatus(signUp_username, usernameFree)}
        </div>

        <div className="divider"><span>Optional</span></div>

        <div className="button-wrapper">
          <Button text="Complete registration" type="submit--light"/>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state =>{
  const {signUp_username, usernameFree} = state.entry;
  const {activeUser} = state.users;
  return {signUp_username, usernameFree, activeUser};
};

const mapDispatchToProps = dispatch =>{
  return {
    updateSignUpStatus: (signUp_firstStep, signUp_secondStep) => (dispatch({
      type: 'UPDATE_SIGN_UP_STATUS', signUp_firstStep, signUp_secondStep
    })),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileForm);