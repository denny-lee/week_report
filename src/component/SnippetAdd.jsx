import React from 'react';
import {Form, Input, Icon, Button, message} from 'antd';
import {hashHistory} from 'react-router';
import req from '../common/Request';
import './index.css';

const {TextArea} = Input;

const FormItem = Form.Item;


const SnippetAdd = React.createClass({

    getInitialState() {
        return {
            defaultGain: '暂无',
            wait: false
        }
    },
    handlerSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({wait: true});
                console.log('Received values of form: ', values);
                const resp = req("/save", values, "POST");
                if (resp && resp.success) {
                    message.success("Good Job!", 3);
                    hashHistory.push("/done");
                } else {
                    message.error("Submit Fail.");
                }
            }
        });
    },

    render() {
        const {getFieldDecorator} = this.props.form;


        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 20},
        };
        const name = this.props.params.name;
        return (
            <div>
                <div className="margin_div">
                    <h1>呃~ 想多了，周报还是要自己写的</h1>
                </div>
                <div className="content_div">
                    <Form onSubmit={this.handlerSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="本周主要进展"
                            hasFeedback
                        >
                            {getFieldDecorator('thisWeek', {
                                rules: [{required: true, message: '请填写本周主要进展!'}],
                            })(
                                <TextArea rows={6}/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="问题、风险"
                            hasFeedback
                        >
                            {getFieldDecorator('risk', {
                                rules: [{required: true, message: '请填写问题、风险!'}],
                            })(
                                <TextArea rows={6}/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="下周工作计划"
                            hasFeedback
                        >
                            {getFieldDecorator('nextWeek', {
                                rules: [{required: true, message: '请填写下周工作计划!'}],
                            })(
                                <TextArea rows={6}/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="一句话心得"
                        >
                            {getFieldDecorator('gain', {
                                initialValue: this.state.defaultGain
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" loading={this.state.wait}>提交</Button>
                        </FormItem>
                    </Form>
                </div>


            </div>
        );
    }
});

const SnippetAddForm = Form.create()(SnippetAdd);

export default SnippetAddForm;
