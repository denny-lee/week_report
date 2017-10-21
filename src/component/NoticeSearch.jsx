import React, { Component } from 'react';
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

const NoticeSearch = React.createClass({
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
          	const respData = requestData(config.searchNotice, param, 'POST');
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
	    const items = itemList.map((k, i) => {
	    	const tagEle = getTagEle(k.tag);
	    	return <Card title={k.name} key={i}>
	    		<div>{tagEle}<Tag>{k.categ}</Tag></div>
	    		<pre>{k.caution}</pre>
	    	</Card>
	    });

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

const NoticeSearchForm = Form.create()(NoticeSearch);

export default NoticeSearchForm;
