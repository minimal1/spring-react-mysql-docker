/** @format */

import React, { Component } from 'react';
import { Form, Upload, Button, DatePicker, message, Select} from 'antd';
import Icon from '@ant-design/icons';
import { uploadPaper, uploadFile } from '../util/APIUtils';
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

  componentDidMount() {
    this.props.onAuth();
  }

  handleChange = e => {
    const value = e.target.files[0];

    this.setState(prevState => ({
      fileList: [...prevState.fileList, value]
    }));
  };
  handleYearChange(date, dateString){
    this.setState({
      year: {
        value: dateString
      }
    });
    // console.log(this.state);
  }
  handleCategoryChange(e){
    this.setState({
      category: {
        value: e
      }
    });
    // console.log(this.state);
  }
  handleProfessorChange(e){
    this.setState({
      professor: {
        value: e
      }
    });
    // console.log(this.state);
  }

  handleUpload = () => {
    const { fileList } = this.state;
    console.log(fileList);
    const formData = new FormData();
    formData.append('data', fileList[0]);
    formData.append('year', this.state.year.value);
    formData.append('category', this.state.category.value);
    formData.append('professor', this.state.professor.value);

    this.setState({
      uploading: true
    });

    const uploadRequest = {
      result_code: 'OK',
      description: 'upload_paper',
      data: {
        year : this.state.year.value,
        category : this.state.category.value,
        professor : this.state.professor.value
      }
    };
    uploadFile(formData)
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
    const categoryData = ['AI', 'Application', 'Big Data', 'Data Mining', 'Deep Learning', 'Machine Learning', 'Smart'];
    const professorData = ['강지훈', '고영준', '공은배', '권오석', '권택근', '김경섭',
                          '김기일', '김동일','김상하', '김영국', '김현수', '김형식',
                          '김형신', '남병규', '류재철', '박정희', '원유재', '이규철', 
                          '이영석', '이철훈', '임성수', '장경선', '장진수', '정상근',
                          '조은선', '진성일', '최훈'];
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

        <h1 className='page-title'>Upload Paper</h1>
        <Form>
          <FormItem label='제출년도'>
            <DatePicker
             onChange={(date, dateString) => this.handleYearChange(date, dateString)}
             placeholder="Select Year"
             picker="year"/>
          </FormItem>
          <FormItem label='카테고리'>
            <Select
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
