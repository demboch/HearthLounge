import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router';
import {Link} from 'react-router-dom';
import {LeftContainer} from './left-container/left-container';
import SignUp from "./right-container/sign-up/sign-up";
import SignIn from './right-container/sign-in/sign-in';

class Entry extends PureComponent {

  componentWillUnmount(){
    const {updateFormProperty} = this.props;
    updateFormProperty({
      signIn_password: "",
      signUp_firstStep: "",
      signUp_secondStep: "",
      signUp_confirmEmail: "",
      signUp_password: "",
      signUp_confirmPassword: ""
    });
  }

  render(){
    return (
        <div className={`container__page container__page--oneSided entry`}>
          <div className="wrapper">
            <LeftContainer/>

            <div className="breakline v-breakline"></div>

            <div className="container__page--inner container__page--right">
              <div className="topbar">
                <Link to="/sign-in" activeClassName="active">
                  <p>Sign In</p>
                </Link>
                <Link to="/sign-up" activeClassName="active">
                  <p>Sign Up</p>
                </Link>
              </div>
              <Switch>
                <Route path="/sign-in" component={SignIn} />
                <Route path="/sign-up" component={SignUp} />
              </Switch>
            </div>
          </div>
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateFormProperty: (props) => (dispatch({
      type: 'EDIT_FORM_PROPERTY', props
    })),
  }
};

export default connect(null, mapDispatchToProps)(Entry);