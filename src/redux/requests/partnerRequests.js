import axios from 'axios';

export const updateProfileImage = (imageData, partner_id) => {
  const data = new FormData();
  data.append('file', imageData);
  axios.put(`api/partner/profilePicture/${partner_id}`, data, { headers: {
      'accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': imageData.type,
    }})
    .then(response => {
      console.log('successfully uploaded to the S3: ', response); // do something with the response
    })
    .catch(error => {
      console.log('error uploading file: ', error);
    })
}
