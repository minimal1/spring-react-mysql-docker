/** @format */

import React, { Component } from 'react';
import { Upload, Button, DatePicker, message, Select} from 'antd';
import Icon from '@ant-design/icons';
import { uploadPaper } from '../util/APIUtils';
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
        <span>제출년도 : </span> 
        <DatePicker onChange={this.yearChange} placeholder="Select Year" picker="year"/>
        <span>카테고리 : </span>
        <Select style={{ width: 200 }} onChange={this.categoryChange} placeholder="Select Category">
          {categoryData.map(category => (
            <Option key={category}>{category}</Option>
          ))}
        </Select>
        <span>교수 : </span>
        <Select style={{ width: 200 }} onChange={this.professorChange} placeholder="Select Professor">
          {professorData.map(professor => (
            <Option key={professor}>{professor}</Option>
          ))}
        </Select>
        
        <Upload {...props}>
          <Button>
            <Icon type='upload' /> Select File
          </Button>
        </Upload>
        {/* <input type='file' onChange={this.handleChange} />
        Select File */}
        <Button
          type='primary'
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Uploading' : 'Start Uploading'}
        </Button>
      </main>
    );
  }
}

export default UploadPaper;
