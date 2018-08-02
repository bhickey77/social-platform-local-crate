import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearError } from '../../redux/actions/loginActions';
import CardsGrid from './CardsGrid/CardsGrid';

// Components
import Nav from '../Nav/Nav';
import AdminNav from '../Admin/AdminNav/AdminNav';
// Material UI

const mapStateToProps = state => ({
  user: state.user,
  post: state.post
});

class PublicHome extends Component {

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
    let nav = null;

    content = (
    <div>
        <p>PublicHome Component</p>
        <p>go to /partnerMailUrl to create a user profile</p>
        <CardsGrid />
    </div>
    );
    

    return (
      <div>
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(PublicHome);
