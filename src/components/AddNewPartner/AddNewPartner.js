import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import { USER_ACTIONS } from '../../redux/actions/userActions';
// Components
// import Nav from '../../components/Nav/Nav';
// Material UI
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const mapStateToProps = state => ({
  user: state.user,
});

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}


const styles = {
  button: {
    backgroundColor: '#00bce4',
    fontFamily: 'Clarendon-Text-Pro',
    margin: 5,
  }
};

class AddNewPartner extends Component {
  constructor(props){
    super(props);
    this.state = {   
      name: '',
      email: '',
      open: false,
      Transition: null,
      snackOpen: false,
          
    }
  }
  
  handleClick = () => {
    this.setState({ 
      ...this.state,
      open: true,
    });
  };

  handleSubmit = Transition => () => {
    this.setState({
      ...this.state,
      open: false,
      snackOpen: true,
      Transition,
    })
  }

  handleClose = () => {
    this.setState({ 
      ...this.state,
      open: false,
    });
  };

  resetForm() {
    this.setState({
      ...this.state,
      name: '',
      email: '',
    })
  }
  sendWelcomeEmail = () => {
    this.props.dispatch({type:'SEND_NEW_PARTNER_EMAIL', payload:this.state});
    this.resetForm();
    this.handleSubmit(TransitionUp)();
  }

  handleInputChange = (event) => {
    switch(event.target.id){
      case 'name':
        this.setState({
          ...this.state,
          name: event.target.value,
        });
        break;
      case 'email':
        this.setState({
          ...this.state,
          email: event.target.value,
        });
        break; 
      default:
        console.log('Invalid field');
        break;      
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button className={classes.button} onClick={this.handleClick}>
          Add New Partner
        </Button>

        <Dialog 
          onClose={this.handleClose} 
          aria-labelledby="simple-dialog-title"
          open={this.state.open}
          keepMounted

        >
          <DialogContent>
          <div className="add-partner-dialog">
              <p>
                Send a welcome email to a partner
              </p>
              <Input 
                  placeholder="Name" 
                  id="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  />
              <br/>
              <Input 
                  placeholder="Email Address" 
                  id="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  />
              <br/>
              <Button vairant="raised" color="primary" onClick={this.sendWelcomeEmail} >Send Welcome Email</Button>
              <Snackbar
                open={this.state.snackOpen}
                onClose={this.handleClose}
                TransitionComponent={this.state.Transition}
                ContentProps={{
                  'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Welcome Email Sent!</span>}
                autoHideDuration={3000}
                />
            </div>
          </DialogContent> 
        </Dialog>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default compose(withStyles(styles),connect(mapStateToProps))(AddNewPartner);
