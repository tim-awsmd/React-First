import React from 'react'
import ReactDOM from 'react-dom'

var Add = React.createClass({
	getInitialState: function() {
		return {
			agreeNotChecked: true,
			authorIsEmpty: true,
			textIsEmpty: true
		};
	},
	componentDidMount: function() {
		ReactDOM.findDOMNode(this.refs.author).focus();
	},
	onBtnClickHandler: function(e) {
		e.preventDefault();
		var textEl = ReactDOM.findDOMNode(this.refs.text);

		var author = ReactDOM.findDOMNode(this.refs.author).value;
		var text = textEl.value;

		var item = [{
			author: author,
			text: text,
			bigText: '...'
		}];

		window.ee.emit('News.add', item);

		textEl.value = '';
		this.setState({textIsEmpty: true});
	},
	// eslint-disable-next-line
	onCheckRuleClick: function(e) {
		this.setState({agreeNotChecked: !this.state.agreeNotChecked});
	},
	onFieldChange: function(fieldName, e) {
		if (e.target.value.trim().length > 0) {
			this.setState({[''+fieldName]:false})
		} else {
			this.setState({[''+fieldName]:true})
		}
	},
	render: function() {
		var agreeNotChecked = this.state.agreeNotChecked,
			authorIsEmpty = this.state.authorIsEmpty,
			textIsEmpty = this.state.textIsEmpty;
		return (
			<form className="add cf">
				<input
					type="text"
					className="add__author"
					onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
					placeholder="Ваше имя"
					ref="author"
				/>
				<textarea
					className="add__text"
					onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
					placeholder="Текст новости"
					ref="text"
				></textarea>
				<label className="add__checkrule">
					<input type="checkbox" ref="checkrule" onChange={this.onCheckRuleClick}/>Я согласен с правилами
				</label>

				<button
					className="add__btn"
					onClick={this.onBtnClickHandler}
					ref="alert_button"
					disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}
				>
					Опубликовать новость
				</button>
			</form>
		);
	}
});

export default Add