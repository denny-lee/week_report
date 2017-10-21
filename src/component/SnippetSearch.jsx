import React, { Component } from 'react';
import { PrismCode } from "react-prism";
import { Form, Input, Button, Col, Row, Tag, Card, message } from 'antd';
require('antd/lib/tag/style');

import requestData from "../common/Request";
import config from "../config/config";

const FormItem = Form.Item;


function getTagEle(tag) {
	const colors = ['blue','green','yellow','red'];
	if(tag === undefined || tag === '') {
		return null;
	}
	const tagArr = tag.split(',');
	return tagArr.map((k, i) => <Tag color={colors[(i%colors.length)]} key={i}>{k}</Tag>);
}

const SnippetSearch = React.createClass({
  	getInitialState() {
        return {
            itemList: []
        };
    },

  	resetHandler(e) {
      	e.preventDefault();
      	this.props.form.resetFields();
  	},

  	submitHandler(e) {
      	e.preventDefault();
      	this.props.form.validateFields((err, values) => {
          	if (!!err) {
              	return;                
          	}

          	const param = Object.assign({}, values);
          	const respData = requestData(config.searchSnippet, param, 'POST');
          	if (respData) {
          		if(respData.length > 0) {
          			this.setState({ itemList : respData});
          		}
              	message.success('搜索成功');
          	} else {
              	if(respData.content != undefined && respData.content != "") {
                	message.error('提交失败,' + respData.content);
              	} else {
                	message.error('提交失败');
              	}
          	}
      	});
  	},

  	render() {
  		const { getFieldProps } = this.props.form;

	    const tagProp = getFieldProps('tag', {
                                        rules: [{
                                            max: 60,
                                            message: '字符数少于60'
                                        }]
                                    });

	    const itemList = this.state.itemList;
	    const items = [];
	    for(let it = 0; it < itemList.length; it++) {
	    	const tempArr = [];
	    	let k = itemList[it];
	    	let tagEle = getTagEle(k.tag);
	    	tempArr.push(<Card title={k.description} key={it}>
	    		<div>{tagEle}<Tag>{k.language}</Tag></div>
	    		<pre><PrismCode className="language-javascript">{k.content}</PrismCode></pre>
	    	</Card>);

	    	it++;
	    	if(it >= itemList.length) {
	    		items.push(<Row><Col span={12}>{tempArr[0]}</Col></Row>);
	    		break;
	    	}

	    	k = itemList[it];
	    	tagEle = getTagEle(k.tag);
	    	tempArr.push(<Card title={k.description} key={it}>
	    		<div>{tagEle}<Tag>{k.language}</Tag></div>
	    		<pre><PrismCode className="language-javascript">{k.content}</PrismCode></pre>
	    	</Card>);
	    	items.push(<Row key={it}><Col span={12}>{tempArr[0]}</Col><Col span={12}>{tempArr[1]}</Col></Row>);
	    };

	    return (
	    	<div>
		      	<Form onSubmit={this.submitHandler} form={this.props.form}>
			        <Row type="flex" justify="center">
			            <Col span={8}>
			                <FormItem>
			                    <Input {...tagProp} placeholder="input tag or language hear." />
			                </FormItem>
			            </Col>
			            <Col><Button type="primary" shape="circle" icon="search" htmlType="submit" /></Col>
			        </Row>
		    	</Form>
	    		{items}
		    </div>
	    );
  },
});

const SnippetSearchForm = Form.create()(SnippetSearch);

export default SnippetSearchForm;
