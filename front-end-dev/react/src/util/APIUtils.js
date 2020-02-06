/** @format */

import { API_BASE_URL } from '../constants';

const request = options => {
  const headers = new Headers({
    'Content-Type': 'application/json'
  });

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      if (json.result_code !== 'OK') {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function login(loginRequest) {
  return request({
    url: API_BASE_URL + '/login',
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}
export function register(registerRequest) {
  return request({
    url: API_BASE_URL + '/register',
    method: 'POST',
    body: JSON.stringify(registerRequest)
  });
}

export function checkUsernameAvailability(username) {
  return request({
    url: API_BASE_URL + '/user/checkUsernameAvailablity?username=' + username,
    method: 'GET'
  });
}

export function checkEmailAvailability(email) {
  return request({
    url: API_BASE_URL + '/user/checkEmailAvailability?email=' + email,
    method: 'GET'
  });
}

export function uploadPaper(uploadRequest) {
  return request({
    url: API_BASE_URL + '/upload',
    method: 'POST',
    data: JSON.stringify(uploadRequest)
  });
}
