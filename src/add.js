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
	onBtnClickHandler(e) {
		e.preventDefault();
		var textEl = ReactDOM.findDOMNode(this.refs.text);

		var author = ReactDOM.findDOMNode(this.refs.author).value;
		var text = textEl.value;

		var item = [{
			author: author,
			text: text,
			bigText: 'Some text'
		}];

		window.ee.emit('News.add', item);

		textEl.value = '';
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
}


export default Add