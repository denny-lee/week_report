import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory, IndexRoute, Route, Router} from 'react-router';

import HomePage from './component/HomePage';
import SnippetSearch from './component/SnippetSearch';
import SnippetAdd from './component/SnippetAdd';

import 'antd/dist/antd.css';
import './index.less';
import FaqAdd from "./component/FaqAdd";


ReactDOM.render(
  	<Router history={hashHistory}>
        <Route path="/" component={HomePage}>
	  		<IndexRoute component={SnippetSearch} />
	        <Route path="index" component={SnippetSearch} />
	        <Route path="main/:name" component={SnippetAdd} />
	        <Route path="done" component={FaqAdd} />
	    </Route>
    </Router>,
  	document.getElementById('root')
);
