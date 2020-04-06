/** @format */

import React, { Component } from "react";
import { notification } from "antd";
import { Link } from "react-router-dom";

import { getPaperDetail } from "../../util/APIUtils";

class ItemDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemId: this.props.match.params.itemid,
      title: "",
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
        paper_id: this.state.itemId,
      },
    };
    getPaperDetail(detailRequest)
      .then((response) => {
        this.setState({
          title: response.data.title,
          keyName: response.data.key_name,
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
  render() {
    return (
      <main className='page-for-detail'>
        <div className='detail-for-paper'>
          <h1>{this.state.title}</h1>
          <span>
            {this.state.year} / {this.state.category} / {this.state.professor}
          </span>
          <br />
          <p className='detail-for-abstract'>{this.state.description_1}</p>
          <a
            href={`https://gradubucket.s3.ap-northeast-2.amazonaws.com/${this.state.keyName}`}
            target='_blank'
          >
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
              <path d='M444.875,109.792L338.208,3.125c-2-2-4.708-3.125-7.542-3.125h-224C83.135,0,64,19.135,64,42.667v426.667     C64,492.865,83.135,512,106.667,512h298.667C428.865,512,448,492.865,448,469.333v-352     C448,114.5,446.875,111.792,444.875,109.792z M341.333,36.417l70.25,70.25h-48.917c-11.76,0-21.333-9.573-21.333-21.333V36.417z      M426.667,469.333c0,11.76-9.573,21.333-21.333,21.333H106.667c-11.76,0-21.333-9.573-21.333-21.333V42.667     c0-11.76,9.573-21.333,21.333-21.333H320v64C320,108.865,339.135,128,362.667,128h64V469.333z' />
              <path d='M310.385,313.135c-9.875-7.771-19.26-15.76-25.51-22.01c-8.125-8.125-15.365-16-21.656-23.5     c9.813-30.323,14.115-45.958,14.115-54.292c0-35.406-12.792-42.667-32-42.667c-14.594,0-32,7.583-32,43.688     c0,15.917,8.719,35.24,26,57.698c-4.229,12.906-9.198,27.792-14.781,44.573c-2.688,8.052-5.604,15.51-8.688,22.406     c-2.51,1.115-4.948,2.25-7.302,3.427c-8.479,4.24-16.531,8.052-24,11.594C150.5,370.177,128,380.844,128,401.906     c0,15.292,16.615,24.76,32,24.76c19.833,0,49.781-26.49,71.656-71.115c22.708-8.958,50.938-15.594,73.219-19.75     c17.854,13.729,37.573,26.865,47.125,26.865c26.448,0,32-15.292,32-28.115c0-25.219-28.813-25.219-42.667-25.219     C337.031,309.333,325.49,310.604,310.385,313.135z M160,405.333c-6.094,0-10.219-2.875-10.667-3.427     c0-7.563,22.552-18.25,44.365-28.583c1.385-0.656,2.792-1.313,4.219-1.99C181.896,394.563,166.052,405.333,160,405.333z      M234.667,214.354c0-22.354,6.938-22.354,10.667-22.354c7.542,0,10.667,0,10.667,21.333c0,4.5-3,15.75-8.49,33.313     C239.135,233.75,234.667,222.698,234.667,214.354z M242.844,329c0.667-1.854,1.313-3.729,1.938-5.625     c3.958-11.875,7.521-22.542,10.698-32.146c4.427,4.875,9.198,9.865,14.313,14.979c2,2,6.958,6.5,13.563,12.135     C270.208,321.208,256.219,324.76,242.844,329z M362.667,334.552c0,4.792,0,6.781-9.896,6.844     c-2.906-0.625-9.625-4.583-17.917-10.229c3.01-0.333,5.229-0.5,6.479-0.5C357.094,330.667,361.563,332.208,362.667,334.552z' />
            </svg>
            PDF
          </a>
          <a>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
              <path d='M288 48H136c-22.092 0-40 17.908-40 40v336c0 22.092 17.908 40 40 40h240c22.092 0 40-17.908 40-40V176L288 48zm-16 144V80l112 112H272z'></path>
            </svg>
            Abstract
          </a>
        </div>
        <div className='detail-for-others'>
          <div className='detail-for-code'>
            <h1>Code</h1>
            <hr />
            <a href={`https://${this.state.github}`} target='_blank'>
              Click here for the code
            </a>
          </div>
          <div className='detail-for-tasks'>
            <h1>Top 3 Main Points</h1>
            <hr />
            <p>1. {this.state.description_1}</p>
            <br />
            <p>2. {this.state.description_2}</p>
            <br />
            <p>3. {this.state.description_3}</p>
            <br />
          </div>
        </div>
        <div className='detail-for-result'>
          <h1>Evaluation Results from the Paper</h1>
          <hr />
        </div>
        <Link to={`/editPaper/${this.state.itemId}`} className='img-link'>
          Edit paper
        </Link>
      </main>
    );
  }
}

export default ItemDetail;
