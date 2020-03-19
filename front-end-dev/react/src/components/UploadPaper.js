/** @format */

import React, { Component } from 'react';
import { Form, Upload, Button, DatePicker, message, Select} from 'antd';
import Icon from '@ant-design/icons';
import { uploadPaper } from '../util/APIUtils';
const FormItem = Form.Item;
class UploadPaper extends Component {
  state = {
    fileList: [],
    uploading: false
  };

  handleChange = e => {
    const value = e.target.files[0];

    this.setState(prevState => ({
      fileList: [...prevState.fileList, value]
    }));
  };

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    formData.append('data', fileList[0]);

    this.setState({
      uploading: true
    });

    const uploadRequest = {
      result_code: 'OK',
      description: 'upload_paper',
      data: formData
    };

    uploadPaper(formData)
      .then(response => {
        this.setState({
          fileList: [],
          uploading: false
        });
        message.success('upload successfully');
      })
      .catch(error => {
        this.setState({
          uploading: false
        });
        message.error(`upload failed ${error.description}`);
      });
  };
  yearChange(date, dateString) {
    console.log(date, dateString);
  }
  categoryChange(value) {
    console.log(`selected ${value}`);
  }
  professorChange(value) {
    console.log(`selected ${value}`);
  }
  render() {
    const { uploading, fileList } = this.state;
    const { Option } = Select;
    const categoryData = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    const professorData = ['김기일', '윤청', '김동일', '김현수', '권오석', '류재철'];
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file]
        }));
        return false;
      },
      fileList
    };

    return (
      <main className='upload'>
        <Form>
          <FormItem label='제출년도'>
            <DatePicker onChange={this.yearChange} placeholder="Select Year" picker="year"/>
          </FormItem>
          <FormItem label='카테고리'>
            <Select style={{ width: 200 }} onChange={this.categoryChange} placeholder="Select Category">
              {categoryData.map(category => (
                <Option key={category}>{category}</Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label='담당교수'>
            <Select style={{ width: 200 }} onChange={this.professorChange} placeholder="Select Professor">
              {professorData.map(professor => (
                <Option key={professor}>{professor}</Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label='논문 업로드'>
            <Upload {...props}>
              <Button>
                <Icon type='upload' /> Select File
              </Button>
            </Upload>
          </FormItem>
          <FormItem>
            <Button
              type='primary'
              onClick={this.handleUpload}
              disabled={fileList.length === 0}
              loading={uploading}
              style={{ marginTop: 16 }}
            >
              {uploading ? 'Uploading' : 'Start Uploading'}
            </Button>
          </FormItem>
        </Form>
      </main>
    );
  }
}

export default UploadPaper;
