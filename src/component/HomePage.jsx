import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


const HomePage = React.createClass({
  
  render() {
    return (
      <div>
        <div>
          <Menu mode="horizontal"
          >
            <SubMenu title={<span><Icon type="code" />代码段</span>}>
                <Menu.Item><a href="#/add-snippet"><Icon type="plus" />新增代码段</a></Menu.Item>
                <Menu.Item><a href="#/search-snippet"><Icon type="search" />查询代码段</a></Menu.Item>
            </SubMenu>
            <SubMenu title={<span><Icon type="question-circle-o" />FAQ</span>}>
                <Menu.Item><a href="#/add-faq"><Icon type="plus" />新增FAQ</a></Menu.Item>
                <Menu.Item><a href="#/search-faq"><Icon type="search" />查询FAQ</a></Menu.Item>
            </SubMenu>
            <SubMenu title={<span><Icon type="share-alt" />常见概念</span>}>
                <Menu.Item><a href="#/add-notion"><Icon type="plus" />新增常见概念</a></Menu.Item>
                <Menu.Item><a href="#/search-notion"><Icon type="search" />查询常见概念</a></Menu.Item>
            </SubMenu>
            <SubMenu title={<span><Icon type="credit-card" />框架搭建</span>}>
                <Menu.Item><a href="#/add-notice"><Icon type="plus" />新增注意事项</a></Menu.Item>
                <Menu.Item><a href="#/search-notice"><Icon type="search" />查询注意事项</a></Menu.Item>
            </SubMenu>
            <Menu.Item><a href="#/my-tags"><Icon type="tag" />标签库</a></Menu.Item>
          </Menu>
        </div>
        <div>{this.props.children}</div>
      </div>
    );
  },
});

export default HomePage;
