/** @format */

import React, { Component } from "react";
import { DatePicker, Select } from "antd";

import { categoryData, professorData } from "../../constants/index";
import moment from "moment";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = { year: "", category: "", professor: "" };
  }

  componentDidUpdate(prevProps, prevState, snapshots) {
    if (prevProps.filterData.year !== this.props.filterData.year) {
      const year = this.props.filterData.year;
      this.setState({ year });
    }
    if (prevProps.filterData.category !== this.props.filterData.category) {
      const category = this.props.filterData.category;
      this.setState({ category });
    }
    if (prevProps.filterData.professor !== this.props.filterData.professor) {
      const professor = this.props.filterData.professor;
      this.setState({ professor });
    }
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value ? value : "",
    });

    this.props.onChangeFilters(name, value ? value : "");
    console.log(this.state);
  };
  render() {
    const { year, category, professor } = this.state;
    const { Option } = Select;
    const yearFormat = "YYYY";

    return (
      <div
        className='filter-bar'
        style={{
          transform: this.props.doFilterUse
            ? "translateY(0)"
            : "translateY(-80px)",
          opacity: this.props.doFilterUse ? 1 : 0,
        }}
      >
        <div className='filter-bar__column'></div>

        <div className='filter-bar__column'>
          <DatePicker
            style={{ width: "100%" }}
            onChange={(year, yearString) =>
              this.handleChange("year", yearString)
            }
            value={"" !== year ? moment(year, yearFormat) : ""}
            placeholder='Year'
            picker='year'
          />
          <Select
            allowClear
            placeholder='Category'
            onChange={(value) => this.handleChange("category", value)}
            value={category === "" ? undefined : category}
          >
            {categoryData.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
          <Select
            allowClear
            onChange={(value) => this.handleChange("professor", value)}
            value={professor === "" ? undefined : professor}
            placeholder='Professor'
          >
            {professorData.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </div>
        <div className='filter-bar__column'></div>
      </div>
    );
  }
}

export default Filter;
