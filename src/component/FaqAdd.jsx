import React, { Component } from 'react';
import { Form, Input, Button, Col, Row, message } from 'antd';

import requestData from "../common/Request";
import config from "../config/config";

const FormItem = Form.Item;


const FaqAdd = React.createClass({
  
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
          const respData = requestData(config.saveFaq, param, 'POST');
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

    const questionProp = getFieldProps('question', {
                                        rules: [{
                                            required: true,
                                            max: 1000,
                                            message: '请输入question，字符数少于1000'
                                        }]
                                    });
    const answerProp = getFieldProps('answer', {
                                        rules: [{
                                            max: 2000,
                                            message: '字符数少于2000'
                                        }]
                                    });
    const tagProp = getFieldProps('tag', {
                                        rules: [{
                                            max: 200,
                                            message: '字符数少于200'
                                        }]
                                    });
    const categProp = getFieldProps('categ', {
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
                    label="category："
                >
                    <Input {...categProp} placeholder="框架" />
                </FormItem>
            </Col>
        </Row>
        <Row type="flex" justify="space-around" align="middle">
            <Col span={20}>
                <FormItem
                    {...formItemLayout}
                    label="question："
                >
                    <Input {...questionProp}/>
                </FormItem>
            </Col>
        </Row>
        <Row type="flex" justify="space-around" align="middle">
            <Col span={20}>
                <FormItem
                    {...formItemLayout}
                    label="answer："
                >
                    <Input type="textarea" rows="8" {...answerProp} />
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

const FaqAddForm = Form.create()(FaqAdd);

export default FaqAddForm;
