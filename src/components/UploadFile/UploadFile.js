import React, { Component } from 'react';
import axios from 'axios';

class UploadFile extends Component {
  constructor(props){
    super(props);

    this.state = {
      profilePictureUrl: '', 
    }
  }

  handleUploadFile = (event) => {
    const data = new FormData();
    data.append('file', event.target.files[0]);
    data.append('name', 'some value user types');
    data.append('description', 'some value user types');
    // '/files' is your node.js route that triggers our middleware
    axios.post('/api/image/profilepicture', data, { headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': event.target.files[0].type,
      }})
      .then(response => {
        console.log('successfully uploaded to the S3: ', response); // do something with the response
        this.setState({
          profilePictureUrl: response.data,
        })
      })
      .catch(error => {
        console.log('error uploading file: ', error);
      })
  }
    
  render() {
    return (
      <div>
        <img className="profilePicture" src={this.state.profilePictureUrl} alt="profilePictureUrl" />
        <input type="file" name="image" onChange={this.handleUploadFile} />
        {JSON.stringify(this.state.profilePictureUrl)}
      </div>
    )
  }
}

export default UploadFile;