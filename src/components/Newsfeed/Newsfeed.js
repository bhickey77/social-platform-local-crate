import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearError } from '../../redux/actions/loginActions';
import CardsGrid from './CardsGrid/CardsGrid';
import { POST_ACTIONS } from '../../redux/actions/postActions';

import Nav from '../Nav/Nav';
import UpdatePartnerPicture from '../UpdatePartnerPicture/UpdatePartnerPicture';

const mapStateToProps = state => ({
  user: state.user,
  post: state.post
});

class Newsfeed extends Component {

  componentDidMount() {
    this.props.dispatch(clearError());
    this.props.dispatch({ type: POST_ACTIONS.FETCH_POSTS })
  }

  render() {
    return (
      <div>
        <Nav />
        <CardsGrid />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Newsfeed);
