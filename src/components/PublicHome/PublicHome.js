import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearError } from '../../redux/actions/loginActions';

// Components
import Nav from '../Nav/Nav';
// Material UI

const mapStateToProps = state => ({
  user: state.user,
});

class PublicHome extends Component {

  componentDidMount() {
      this.props.dispatch(clearError());
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.user.userName) {
          this.props.history.push('/user');
      }
  }

  render() {
    let content = null;
    

    content = (
    <div>
        <p>PublicHome Component</p>
        <p>This will be the public landing with all of the cards</p>
    </div>
    );
    

    return (
      <div>
          <Nav/>
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(PublicHome);
