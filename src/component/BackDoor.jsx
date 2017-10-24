import React, {Component} from 'react';
import {Table, Input, Icon, message} from 'antd';
import req from '../common/Request';
import './index.css'

const BackDoor = React.createClass({
    getInitialState() {
        return {
            columns: [{ title: 'Name', dataIndex: 'name', key: 'name' },
                { title: 'Dep', dataIndex: 'dep', key: 'dep' },
                { title: 'createGmt', dataIndex: 'createGmt', key: 'createGmt' },
                { title: 'isDelete', dataIndex: 'removed', key: 'removed', render: (t, r, i) => <span>{r.removed?'是':'否'}</span> },
                { title: 'Action', dataIndex: '', key: 'x', render: (t, r, i) => <a onClick={() => this.doDel(r.id)}>Delete</a> }
                ],
            data: [],
            searchName: ""
        }
    },
    doDel(id) {
        const resp = req('/delete/' + id, {}, 'POST');
        if (resp && resp.success) {
            message.success('删除成功！');
            this.search();
        } else {
            message.error('删除失败！');
        }
    },
    handleChange(e) {
        this.setState({searchName:e.target.value});
    },
    search() {
        const name = this.state.searchName;
        const resp = req("/list", {name}, "POST");
        if (resp) {
            resp.map((e, i) => {
                e.key = i;
            });
            this.setState({data: resp});
        }
    },
    render() {
        return (
            <div className='content_div'>
                <div>
                    <Input style={{width:'20%'}} value={this.state.searchName} onChange={this.handleChange} />
                    <Icon onClick={this.search} type="search" />
                </div>

                <Table columns={this.state.columns}
                       dataSource={this.state.data}
                />
            </div>
        );
    }
});

export default BackDoor;
