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
    backgroundColor: 'white',
  },
};

class ButtonAppBar extends Component {
  render() {
    const { classes } = props;
    let isSignedIn = false;
    this.props && this.props.user.username && (isSignedIn = true);
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton> */}
            <Typography variant="title" color="inherit" className={classes.flex}>
              <img id="logo"
                src="/images/Secondary_Logo_HorizontalTilted.jpg"
                alt="Local-Crate-Logo" />
            </Typography>
            {
              isSignedIn ?
                <Button color="primary">Logout</Button>
              :
                <Button color="primary">Login</Button>
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

// ButtonAppBar.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(ButtonAppBar);