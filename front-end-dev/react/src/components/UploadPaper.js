/** @format */

import React, { Component } from "react";
import { Form, Input, Upload, Button, DatePicker, message, Select } from "antd";
import Icon from "@ant-design/icons";
import { uploadFile } from "../util/APIUtils";
import { categoryData, professorData } from "../constants/index";

const FormItem = Form.Item;
class UploadPaper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      uploading: false,
      year: {
        value: "",
      },
      category: {
        value: "",
      },
      professor: {
        value: "",
      },
      github: {
        value: "",
      },
    };
  }

  handleChange = (e) => {
    const value = e.target.files[0];

    this.setState((prevState) => ({
      fileList: [...prevState.fileList, value],
    }));
  };

  handleYearChange(date, dateString) {
    this.setState({
      year: {
        value: dateString,
      },
    });
  }

  handleCategoryChange(e) {
    this.setState({
      category: {
        value: e,
      },
    });
  }
  handleProfessorChange(e) {
    this.setState({
      professor: {
        value: e,
      },
    });
  }
  handleGithubChange(e) {
    this.setState({
      github: {
        value: e.target.value,
      },
    });
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    formData.append("data", fileList[0]);
    formData.append("year", this.state.year.value);
    formData.append("category", this.state.category.value);
    formData.append("professor", this.state.professor.value);
    formData.append("github", this.state.github.value);

    this.setState({
      uploading: true,
    });

    uploadFile(formData)
      .then((response) => {
        this.setState({
          fileList: [],
          year: {
            value: "",
          },
          category: {
            value: "",
          },
          professor: {
            value: "",
          },
          github: {
            value: "",
          },
          uploading: false,
        });
        message.success("upload successfully");
        this.props.history.push(`/detail/${response.data.paper_id}`);
      })
      .catch((error) => {
        this.setState({
          uploading: false,
        });
        message.error(`upload failed ${error.description}`);
      });
  };

  render() {
    const { uploading, fileList } = this.state;
    const { Option } = Select;

    const props = {
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState((state) => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <main className='upload'>
        <h1 className='page-title'>Upload Paper</h1>
        <Form>
          <FormItem label='제출년도'>
            <DatePicker
              onChange={(date, dateString) =>
                this.handleYearChange(date, dateString)
              }
              placeholder='Select Year'
              picker='year'
            />
          </FormItem>
          <FormItem label='카테고리'>
            <Select
              style={{ width: 200 }}
              onChange={(event) => this.handleCategoryChange(event)}
              placeholder='Select Category'
            >
              {categoryData.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label='담당교수'>
            <Select
              style={{ width: 200 }}
              onChange={(event) => this.handleProfessorChange(event)}
              placeholder='Select Professor'
            >
              {professorData.map((professor) => (
                <Option key={professor} value={professor}>
                  {professor}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label='논문 업로드'>
            <Upload {...props} accept='application/pdf'>
              <Button>
                <Icon type='upload' /> Select File
              </Button>
            </Upload>
          </FormItem>
          <FormItem label='Github 주소'>
            <Input
              type='url'
              placeholder='Enter Github Address'
              onChange={(event) => this.handleGithubChange(event)}
            />
          </FormItem>
          <FormItem>
            <Button
              type='primary'
              onClick={this.handleUpload}
              disabled={fileList.length === 0}
              loading={uploading}
              style={{ marginTop: 16 }}
            >
              {uploading ? "Uploading" : "Start Uploading"}
            </Button>
          </FormItem>
        </Form>
      </main>
    );
  }
}

export default UploadPaper;
