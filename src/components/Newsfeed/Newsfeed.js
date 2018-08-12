import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearError } from '../../redux/actions/loginActions';
import CardsGrid from './CardsGrid/CardsGrid';
import { POST_ACTIONS } from '../../redux/actions/postActions';

import Nav from '../Nav/Nav';
import UpdatePartnerPicture from '../UpdatePartnerPicture/UpdatePartnerPicture';

import Snackbar from '@material-ui/core/Snackbar';

const mapStateToProps = state => ({
  user: state.user,
  post: state.post,
  justRegistered: state.justRegistered,
});

class Newsfeed extends Component {
  constructor(props){
    super(props);
    this.state ={
      snackOpen: false,
    }
  }

  handleCloseSnack = () => {
    this.setState({ 
      ...this.state,
      snackOpen: false,
     });
  };

  handleSnackOpen = () => {
    this.setState({ 
      ...this.state,
      snackOpen: true,
     });
  };

  componentDidMount() {
    console.log(`PREVIOUS LOCATION: `, this.props.history);
    
    this.props.dispatch(clearError());
    this.props.dispatch({ type: POST_ACTIONS.FETCH_POSTS });
    console.log(this.props.justRegistered);
    
    if(this.props.justRegistered.justRegistered){
      this.handleSnackOpen();
    }
    this.props.dispatch({ type: 'DONE_REGISTRATION'});

  }


  render() {
    return (
      <div>
        <Nav />
        <CardsGrid />
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={this.state.snackOpen}
          onClose={this.handleCloseSnack}
          autoHideDuration={2500}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Welcome to Social Crate! You can now log in.</span>}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Newsfeed);
