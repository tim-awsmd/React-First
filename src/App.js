import './App.css'
import React from 'react'
import EventEmitter from 'events'
import news from './my_news'
import Article from './article'
import Add from './add'


'use strict';

window.ee = new EventEmitter();

// News block
var News = React.createClass({
	propTypes: {
		data: React.PropTypes.array.isRequired
	},
	getInitialState: function() {
		return {
			counter: 0
		}
	},
	render: function() {
		var data = this.props.data;
		var newsTemplate;

		if (data.length > 0) {
			newsTemplate = data.map(function(item, index) {
				return (
					<div key={index}>
						<Article data={item} />
					</div>
				)
			})
		} else {
			newsTemplate = <p>К сожалению новостей нет</p>
		}

		return (
			<div className="news">
				{newsTemplate}
				<strong
					className={'news__count ' + (data.length > 0 ? '':'none') }>Всего новостей: {data.length}</strong>
			</div>
		);
	}
});

// var Add = React.createClass({
// 	getInitialState: function() {
// 		return {
// 			agreeNotChecked: true,
// 			authorIsEmpty: true,
// 			textIsEmpty: true
// 		};
// 	},
// 	componentDidMount: function() {
// 		ReactDOM.findDOMNode(this.refs.author).focus();
// 	},
// 	onBtnClickHandler: function(e) {
// 		e.preventDefault();
// 		var textEl = ReactDOM.findDOMNode(this.refs.text);
//
// 		var author = ReactDOM.findDOMNode(this.refs.author).value;
// 		var text = textEl.value;
//
// 		var item = [{
// 			author: author,
// 			text: text,
// 			bigText: '...'
// 		}];
//
// 		window.ee.emit('News.add', item);
//
// 		textEl.value = '';
// 		this.setState({textIsEmpty: true});
// 	},
// 	// eslint-disable-next-line
// 	onCheckRuleClick: function(e) {
// 		this.setState({agreeNotChecked: !this.state.agreeNotChecked});
// 	},
// 	onFieldChange: function(fieldName, e) {
// 		if (e.target.value.trim().length > 0) {
// 			this.setState({[''+fieldName]:false})
// 		} else {
// 			this.setState({[''+fieldName]:true})
// 		}
// 	},
// 	render: function() {
// 		var agreeNotChecked = this.state.agreeNotChecked,
// 			authorIsEmpty = this.state.authorIsEmpty,
// 			textIsEmpty = this.state.textIsEmpty;
// 		return (
// 			<form className="add cf">
// 				<input
// 					type="text"
// 					className="add__author"
// 					onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
// 					placeholder="Ваше имя"
// 					ref="author"
// 				/>
// 				<textarea
// 					className="add__text"
// 					onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
// 					placeholder="Текст новости"
// 					ref="text"
// 				></textarea>
// 				<label className="add__checkrule">
// 					<input type="checkbox" ref="checkrule" onChange={this.onCheckRuleClick}/>Я согласен с правилами
// 				</label>
//
// 				<button
// 					className="add__btn"
// 					onClick={this.onBtnClickHandler}
// 					ref="alert_button"
// 					disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}
// 				>
// 					Опубликовать новость
// 				</button>
// 			</form>
// 		);
// 	}
// });

var App = React.createClass({
	getInitialState: function() {
		return {
			news: news
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
