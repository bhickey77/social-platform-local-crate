import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearError } from '../../redux/actions/loginActions';
import CardsGrid from './CardsGrid/CardsGrid';

import Nav from '../Nav/Nav';

const mapStateToProps = state => ({
  user: state.user,
  post: state.post
});

class Newsfeed extends Component {

  componentDidMount() {
    this.props.dispatch(clearError());
  }

  // componentWillReceiveProps(nextProps) {
  //     if (nextProps.user.userName) {
  //         this.props.history.push('/user');
  //     }
  // }

  render() {
    let content = null;

    content = (
    <div>
        <p>PublicHome Component</p>
        <CardsGrid />
    </div>
    );
    

    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Newsfeed);
