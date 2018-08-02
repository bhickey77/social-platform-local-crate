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
<<<<<<< HEAD:src/components/PublicHome/PublicHome.js
    let nav = null;
=======
>>>>>>> baselayout:src/components/Newsfeed/Newsfeed.js

    content = (
    <div>
        <p>PublicHome Component</p>
        <p>go to /partnerMailUrl to create a user profile</p>
        <CardsGrid />
    </div>
    );
    

    return (
      <div>
<<<<<<< HEAD:src/components/PublicHome/PublicHome.js
=======
        <Nav />
>>>>>>> baselayout:src/components/Newsfeed/Newsfeed.js
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Newsfeed);
