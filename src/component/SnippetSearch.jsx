import React from 'react';
import {Tag} from 'antd';
import {hashHistory} from 'react-router';
import req from '../common/Request';
import './index.css';

require('antd/lib/tag/style');

const SnippetSearch = React.createClass({
    getInitialState() {
        return {
            items: {},
            color: 'pink,red,orange,green,cyan,blue,purple'
        };
    },
    componentWillMount() {
        const resp = req("/users", {}, "POST");
        if (resp) {
            this.setState({items: resp});
        }
    },

    handleClick(name) {
        const items = this.state.items;
        hashHistory.push('/main/' + name + "-" + items[name]);
    },
    hand() {
        hashHistory.push('/backdoor');
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
                    <a onClick={this.hand}>a</a>
                </div>
                <div className="margin_div" style={{'width': '40%', 'margin': '0 auto'}}>
                    {tags}
                </div>
            </div>
        );
    },
});

export default SnippetSearch;
