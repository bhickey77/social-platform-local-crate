import axios from 'axios';

export function sendEditPost(postData, image) {
  console.log('IN POST REQUEST: ', postData);
  console.log('IN POST REQUEST: ', image);
  const data = new FormData();
  data.append('title', postData.title);
  data.append('content', postData.content);
  data.append('isNewImage', image ? true : false)
  
  const config = {
    headers: {
      'accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
    },
    withCredentials: true,
  };
  if(image){
    data.append('file', image);
    config.headers['Content-Type'] = postData.newImage.type;
  }
  data.append('partner_id', postData.partner_id); 

  axios.put(`api/post/${postData.post_id}`, data, config)
    .then(response => {
      console.log('successfully uploaded to the S3: ', response); // do something with the response
    })
    .catch(error => {
      console.log('error uploading file: ', error);
    })
}