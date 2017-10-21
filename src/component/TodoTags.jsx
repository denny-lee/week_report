import React, { Component } from 'react';
import { TagCloud } from "react-tagcloud";
import { Input, Row, Col, Button, message } from "antd";
import requestData from "../common/Request";
import config from "../config/config";

class TodoTags extends Component {
	constructor() {
		super();
		this.state = {
			value : '',
			currId : '',
			data : null
		}
	}

	componentWillMount() {
		this.doSearch();
	}

	doSearch() {
		const respData = requestData(config.getMyTags, null, 'POST');
      	if (respData) {
          	const data = [];
          	for(let i in respData) {
          		data.push({value: respData[i].tag, count: respData[i].cnt, id: respData[i].id });
          	}
          	this.setState({
          		data : data
          	});
      	} else {
          	if(respData.content != undefined && respData.content != "") {
            	message.error('提交失败,' + respData.content);
          	} else {
            	message.error('提交失败');
          	}
      	}
	}

	handlerChange = (e) => {
		this.setState({
			value : e.target.value
		});
	}

	doSave = () => {
		const value = this.state.value;
		if(value === '') {
			return;
		}
		const respData = requestData(config.saveMyTags, { tag : value }, 'POST');
          if (respData) {
              message.success('新增成功');
              this.setState({
              	value: ''
            });
              this.doSearch();
          } else {
              if(respData.content != undefined && respData.content != "") {
                message.error('提交失败,' + respData.content);
              } else {
                message.error('提交失败');
              }
          }
	}

	countPlus = (tag) => {
		this.setState({
			currId : tag.id
		});
		requestData(config.countMyTags, { id: tag.id }, 'POST');
	}

	doDelete = () => {
		const id = this.state.currId;
		const respData = requestData(config.deleteMyTags, { id: id }, 'POST');

		if (respData) {
            const data = this.state.data;
            if(data) {
              	const newDate = data.filter((v) => v.id !== id);
              	this.setState({
	              	currId: '',
	              	data: newDate
	            });
            }
        }
	}

	render() {
		return <div>
			<Row>
				<Col span={4}>
					<Input value={this.state.value} onChange={this.handlerChange} onPressEnter={this.doSave} placeholder="Type tags here" />
				</Col>
				<Col span={2}>
					<Input value={this.state.currId} />
				</Col>
				<Col span={2}>
					<Button type="primary" icon="minus" shape="circle" onClick={this.doDelete}></Button>
				</Col>
			</Row>
			<TagCloud minSize={12}
	            maxSize={35}
	            tags={this.state.data}
	            onClick={this.countPlus} />
            </div>
	}
}


export default TodoTags;