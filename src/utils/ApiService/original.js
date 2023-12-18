import axios from 'axios';

import { auth0AuthenticationObject, auth0ManagementObject, auth0Object, tempManagementToken } from '../config';


//                                   Auth0 APIs

export const lineLogin = () => {
  auth0Object.authorize({
    connection: 'line',
  });
}
export const auth0Login = (loginInfo, callback) => {
  auth0Object.client.login(
    {
      realm: "Username-Password-Authentication",
      username: loginInfo.userName,
      password: loginInfo.password
    },
    callback
  );
}

export const auth0Logout = (returnTo) => {
  auth0Object.logout({ returnTo: "https://gtp-poc.vercel.app/" })
}


export const lookupUserInAuth0 = async (email) => {

  try {
    const url = 'https://fortress-backend-315ca6662153.herokuapp.com/api/lookupUserInAuth0';
    // const url = 'http://localhost:7000/api/lookupUserInAuth0';

    const payload = {
      ManagementToken: tempManagementToken,
      email
    };

    const response = await axios.post(url, payload);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

}


export const resetPasswordInAuth0 = async (email) => {

  try {
    const url = 'https://fortress-backend-315ca6662153.herokuapp.com/api/resetPasswordInAuth0';
    // const url = 'http://localhost:7000/api/resetPasswordInAuth0';
    const payload = {
      ManagementToken: tempManagementToken,
      email
    };

    const response = await axios.post(url, payload);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

}


export const getUserInfoFromAuth0 = (accessToken, callback) => {
  auth0Object.client.userInfo(
    accessToken,
    callback
  );

}
export const getUserInfoInfoFromAuth0ManagementAPI = (userId, callback) => {
  auth0ManagementObject.getUser(userId, callback);
}


export const updateAuth0Profile = (user_id, userObject, callback) => {
  auth0ManagementObject.patchUserAttributes(user_id,
    userObject,
    callback
  )
}

export const signupAndAuthorize = (signupInfo, cardInformation, callback) => {
  auth0Object.signupAndAuthorize(
    {
      connection: 'Username-Password-Authentication',
      email: signupInfo.email,
      password: signupInfo.password,
      username: cardInformation ? cardInformation.cardData.cardNumber : signupInfo.mobile,
      scope: 'openid',
    },
    callback
  );
}

export const linkUserProfileInAuth0 = async (data) => {
  try {
    const url = 'https://fortress-backend-315ca6662153.herokuapp.com/api/linkUser';
    // const url = 'http://localhost:7000/api/linkUser';

    const payload = {
      ManagementToken: tempManagementToken,
      provider: "auth0",
      user_id: "auth0|6555170fc5d047759db3aa6d",
      primary_user: "auth0%7C655508d3c5d047759db3a83f"
    };

    const response = await axios.post(url, payload);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const changePasswordAuth0 = () => {

  auth0AuthenticationObject.dbConnection.changePassword({
    connection: 'Username-Password-Authentication',
    email: 'venkatesh.prasad@capillarytech.com',
    password: 'Capillary@123'
  }, (err, data) => {
    if (err) {
      console.log("Email error", err);
    } else {
      console.log("Email success", data);
    }
  })
}


//                                       Capillary APIs


export const addCustomerInCapillary = async (data) => {
  try {
    const url = 'https://fortress-backend-315ca6662153.herokuapp.com/api/addCustomer';
    // const url = 'http://localhost:7000/api/addCustomer';

    const payload = {
      Authorization: data.accessToken,
      'X-CAP-EXTERNAL-OAUTH-ID-TOKEN': data.idToken,
    };

    const response = await axios.post(url, payload);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const getCustomer = async (data) => {
  try {
    const url = 'https://fortress-backend-315ca6662153.herokuapp.com/api/getCustomer';
    // const url = 'http://localhost:7000/api/getCustomer';

    const payload = {
      Authorization: data.accessToken,
      'X-CAP-EXTERNAL-OAUTH-ID-TOKEN': data.idToken,
    };

    const response = await axios.post(url, payload);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};



export const updateCustomer = async (data, userDetails) => {
  try {
    const url = 'https://fortress-backend-315ca6662153.herokuapp.com/api/updateCustomer';
    // const url = 'http://localhost:7000/api/updateCustomer';

    const payload = {
      Authorization: data.accessToken,
      'X-CAP-EXTERNAL-OAUTH-ID-TOKEN': data.idToken,
      user: userDetails
    };

    const response = await axios.post(url, payload);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
export const updateCustomerWithCardnumber = async (userDetails) => {
  try {
    const url = 'https://fortress-backend-315ca6662153.herokuapp.com/api/updateCustomerWithCardNumber';
    // const url = 'http://localhost:7000/api/updateCustomerWithCardNumber';

    const payload = {
      user: userDetails
    };

    const response = await axios.post(url, payload);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


export const capillaryLookup = async (identifierName, identifierValue) => {
  try {
    const url = 'https://fortress-backend-315ca6662153.herokuapp.com/api/lookupInCapillary';
    // const url = 'http://localhost:7000/api/lookupInCapillary';

    const payload = {
      identifierValue,
      identifierName
    };
    const response = await axios.post(url, payload);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


export const addCustomerWithBasicAuth = async (userDetails) => {
  try {
    const url = 'https://fortress-backend-315ca6662153.herokuapp.com/api/addCustomerBasicAuth';
    // const url = 'http://localhost:7000/api/addCustomerBasicAuth';

    const payload = {
      user: userDetails
    };

    const response = await axios.post(url, payload);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
