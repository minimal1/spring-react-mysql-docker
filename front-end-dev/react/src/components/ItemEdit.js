/** @format */

import React, { Component } from "react";
import { Form, Input, Button, DatePicker, message, Select } from "antd";
import { getPaperDetail, editPaper, deletePaper } from "../util/APIUtils";
import { notification } from "antd";
import { categoryData, professorData } from "../constants/index";
import moment from "moment";
import { Redirect } from "react-router-dom";
const FormItem = Form.Item;

class ItemEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paper_id: this.props.match.params.itemid,
      keyName: "",
      year: "",
      github: "",
      category: "",
      professor: "",
      description_1: "",
      description_2: "",
      description_3: "",
    };
  }

  componentDidMount() {
    const detailRequest = {
      result_code: "OK",
      description: "detail_paper",
      data: {
        paper_id: this.state.paper_id,
      },
    };

    getPaperDetail(detailRequest)
      .then((response) => {
        this.setState({
          title: response.data.title,
          year: response.data.year,
          github: response.data.github,
          category: response.data.category,
          professor: response.data.professor,
          description_1: response.data.description1,
          description_2: response.data.description2,
          description_3: response.data.description3,
        });
      })
      .catch((error) => {
        notification.error({
          message: "Paper Detail 반환 실패",
          description:
            error.description ||
            "Sorry! Something went wrong. Please try again!",
        });
      });
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleYearChange = (date, dateString) => {
    this.setState({
      year: dateString,
    });
  };

  handleCategoryChange = (e) => {
    this.setState({
      category: e,
    });
  };
  handleProfessorChange = (e) => {
    this.setState({
      professor: e,
    });
  };

  handleGithubChange = (e) => {
    this.setState({
      github: e.target.value,
    });
  };

  handleSubmit = (e) => {
    const data = {
      new_github: this.state.github,
      new_year: this.state.year,
      new_professor: this.state.professor,
      new_description_1: this.state.description_1,
      new_description_2: this.state.description_2,
      new_description_3: this.state.description_3,
      new_category: this.state.category,
    };

    const editPaperRequest = {
      result_code: "OK",
      description: "Request Edit this paper",
      data,
    };

    editPaper(editPaperRequest, this.state.paper_id)
      .then((response) => {
        notification.success({
          message: "수정 성공!",
          description: "You successfully edited it.",
        });
        this.props.history.push(`/detail/${this.state.paper_id}`);
      })
      .catch((error) => {
        notification.error({
          message: "Paper Edit 실패",
          description:
            error.description ||
            "Sorry! Something went wrong. Please try again!",
        });
      });
  };

  handleDelete = (e) => {
    const deletePaperRequest = {
      result_code: "OK",
      description: "Request delete this paper",
      data: {
        paper_id: this.state.paper_id,
      },
    };

    deletePaper(deletePaperRequest)
      .then((response) => {
        notification.success({
          message: "삭제 성공!",
          description: "You successfully deleted it.",
        });

        this.props.history.push("/");
      })
      .catch((error) => {
        notification.error({
          message: "Delete Paper 실패",
          description:
            error.description ||
            "Sorry! Something went wrong. Please try again!",
        });
      });
  };

  render() {
    const yearFormat = "YYYY";

    const { Option } = Select;

    return (
      <main className='editPaper'>
        <Form onFinish={this.handleSubmit}>
          <FormItem label='제목'>
            <span className='ant-form-text'>{this.state.title}</span>
          </FormItem>

          <FormItem label='제출년도'>
            <DatePicker
              onChange={this.handleYearChange}
              value={
                "" !== this.state.year
                  ? moment(this.state.year, yearFormat)
                  : ""
              }
              placeholder='Select Year'
              picker='year'
            />
          </FormItem>
          <FormItem label='카테고리'>
            <Select
              style={{ width: 200 }}
              placeholder='Select Category'
              onChange={this.handleCategoryChange}
              value={this.state.category}
            >
              {categoryData.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label='담당교수'>
            <Select
              onChange={this.handleProfessorChange}
              value={this.state.professor}
              style={{ width: 200 }}
              placeholder='Select Professor'
            >
              {professorData.map((professor) => (
                <Option key={professor} value={professor}>
                  {professor}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label='Description'>
            <Input.TextArea
              value={this.state.description_1}
              onChange={this.handleChange}
              name='description_1'
              placeholder='Enter Description'
            />
          </FormItem>
          <FormItem label='Github 주소'>
            <Input
              type='url'
              placeholder='Enter Github Address'
              name='github'
              onChange={this.handleChange}
              value={this.state.github}
            />
          </FormItem>
          <FormItem>
            <Button type='primary' htmlType='submit' style={{ marginTop: 16 }}>
              Edit Paper
            </Button>
          </FormItem>
        </Form>
        <Button style={{ marginTop: 16 }} onClick={this.handleDelete}>
          {"Delete Paper"}
        </Button>
      </main>
    );
  }
}

export default ItemEdit;
