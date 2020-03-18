/** @format */

import React, { Component } from 'react';
import { Form, Upload, Button, DatePicker, message, Select} from 'antd';
import Icon from '@ant-design/icons';
import { uploadPaper } from '../util/APIUtils';
const FormItem = Form.Item;
class UploadPaper extends Component {
  state = {
    fileList: [],
    uploading: false,
    year: {
      value : ''
    },
    category: {
      value : ''
    },
    professor: {
      value : ''
    }
  };

  handleChange = e => {
    const value = e.target.files[0];

    this.setState(prevState => ({
      fileList: [...prevState.fileList, value]
    }));
  };
  handleYearChange(date, dateString){
    console.log(dateString);
    this.setState({
      year: {
        value: dateString
      }
    });
    console.log(this.state.year.value);
  }
  handleCategoryChange(e){
    console.log(e);
    this.setState({
      category: {
        value: e
      }
    });
    console.log(this.state);
  }
  handleProfessorChange(e){
    console.log(e);
    this.setState({
      professor: {
        value: e
      }
    });
    console.log(this.state);
  }

  handleUpload = () => {
    const { fileList } = this.state.fileList;
    const formData = new FormData();
    formData.append('data', fileList[0]);

    this.setState({
      uploading: true
    });

    const uploadRequest = {
      result_code: 'OK',
      description: 'upload_paper',
      data: {
        year : this.state.year.value,
        category : this.state.category.value,
        professor : this.state.professor.value,
        formData : formData
      }
    };

    uploadPaper(formData)
      .then(response => {
        this.setState({
          fileList: [],
          year: {
            value: ''
          },
          category: {
            value: ''
          },
          professor: {
            value: ''
          },
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
            <DatePicker
             onChange={(date, dateString) => this.handleYearChange(date, dateString)}
             placeholder="Select Year"
             picker="year"/>
          </FormItem>
          <FormItem label='카테고리'>
            <Select
             value={this.state.category.value}
             style={{ width: 200 }}
             onChange={event => this.handleCategoryChange(event)}
             placeholder="Select Category">
              {categoryData.map(category => (
                <Option key={category} value={category}>{category}</Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label='담당교수'>
            <Select
             value={this.state.professor.value}
             style={{ width: 200 }}
             onChange={event => this.handleProfessorChange(event)}
             placeholder="Select Professor">
              {professorData.map(professor => (
                <Option key={professor} value={professor}>{professor}</Option>
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
