import React, {Component} from 'react';
import './index.css';


const HomePage = React.createClass({

    render() {
        return (
            <div className="main_frame">
                {this.props.children}
            </div>
        );
    },
});

export default HomePage;
