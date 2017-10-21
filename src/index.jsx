import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory} from 'react-router';

import HomePage from './component/HomePage';
import SnippetSearch from './component/SnippetSearch';
import SnippetAdd from './component/SnippetAdd';
import FaqSearch from './component/FaqSearch';
import FaqAdd from './component/FaqAdd';
import NotionSearch from './component/NotionSearch';
import NotionAdd from './component/NotionAdd';
import NoticeSearch from './component/SnippetSearch';
import NoticeAdd from './component/NoticeAdd';
import TodoTags from './component/TodoTags';

import 'antd/dist/antd.css';
import './index.less';


ReactDOM.render(
  	<Router history={hashHistory}>
        <Route path="/" component={HomePage}>
	  		<IndexRoute component={SnippetSearch} />
	        <Route path="search-snippet" component={SnippetSearch} />
	        <Route path="add-snippet" component={SnippetAdd} />
	        <Route path="search-faq" component={FaqSearch} />
	        <Route path="add-faq" component={FaqAdd} />
	        <Route path="search-notion" component={NotionSearch} />
	        <Route path="add-notion" component={NotionAdd} />
	        <Route path="search-notice" component={NoticeSearch} />
	        <Route path="add-notice" component={NoticeAdd} />
	        <Route path="my-tags" component={TodoTags} />
	    </Route>
    </Router>,
  	document.getElementById('root')
);
