import React, { Component } from 'react'
import ReactDOM from 'react-dom'


class Add extends Component {
	state = {
		agreeNotChecked: true,
		authorIsEmpty: true,
		textIsEmpty: true
	};
	componentDidMount() {
		ReactDOM.findDOMNode(this.refs.author).focus();
	}
	onSubmit(e) {
		e.preventDefault();
		var author = e.target.author.value;
		var text = e.target.text.value;
		var item = [{
			author: author,
			text: text,
			bigText: 'Some text'
		}];
		window.ee.emit('News.add', item);
		e.target.text.value = '';
		this.setState({textIsEmpty: true});
	}
	onCheckRuleClick() {
		this.setState({agreeNotChecked: !this.state.agreeNotChecked});
	}
	onFieldChange(fieldName, e) {
		if (e.target.value.trim().length > 0) {
			this.setState({[''+fieldName]:false})
		} else {
			this.setState({[''+fieldName]:true})
		}
	}

	render() {
		const { agreeNotChecked, authorIsEmpty, textIsEmpty } = this.state;
		return (
			<form className="add cf" onSubmit={::this.onSubmit}>
				<input
					type="text"
					className="add__author"
					onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
					placeholder="Ваше имя"
					name="author"
					ref="author"
				/>
				<textarea
					className="add__text"
					onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
					placeholder="Текст новости"
					name="text"
				></textarea>
				<label className="add__checkrule">
					<input type="checkbox" ref="checkrule" onChange={::this.onCheckRuleClick}/>Я согласен с правилами
				</label>

				<button
					className="add__btn"
					ref="alert_button"
					disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}
				>
					Опубликовать новость
				</button>
			</form>
		);
	}
}

export default Add