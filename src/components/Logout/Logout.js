import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { clearError } from '../../redux/actions/loginActions';
import { triggerLogout } from '../../redux/actions/loginActions';

// Material UI
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

const styles = {
  button: {
    backgroundColor: '#A83F2E',
    fontFamily: 'Clarendon-Text-Pro',
    margin: 5,
  }
};

class Logout extends Component {

  componentDidMount() {
    this.props.dispatch(clearError());
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button className={classes.button} onClick={this.logout}>Logout</Button>
      </div>
    );
  }
}

export default compose(withStyles(styles),connect(mapStateToProps))(Logout);
