import axios from 'axios';

// export function sendEditPost(postData) {
//   const config = {
//     headers: { 'Content-Type': 'application/json' },
//     withCredentials: true,
//   };

//   return axios.get('/api/user/logout', config)
//     .then(response => response.data)
//     .catch((error) => {
//       throw error.response || error;
//     });
// }

export function sendEditPost(postData, image) {
  console.log('IN POST REQUEST: ', postData);
  const data = new FormData();
  data.append('title', postData.title);
  data.append('content', postData.content);
  data.append('file', postData.newImage);
  data.append('partner_id', postData.partner_id)
  
  const config = {
    headers: {
      'accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': postData.newImage.type,
    },
    withCredentials: true,
  };

  axios.put(`api/post/${postData.post_id}`, data, config)
    .then(response => {
      console.log('successfully uploaded to the S3: ', response); // do something with the response
    })
    .catch(error => {
      console.log('error uploading file: ', error);
    })
}


// yield call( axios.put, `/api/post/${action.payload.post_id}`, action.payload );
