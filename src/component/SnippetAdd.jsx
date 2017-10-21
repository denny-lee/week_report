import React, { Component } from 'react';
import { Form, Input, Button, Col, Row, message } from 'antd';

import requestData from "../common/Request";
import config from "../config/config";

const FormItem = Form.Item;


const SnippetAdd = React.createClass({
  
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

          const param = Object.assign({}, values, {content: values.content_1});
          const respData = requestData(config.saveSnippet, param, 'POST');
          if (respData) {
              message.success('新增成功');
              this.props.form.resetFields();
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
                                            required: true,
                                            max: 200,
                                            message: '请输入tag，字符数少于200'
                                        }]
                                    });
    const contentProp = getFieldProps('content_1', {
                                        rules: [{
                                            required: true,
                                            max: 2000,
                                            message: '请输入content，字符数少于2000'
                                        }]
                                    });
    const descProp = getFieldProps('description', {
                                        rules: [{
                                            max: 200,
                                            message: '字符数少于200'
                                        }]
                                    });
    const langProp = getFieldProps('language', {
                                        rules: [{
                                            max: 45,
                                            message: '字符数少于45'
                                        }]
                                    });

    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };

    return (
      <Form horizontal onSubmit={this.submitHandler} form={this.props.form}>
        <Row type="flex" justify="space-around" align="middle">
            <Col span={20}>
                <FormItem
                    {...formItemLayout}
                    label="tag："
                >
                    <Input {...tagProp} placeholder="react java c++" />
                </FormItem>
            </Col>
        </Row>
        <Row type="flex" justify="space-around" align="middle">
            <Col span={20}>
                <FormItem
                    {...formItemLayout}
                    label="language："
                >
                    <Input {...langProp} placeholder="java" />
                </FormItem>
            </Col>
        </Row>
        <Row type="flex" justify="space-around" align="middle">
            <Col span={20}>
                <FormItem
                    {...formItemLayout}
                    label="content："
                >
                    <Input type="textarea" rows="18" {...contentProp}/>
                </FormItem>
            </Col>
        </Row>
        <Row type="flex" justify="space-around" align="middle">
            <Col span={20}>
                <FormItem
                    {...formItemLayout}
                    label="description："
                >
                    <Input {...descProp} placeholder="描述"/>
                </FormItem>
            </Col>
        </Row>
        <Row type="flex" justify="space-around" align="middle">
            <Col>
                <FormItem>
                    <Button type="primary" htmlType="submit">确定</Button>
                    <Button type="ghost" onClick={this.resetHandler}>重置</Button>
                </FormItem>
            </Col>
        </Row>
    </Form>
    );
  },
});

const SnippetAddForm = Form.create()(SnippetAdd);

export default SnippetAddForm;
