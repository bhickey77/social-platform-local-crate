import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Login from '../Login/Login';
import Logout from '../Logout/Logout';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import AddNewPartner from '../AddNewPartner/AddNewPartner';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
  post: state.post.unHiddenPosts
});

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    height: 100,
    backgroundColor: 'white',
  },
  social: {
    flexGrow: 1,
    margin: '0 auto',
  },
  button: {
    backgroundColor: '#00bce4',
    fontFamily: 'Clarendon-Text-Pro',
    margin: 5,
  },
  profile: {
    marginRight: 10
  }
};

class Nav extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  sendToNewsfeed = () => {
    window.location.href = '#/newsfeed';
  }

  render() {
    const { classes } = this.props;
    const avatar_url = (this.props && this.props.user && this.props.user.userInfo && this.props.user.userInfo.is_default_image) ? "images/FreshnessAssuredBy.png" : this.props && this.props.user && this.props.user.userInfo && this.props.user.userInfo.partner_media_url;

    let isSignedIn = false;
    this.props && this.props.user && this.props.user.userName && (isSignedIn = true);
    let user_type = this.props && this.props.user && this.props.user.userInfo && this.props.user.userInfo.user_type || false;
    const currentRoute = window.location.hash.split('/')[1];
    console.log('user', this.props.user)
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography onClick={this.sendToNewsfeed} variant="title" color="inherit" className={classes.flex}>
              <img id="logo"
                src="/images/Secondary_Logo_HorizontalTilted.jpg"
                alt="Local-Crate-Logo" />
            </Typography>
            <Typography onClick={this.sendToNewsfeed} variant="title" className={classes.social}>
              <span className="social-crate">
                Social Crate
              </span>
            </Typography>
            {
              (user_type === 'admin') && 
                // [<Link style={{ textDecoration: 'none' }} to="/admin/accounts" key='accounts'>
                //   <Button className={classes.button}>
                //     Partner accounts
                //   </Button>
                // </Link>,
                [<Link style={{ textDecoration: 'none' }} to="/admin/posts" key='posts'>
                  <Button className={classes.button}>
                    Posts
                  </Button>
                </Link>,
                <AddNewPartner key='new'/>]
            }
              {/* <Link to="/Register">
                <Button color="primary">
                  Register (new user)
                </Button>
              </Link> */}
            {(currentRoute !== 'newsfeed') &&
              <Link style={{ textDecoration: 'none' }} to="/newsfeed">
                <Button className={classes.button}>
                  Newsfeed
                </Button>
              </Link>
            }
            {(currentRoute !== 'partner' && isSignedIn) &&
            [ <span>
            <Link style={{ textDecoration: 'none', marginRight: 5 }} to={`/partner/${this.props.user.userInfo.partner_id}`}>
                <Avatar
                aria-label="Recipe" 
                src={avatar_url}
                className={classes.profile}
                />
            </Link>
            </span>,
            <span>
            <Link style={{ textDecoration: 'none', marginRight: 5 }} to={`/partner/${this.props.user.userInfo.partner_id}`}>
                <Typography className={classes.profile}>
                Your Profile
                </Typography>
            </Link>
            </span> ]
            }
            {
              isSignedIn ?
                <Logout />
              :
                <Login />
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(Nav);