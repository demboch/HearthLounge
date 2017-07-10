import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Navbar from './layout/navbar';
import Footer from './layout/footer';
import {getCurrentUserInfo, logout} from '../server/user';
import 'antd/lib/tooltip/style/css';
import 'antd/lib/dropdown/style/css';
import {fetchData} from '../data/cards-data';
import {connect} from 'react-redux';

class Main extends Component{
  constructor(props) {
    super(props);
    getCurrentUserInfo(props.updateActiveUser);
  };

  componentDidMount() {
    fetchData(this.props.updateCards);
  }

  render(){
    const {authenticated, activeUser, children, location, cards} = this.props;
    return (
        <div id="container">
          <Navbar url={location.pathname} user={this.props.activeUser} handleLogout={(e)=>logout(e)}/>
          {React.cloneElement(children, {
            authenticated,
            activeUser,
            cards
          })}
          <Footer/>
        </div>
    );
  }
}

Main.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state =>{
  const {cards} = state.cards;
  const {authenticated, activeUser} = state.users;
  return {cards, authenticated, activeUser};
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCards: (cards) => dispatch({
      type: 'UPDATE_CARDS', cards
    }),
    updateActiveUser: (authenticated, activeUser, photoURL) => dispatch({
      type: 'UPDATE_ACTIVE_USER', authenticated, activeUser, photoURL
    })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);