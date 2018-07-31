import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import LogoutPage from '../LogoutPage/LogoutPage';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { Button } from '@material-ui/core';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});


class Header extends Component {
  
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    let content = null;

    content = (
      <div>
        <ul>
          {(this.props.user.userName) ?
          <li>
            <LogoutPage/>
          </li> 
          :  
          <li>
            <LoginPage/>
          </li>
          }
          <li>
            <Button className="redButton"><a href="http://www.localcrate.com" target="_blank">Sign-up</a></Button>          </li>
        </ul>
      </div>
    )

    return (
      <div id="header">
          <div>
            <img id="logo"
            src="/images/Secondary_Logo_HorizontalTilted.jpg"
            alt="Local-Crate-Logo" />
            <h2 id="title">Social Crate</h2>
            { content }
          </div>
        </div>
    );
  }
}

export default connect(mapStateToProps)(Header);
