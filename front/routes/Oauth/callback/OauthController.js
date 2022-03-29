const axios = require('axios')
const {google} = require('googleapis');


exports.kakao = async (req, res) => {
  axios.defaults.baseURL = 'http://localhost:5001/auth';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.withCredentials = true;

  const { code } = req.query;
  const data = {
    code
  };
  try {
    const response = await axios.post('/kakao', data,);
  } catch (e) {
    console.log(e)
  }
  res.send('kakao login');
}



//구글 로그인....??
// exports.google = async(req,res) => {

// }
//     /**
//      * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI
//      * from the client_secret.json file. To get these credentials for your application, visit
//      * https://console.cloud.google.com/apis/credentials.
//      */
//      const oauth2Client = new google.auth.OAuth2(
//       '423617622371-nbmrlfgmdek5btcjijgglc4bgslvklrh.apps.googleusercontent.com',
//       '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',
//       'http://localhost:5001/auth/google'
//   );


//   // Access scopes for read-only Drive activity.
//   const scopes = [
//     'https://www.googleapis.com/auth/drive.metadata.readonly'
//   ];
  
//   // Generate a url that asks permissions for the Drive activity scope
//   const authorizationUrl = oauth2Client.generateAuthUrl({
//     // 'online' (default) or 'offline' (gets refresh_token)
//     access_type: 'offline',
//     /** Pass in the scopes array defined above.
//       * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
//     scope: scopes,
//     // Enable incremental authorization. Recommended as a best practice.
//     include_granted_scopes: true
//   });
