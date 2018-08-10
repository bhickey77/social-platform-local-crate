import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { clearError } from '../../redux/actions/loginActions';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { triggerLogout } from '../../redux/actions/loginActions';


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
    // this.props.history.push('home');
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
