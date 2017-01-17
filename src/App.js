import './App.css'
import React from 'react'
import EventEmitter from 'events'
import news from './my_news'
import Add from './add'
import News from './news'


'use strict';

window.ee = new EventEmitter();

var App = React.createClass({
	getInitialState: function() {
		return {
			news
		};
	},
	componentDidMount: function() {
		var self = this;
		window.ee.addListener('News.add', function(item) {
			var nextNews = item.concat(self.state.news);
			self.setState({news: nextNews});
		});
	},
	componentWillUnmount: function() {
		window.ee.removeListener('News.add');
	},
	render: function() {
		console.log('render');
		return (
			<div className="app">
				<Add />
				<h3>Новости</h3>
				<News data={this.state.news} />
			</div>
		);
	}
});

export default App
