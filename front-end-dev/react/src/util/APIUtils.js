/** @format */

import { API_BASE_URL, ACCESS_TOKEN } from "../constants";

const request = (options, contentType) => {
  const headers = new Headers();

  if (contentType === "JSON") {
    headers.append("content-type", "application/json");
  } else if (contentType === "formData") {
    // pass
  }

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append("Authorization", localStorage.getItem(ACCESS_TOKEN));
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      if (json.result_code !== "OK") {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export const getCurrentUser = () => {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request(
    {
      url: API_BASE_URL + "/user/me",
      method: "GET",
    },
    "JSON"
  );
};

export const getAllPaper = () => {
  return request(
    {
      url: API_BASE_URL + "/getAllPaper",
      method: "GET",
    },
    "JSON"
  );
};

export const getMyPaper = () => {
  return request(
    {
      url: API_BASE_URL + "/getMyPaper",
      method: "GET",
    },
    "JSON"
  );
};

export const getPaperDetail = (paperDetailRequest) => {
  return request(
    {
      url: API_BASE_URL + "/getPaperDetail",
      method: "POST",
      body: JSON.stringify(paperDetailRequest),
    },
    "JSON"
  );
};

export const login = (loginRequest) => {
  return request(
    {
      url: API_BASE_URL + "/login",
      method: "POST",
      body: JSON.stringify(loginRequest),
    },
    "JSON"
  );
};

export const register = (registerRequest) => {
  return request(
    {
      url: API_BASE_URL + "/register",
      method: "POST",
      body: JSON.stringify(registerRequest),
    },
    "JSON"
  );
};

export const uploadFile = (uploadRequest) => {
  return request(
    {
      url: API_BASE_URL + "/upload_file",
      method: "POST",
      body: uploadRequest,
    },
    "formData"
  );
};

export const changePassword = (changePasswordRequest) => {
  return request(
    {
      url: API_BASE_URL + "/changePassword",
      method: "POST",
      body: JSON.stringify(changePasswordRequest),
    },
    "JSON"
  );
};

export const editPaper = (editPaperRequest, paper_id) => {
  return request(
    {
      url: API_BASE_URL + "/editPaperDone/" + paper_id,
      method: "POST",
      body: JSON.stringify(editPaperRequest),
    },
    "JSON"
  );
};

export const deletePaper = (deletePaperRequest) => {
  return request(
    {
      url: API_BASE_URL + "/deleteMyPaper",
      method: "POST",
      body: JSON.stringify(deletePaperRequest),
    },
    "JSON"
  );
};

export const searchPaper = (searchRequest) => {
  return request(
    {
      url: API_BASE_URL + "/searchPaper",
      method: "POST",
      body: JSON.stringify(searchRequest),
    },
    "JSON"
  );
};
