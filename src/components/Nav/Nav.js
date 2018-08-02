import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import AddNewPartner from '../AddNewPartner/AddNewPartner';
import Register from '../Register/Register';

import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
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
    backgroundColor: 'red',
  },
};

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  render() {
    const { classes } = this.props;
    let isSignedIn = false;
    this.props && this.props.user && this.props.user.userName && (isSignedIn = true);
    var currentRoute = window.location.hash.split('/')[1];
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              <img id="logo"
                src="/images/Secondary_Logo_HorizontalTilted.jpg"
                alt="Local-Crate-Logo" />
            </Typography>
            <Link to="/admin/accounts">
                <Button color="primary">
                  Accounts (admin)
                </Button>
              </Link>
              <Link to="/admin/posts">
                <Button color="primary">
                  Posts (admin)
                </Button>
              </Link>
              <Link to="/addNewPArtner">
                <Button color="primary">
                  Add New Partner (admin)
                </Button>
              </Link>
              <Link to="/Register">
                <Button color="primary">
                  Register (new user)
                </Button>
              </Link>
            {(currentRoute !== 'newsfeed') &&
              <Link to="/newsfeed">
                <Button color="primary">
                  Newsfeed
                </Button>
              </Link>
            }
            {(currentRoute !== 'partners') &&
              <Link to="/partners">
                <Button color="primary">
                  Our Partners
                </Button>
              </Link>
            }
            {(this.props.user.username) && 
              <Link to="/upload">
                <Button color="primary">
                  Upload
                </Button>
              </Link>
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