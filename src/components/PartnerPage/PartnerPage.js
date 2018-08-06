import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CardsGrid from '../Newsfeed/CardsGrid/CardsGrid';

// import { USER_ACTIONS } from '../../redux/actions/userActions';
import Nav from '../Nav/Nav';
// import CardsGrid from '../Newsfeed/CardsGrid/CardsGrid';
import NewCard from '../Newsfeed/NewCard/NewCard';
import UploadCard from '../UploadCard/UploadCard';


// Material UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  wrapper: {
    maxWidth: 400,
  },
  paper: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
  },
});

const mapStateToProps = state => ({
  user: state.user,
  post: state.post
});

class PartnerPage extends Component {
  
  constructor(props){
    super(props);
      this.state = {
        partner: {
          id: 0,
          name: '',
          location: '', 
          website: '', 
          bio: ''
        } 
      }
  }

  // componentDidUpdate() {
  //   if (!this.props.user.isLoading && this.props.user.userName === null) {
  //     this.props.history.push('home');
  //   }
  // }

  render() {
    const { classes } = this.props;
    // const { spacing } = this.state;
    const posts = this.props && this.props.post && this.props.post.posts || [];       
    return (
      <div>
        <Nav />
        <Grid container spacing={24}
          style={{ 
            marginLeft: 30,
          }}>
          <Grid item xs={10}>
            <Paper className={classes.root} elevation={1}>
              <Typography variant="headline" component="h3">
                Richardson Farms
              </Typography>
              <Typography component="p">
                Red Wing, MN
              </Typography>
            </Paper>          
          </Grid>
        </Grid>

        <Grid container spacing={24}
          style={{ 
            marginLeft: 30,
          }}>
          <Grid item xs={3}>
            <Paper 
              className={classes.root} 
              elevation={1}
              style={{ 
                paddingTop: 10, 
                paddingBottom: 10, 
                height: 600,
              }}
              >
              <Typography variant="headline" component="h3">
                Richardson Farms
              </Typography>
              <Typography component="p">
                Red Wing, MN
              </Typography>
            </Paper>          
          </Grid>
          <CardsGrid />
        </Grid>
      </div>
    );

  }

PartnerPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

// this allows us to use <App /> in index.js
export default compose(withStyles(styles),connect(mapStateToProps))(PartnerPage);

