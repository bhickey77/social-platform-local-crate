import React, { Component } from 'react';
import PostFilterSelect from '../AdminPostFilter/PostFilterSelect';
import PostFilterConditional from '../AdminPostFilter/PostFilterConditional';
import HideIcon from '../HideIcon/HideIcon';
import { PARTNER_ACTIONS } from '../../redux/actions/partnerActions';
import { POST_ACTIONS } from '../../redux/actions/postActions'
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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// Components
import Nav from '../Nav/Nav';

const mapStateToProps = state => ({
  user: state.user,
  post: state.post,
  partner: state.partner,
});

const styles = {
  tableHeaderCells: {
    fontWeight: 'bolder', 
  },
}

class AdminPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: null,
      id: 0,
      open: false,
      filter: '',
      filteredBy: ''
    };
  }


  componentDidMount() {
      this.props.dispatch(clearError());
      this.props.dispatch({ type: 'FETCH_ALL_POSTS' });
      this.props.dispatch({ type: PARTNER_ACTIONS.FETCH_PARTNERS });
      this.setState({ filteredBy: 'none' });
      console.log('filtered by', this.state.filteredBy);
  }

  dateConvert = ( date ) => {
    return moment().utc( date ).format("MMM Do YYYY");
  }

  dateConvertDatabase = ( date ) => {
    return moment().utc( date ).format("YYYY-DD-MM");
  }

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
    console.log('filter', this.state.filter)
  }

  handleChange = event => {
    this.setState({ filteredBy: event.target.value });
    console.log('filtered by', this.state.filteredBy);
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log('state', this.state.filter, this.state.filteredBy)
      this.props.dispatch({ type: POST_ACTIONS.FETCH_POSTS_FILTERED,
        payload: {filter: this.state.filter, filteredBy: this.state.filteredBy }});
  }

  clearFilter = event => {
    event.preventDefault();
    this.props.dispatch({ type: 'FETCH_ALL_POSTS' });
    this.setState({filter: '', filteredBy: ''});
  }

  contentCount = null;

  contentTrimmer = ( content ) => {
      if (content.length > 20) {
         this.contentCount = content.slice(0,20);
         this.contentCount += '...';
         return this.contentCount;
      } else {
          return content;
      }
  }

  render() {
    const posts = this.props && this.props.post && this.props.post.allPosts || [];
    const partner = this.props && this.props.partner && this.props.partner.partners || [];
    // const { classes } = this.props;
    console.log(posts);
    console.log(partner);
    
    return (
      <div>
        <Nav />
        <div className="adminTable">
          <Card className="postCard">
            <CardContent>
              <PostFilterSelect
                filter={this.state.filter}
                handleChange={this.handleFilterChange}
              />
              <PostFilterConditional
                filter={this.state.filter}
                filteredBy={this.state.filteredBy}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                clearFilter={this.clearFilter}
                partner={partner}
              />
            </CardContent>
          </Card>
          <br/>
          <br/>
        <Table className="postTable">
          <TableHead>
          <TableRow style={{ 
              backgroundColor: '#00bce4', 
              borderRadius: '5px',
              }}>
            <TableCell style={styles.tableHeaderCells} >Partner Name</TableCell>
            <TableCell style={styles.tableHeaderCells}>Preview (Click)</TableCell>
            <TableCell style={styles.tableHeaderCells}>Title</TableCell>
            <TableCell style={styles.tableHeaderCells}>Content</TableCell>
            <TableCell style={styles.tableHeaderCells}>Date Created</TableCell>
            <TableCell style={styles.tableHeaderCells}>Date Updated</TableCell>
            <TableCell style={styles.tableHeaderCells}>Hide/Unhide</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
        {posts.map( post => {
          return (
            <TableRow key={post.post_id}>
                <TableCell>{post.partner_name}</TableCell>
                <TableCell>
                  <PostDialog post={post} dateConvert={this.dateConvert}/>
                </TableCell>
                <TableCell>{this.contentTrimmer(post.title)}</TableCell>
                <TableCell>{this.contentTrimmer(post.content)}</TableCell>
                <TableCell>{String(this.dateConvert(post.date_created))}</TableCell>
                <TableCell>{String(this.dateConvert(post.date_updated))}</TableCell>
                <TableCell>
                  <HideIcon post={post} user={this.props.user}/>
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