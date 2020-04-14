/** @format */

import React, { Component } from "react";
import { Form, Input, Upload, Button, DatePicker, message, Select } from "antd";
import Icon from "@ant-design/icons";
import moment from "moment";

import { uploadFile } from "../../util/APIUtils";
import {
  handleChange,
  handleYearChange,
  handleCategoryChange,
} from "../../util/Handler";
import { categoryData } from "../../constants/index";

const FormItem = Form.Item;
class UploadPaper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      uploading: false,
      year: "",
      category: "",
      github: "",
    };

    this.handleChange = handleChange.bind(this);
    this.handleYearChange = handleYearChange.bind(this);
    this.handleCategoryChange = handleCategoryChange.bind(this);
  }
  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    formData.append("data", fileList[0]);
    formData.append("year", this.state.year);
    formData.append("category", this.state.category);
    formData.append("github", this.state.github);

    this.setState({
      uploading: true,
    });

    uploadFile(formData)
      .then((response) => {
        this.setState({
          fileList: [],
          year: "",
          category: "",
          github: "",
          uploading: false,
        });
        message.success(
          "Paper is uploaded successfully, and now edit detail please"
        );
        this.props.history.push(`/editPaper/${response.data.paper_id}`);
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
    const yearFormat = "YYYY";

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
        <h1 className='upload__title'>Upload Paper</h1>
        <Form onFinish={this.handleUpload} className='form-container'>
          <FormItem label='제출년도' className='form-container__year'>
            <DatePicker
              style={{ width: "100%" }}
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
          <FormItem label='카테고리' className='form-container__category'>
            <Select
              onChange={this.handleCategoryChange}
              value={this.state.category}
              placeholder='Select Category'
            >
              {categoryData.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label='Github 주소'>
            <Input
              addonBefore='https://'
              placeholder='github.com/exID/exRepo'
              name='github'
              onChange={this.handleChange}
              value={this.state.github}
            />
          </FormItem>
          <FormItem label='논문 업로드'>
            <Upload {...props} accept='application/pdf'>
              <Button>
                <Icon type='upload' /> Select File
              </Button>
            </Upload>
          </FormItem>

          <FormItem>
            <Button
              htmlType='submit'
              type='primary'
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
