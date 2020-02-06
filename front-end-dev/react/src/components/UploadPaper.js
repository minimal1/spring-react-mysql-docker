/** @format */

import React, { Component } from 'react';
import { Upload, Button, Icon, message } from 'antd';
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

    console.log(uploadRequest);
    uploadPaper(uploadRequest)
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
  render() {
    const { uploading, fileList } = this.state;
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
