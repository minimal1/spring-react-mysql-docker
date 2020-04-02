/** @format */

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
