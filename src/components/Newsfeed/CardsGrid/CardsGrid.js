import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import NewCard from '../NewCard/NewCard';
import UploadCard from '../../UploadCard/UploadCard';

const mapStateToProps = state => ({
  user: state.user,
  post: state.post
});

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 365,
      width: 300,
    },
    control: {
      padding: theme.spacing.unit * 2,
    },
  });
  

class CardsGrid extends Component {
  
  componentDidMount() {
    this.props.dispatch({type: "FETCH_POSTS"});
  }

    state = {
        spacing: '16',
      };

    render() {
        const { classes } = this.props;
        const { spacing } = this.state;
        const posts = this.props && this.props.post && this.props.post.posts || [];

        if (this.props.user.userName) {
          return (
            <div>
              <div style={{textAlign:'center'}}>
                <UploadCard />
                {posts.map( post => {
                  return <NewCard
                  key = {post.id}
                  post= {post}
                  />
                  })
                }
              </div>
            </div>
          );
        } else {
          return (
            <div >
              <div style={{textAlign:'center'}}>
                {posts.map( post => {
                  return <NewCard
                  key = {post.id}
                  post= {post}
                  />
                  })
                }
              </div>
            </div>
          );
        }
    }
}

CardsGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles),connect(mapStateToProps))(CardsGrid);