/** @format */

import React, { Component } from "react";
import {
  Tag,
  Tooltip,
  Tabs,
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  notification,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";

import { getPaperDetail, editPaper, deletePaper } from "../../util/APIUtils";
import {
  handleChange,
  handleYearChange,
  handleCategoryChange,
  handleProfessorChange,
} from "../../util/Handler";
import { categoryData, professorData } from "../../constants/index";

const FormItem = Form.Item;
const { TabPane } = Tabs;

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
      tags: [],
      inputVisible: false,
      inputValue: "",
    };

    this.handleChange = handleChange.bind(this);
    this.handleYearChange = handleYearChange.bind(this);
    this.handleCategoryChange = handleCategoryChange.bind(this);
    this.handleProfessorChange = handleProfessorChange.bind(this);
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
        console.log(response);

        const tags =
          response.data.hashtag !== null &&
          response.data.hashtag !== undefined &&
          response.data.hashtag !== ""
            ? response.data.hashtag.split("/")
            : [];
        this.setState({
          title: response.data.title,
          year: response.data.year,
          github: response.data.github,
          category: response.data.category,
          professor: response.data.professor,
          description_1: response.data.description1,
          description_2: response.data.description2,
          description_3: response.data.description3,
          tags: tags,
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

  handleSubmit = (e) => {
    const new_hashtag = this.state.tags.join("/");
    const data = {
      new_github: this.state.github,
      new_year: this.state.year,
      new_professor: this.state.professor,
      new_description_1: this.state.description_1,
      new_description_2: this.state.description_2,
      new_description_3: this.state.description_3,
      new_category: this.state.category,
      new_hashtag: new_hashtag,
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

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter((tag) => tag !== removedTag);

    this.setState({ tags });
  };
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: "",
    });
  };

  saveInputRef = (input) => (this.input = input);

  render() {
    const yearFormat = "YYYY";

    const { Option } = Select;

    const {
      title,
      year,
      category,
      professor,
      description_1,
      description_2,
      description_3,
      tags,
      inputValue,
      inputVisible,
      github,
    } = this.state;

    const tagElems = tags.map((tag, index) => {
      const isLongTag = tag.length > 20;
      const tagElem = (
        <Tag key={tag} closable={true} onClose={() => this.handleClose(tag)}>
          {isLongTag ? `${tag.slice(0, 20)}...` : tag}
        </Tag>
      );
      return isLongTag ? (
        <Tooltip title={tag} key={tag}>
          {tagElem}
        </Tooltip>
      ) : (
        tagElem
      );
    });

    return (
      <main className='edit-paper'>
        <span className='edit-paper__title'>{title}</span>

        <Form onFinish={this.handleSubmit} className='form-container'>
          <FormItem label='제출년도' className='form-container__year'>
            <DatePicker
              style={{ width: "100%" }}
              onChange={this.handleYearChange}
              value={"" !== year ? moment(year, yearFormat) : ""}
              placeholder='Select Year'
              picker='year'
            />
          </FormItem>
          <FormItem label='카테고리' className='form-container__category'>
            <Select
              placeholder='Select Category'
              onChange={this.handleCategoryChange}
              value={category}
            >
              {categoryData.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label='담당교수' className='form-container__professor'>
            <Select
              onChange={this.handleProfessorChange}
              value={professor}
              placeholder='Select Professor'
            >
              {professorData.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem>
            <Tabs defaultActiveKey='1'>
              <TabPane tab='Description 1' key='1'>
                <Input.TextArea
                  value={description_1}
                  onChange={this.handleChange}
                  name='description_1'
                  placeholder='Enter Description'
                  autoSize={{ minRows: 3, maxRows: 3 }}
                />
              </TabPane>
              <TabPane tab='Description 2' key='2'>
                <Input.TextArea
                  value={description_2}
                  onChange={this.handleChange}
                  name='description_2'
                  placeholder='Enter Description'
                  autoSize={{ minRows: 3, maxRows: 3 }}
                />
              </TabPane>
              <TabPane tab='Description 3' key='3'>
                <Input.TextArea
                  value={description_3}
                  onChange={this.handleChange}
                  autoSize={{ minRows: 3, maxRows: 3 }}
                  name='description_3'
                  placeholder='Enter Description'
                />{" "}
              </TabPane>
            </Tabs>
          </FormItem>
          <FormItem label='Hashtags'>
            {tagElems}
            {inputVisible && (
              <Input
                ref={this.saveInputRef}
                type='text'
                size='small'
                style={{ width: 78 }}
                value={inputValue}
                onChange={this.handleInputChange}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <Tag
                style={{ background: "#fff", borderStyle: "dashed" }}
                onClick={this.showInput}
              >
                <PlusOutlined /> New Tag
              </Tag>
            )}
          </FormItem>
          <FormItem label='Repository 주소'>
            <Input
              addonBefore='https://'
              placeholder='github.com/exID/exRepo'
              name='github'
              onChange={this.handleChange}
              value={github}
            />
          </FormItem>
          <FormItem>
            <Button type='primary' htmlType='submit' style={{ marginTop: 16 }}>
              Edit Paper
            </Button>

            <Button
              className='delete-paper'
              style={{ marginTop: 16 }}
              onClick={this.handleDelete}
            >
              {"Delete Paper"}
            </Button>
          </FormItem>
        </Form>
      </main>
    );
  }
}

export default ItemEdit;
