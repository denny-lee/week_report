import React from 'react';
import {Tag} from 'antd';
import {hashHistory} from 'react-router';
import './index.css';

require('antd/lib/tag/style');

const SnippetSearch = React.createClass({
    getInitialState() {
        return {
            items: {'李巍': '服务端', '李智': '服务端', '张小雨': '无线端', '陈亚丽': '测试'},
            color: 'pink,red,orange,green,cyan,blue,purple'
        };
    },

    handleClick(name) {
        console.log(this.state.items[name]);
        const items = this.items;
        hashHistory.push('/main/' + name);
        // window.location = '#/main';
    },
    render() {
        const color = this.state.color.split(',');
        const tags = [];
        Object.keys(this.state.items).forEach((e, i, a) => {
            tags.push(<Tag key={i} style={{
                lineHeight: '48px',
                height: '50px',
                fontSize: '40px'
            }} color={color[i]} onClick={() => this.handleClick(e)}>{e}</Tag>);
        });
        return (
            <div>
                <div className="margin_div">
                    <h1>HI~ 辛苦了一周，点击自己的名字生成周报吧</h1>
                </div>
                <div className="margin_div" style={{'width': '40%','margin': '0 auto'}}>
                    {tags}
                </div>
            </div>
        );
    },
});

export default SnippetSearch;
