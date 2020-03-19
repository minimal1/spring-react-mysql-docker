/** @format */

import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = options => {
  const headers = new Headers({
    'Content-Type': 'application/json'
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      'Authorization',
      'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
    );
  }

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
const request_file = options => {
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

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  return request({
    url: API_BASE_URL + '/user/me',
    method: 'GET'
  });
}

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

export function uploadPaper(uploadRequest) {
  return request_file({
    url: API_BASE_URL + '/upload',
    method: 'POST',
    body: uploadRequest
  });
}
