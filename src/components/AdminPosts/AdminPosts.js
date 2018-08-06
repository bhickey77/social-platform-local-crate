import React, { Component } from 'react';
import HideIcon from '../HideIcon/HideIcon';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { clearError } from '../../redux/actions/loginActions';
import moment from 'moment';
import PostDialog from '../PostDialog/PostDialog';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

// Components
import Nav from '../Nav/Nav';

const mapStateToProps = state => ({
  user: state.user,
  post: state.post,
});

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
})

class AdminPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: null,
      id: 0
    };
  }


  componentDidMount() {
      this.props.dispatch(clearError());
      this.props.dispatch({ type: 'FETCH_ALL_POSTS' });
  }

  dateConvert = ( date ) => {
    return moment().utc( date ).format("MMM Do YYYY");
  }

  render() {
    const posts = this.props && this.props.post && this.props.post.allPosts || [];
    // const { classes } = this.props;
    console.log(posts);
    
    return (
      <div>
        <Nav />
        <div className='adminTable'>
        <Table>
          <TableHead>
          <TableRow>
            <TableCell>Partner Name</TableCell>
            <TableCell>Preview (Click)</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Date Created</TableCell>
            <TableCell>Date Updated</TableCell>
            <TableCell>Hide/Unhide</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
        {posts.map( post => {
          return (
            <TableRow key={post.post_id}>
                <TableCell>{post.name}</TableCell>
                <TableCell>
                  <PostDialog post={post} dateConvert={this.dateConvert}/>
                </TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.content}</TableCell>
                <TableCell>{String(this.dateConvert(post.date_created))}</TableCell>
                <TableCell>{String(this.dateConvert(post.date_created))}</TableCell>
                <TableCell>
                  <HideIcon post={post}/>
                </TableCell>
              </TableRow> 
            );
            })}
            </TableBody>
        </Table>
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default compose(withStyles(styles),connect(mapStateToProps))(AdminPosts);