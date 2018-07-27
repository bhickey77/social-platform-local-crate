import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

class PartnerMailUrl extends Component {
 

  componentDidUpdate() {
    
  }

  render() {
    let content = null;

    
      content = (
        <div>
          <p>
            This is the landing page a partner sees after clicking email url!
          </p>
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
export default connect(mapStateToProps)(PartnerMailUrl);
