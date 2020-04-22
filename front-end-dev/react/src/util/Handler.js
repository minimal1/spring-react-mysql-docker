/** @format */

import {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from "../constants/index";

export function handleChange(e) {
  const { name, value } = e.target;
  console.log(name, value);
  this.setState({
    [name]: value,
  });
}

export function handleYearChange(date, dateString) {
  this.setState({
    year: dateString,
  });
}

export function handleCategoryChange(e) {
  this.setState({
    category: e,
  });
}
export function handleProfessorChange(e) {
  this.setState({
    professor: e,
  });
}

export function handleGithubChange(e) {
  this.setState({
    github: e.target.value,
  });
}

/* login, register handler */

export function isFormInvalid(checkpoint) {
  return checkpoint === "Register"
    ? !(
        this.state.username.validateStatus === "success" &&
        this.state.email.validateStatus === "success" &&
        this.state.password.validateStatus === "success" &&
        this.state.password1.validateStatus === "success"
      )
    : !(
        this.state.username.validateStatus === "success" &&
        this.state.password.validateStatus === "success"
      );
}

export function handleChangeForLoginAndRegister(e, validationFunc, param) {
  const target = e.target;
  const inputName = target.name;
  const inputValue = target.value;

  const status = param
    ? validationFunc(inputValue, param)
    : validationFunc(inputValue);

  this.setState({
    [inputName]: {
      value: inputValue,
      ...status,
    },
  });
}

export function validateUsername(username) {
  if (username.length < USERNAME_MIN_LENGTH) {
    return {
      validateStatus: "error",
      errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`,
    };
  } else if (username.length > USERNAME_MAX_LENGTH) {
    return {
      validateStatus: "error",
      errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters needed.)`,
    };
  } else {
    return {
      validateStatus: "success",
      errorMsg: null,
    };
  }
}

export function validateEmail(email) {
  if (!email) {
    return {
      validateStatus: "error",
      errorMsg: "Email may not be empty",
    };
  }

  const EMAIL_REGEX = RegExp("[^@ ]+@[^@ ]+\\.[^@ ]+");

  if (!EMAIL_REGEX.test(email)) {
    return {
      validateStatus: "error",
      errorMsg: "Email not valid",
    };
  }

  return { validateStatus: "success", errorMsg: null };
}

export function validatePassword(password) {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return {
      validateStatus: "error",
      errorMsg: `Password is too shart (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`,
    };
  } else if (password.length > PASSWORD_MAX_LENGTH) {
    return {
      validateStatus: "error",
      errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`,
    };
  } else {
    return {
      validateStatus: "success",
      errorMsg: null,
    };
  }
}
export function validatePassword1(password1, password) {
  if (password1 !== password) {
    return {
      validateStatus: "error",
      errorMsg: `Password is not same`,
    };
  } else {
    return {
      validateStatus: "success",
      errorMsg: null,
    };
  }
}
