import React, {Component} from 'react';
import {Table, Input, Icon, message} from 'antd';
import req from '../common/Request';
import './index.css'

const BackDoor = React.createClass({
    getInitialState() {
        return {
            columns: [{ title: 'Name', dataIndex: 'name', key: 'name' },
                { title: 'Dep', dataIndex: 'dep', key: 'dep' },
                { title: 'createGmt', dataIndex: 'date', key: 'address' },
                { title: 'isDelete', dataIndex: 'isDelete', key: 'isDelete' },
                { title: 'Action', dataIndex: '', key: 'x', render: (t, r, i) => <a href={"/delete/"+r.id}>Delete</a> }
                ],
            data: [],
            searchName: ""
        }
    },
    componentWillMount() {
        /*const resp = req("/list", {name}, "POST");
        if (resp) {
            this.setState({list: resp});
        }*/
    },
    handleChange(v) {
        this.setState({searchName:v});
    },
    search() {
        const name = this.state.searchName;
        const resp = req("/list", {name}, "POST");
        if (resp) {
            const data = resp.map((e, i) => {
                e.key = i;
            });
            this.setState({data});
        }
    },
    render() {
        return (
            <div className='content_div'>
                <Input value={this.state.searchName} onChange={this.handleChange} />
                <Icon onClick={this.search} />
                <Table columns={columns}
                       dataSource={data}
                />
            </div>
        );
    }
});

export default BackDoor;
