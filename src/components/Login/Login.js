import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

const Transition = (props) => {
  return <Slide direction="up" {...props} />;
}

const styles = {
  button: {
    backgroundColor: '#A83F2E',
    fontFamily: 'Clarendon-Text-Pro',
    margin: 5,
  }
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.dispatch(clearError());
  }

  login = (event) => {
    event.preventDefault();
    console.log('login');

    if (this.state.username === '' || this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));
    }
    this.handleClose();
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.props.login.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          { this.props.login.message }
        </h2>
      );
    }
    return (<span />);
  }
  
  
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button className={classes.button} onClick={this.handleOpen}>Login</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">Login</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              value={this.state.username}
              label="Username"
              onChange={this.handleInputChangeFor('username')}
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              value={this.state.password}
              label="Password"
              onChange={this.handleInputChangeFor('password')}
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.login} color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default compose(withStyles(styles),connect(mapStateToProps))(Login);
