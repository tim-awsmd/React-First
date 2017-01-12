import React from 'react'

var Article = React.createClass({
	propTypes: {
		data: React.PropTypes.shape({
			author: React.PropTypes.string.isRequired,
			text: React.PropTypes.string.isRequired,
			bigText: React.PropTypes.string.isRequired
		})
	},
	getInitialState: function() {
		return {
			visible: false
		};
	},
	readmoreClick: function(e) {
		e.preventDefault();
		this.setState({visible: true});
	},

	hideClick: function (e) {
		e.preventDefault();
		this.setState({visible: false});
	},

	render: function() {
		var author = this.props.data.author,
			text = this.props.data.text,
			bigText = this.props.data.bigText,
			visible = this.state.visible;

		// return (
		// 	<div className="article">
		// 		<p className="news__author">{author}:</p>
		// 		<p className="news__text">{text}</p>
		// 		<a href="#"
		// 			onClick={this.readmoreClick}
		// 			className={'news__readmore ' + (visible ? 'none': '')}>
		// 			Подробнее
		// 		</a>
		// 		<p className={'news__big-text ' + (visible ? '': 'none')}>{bigText}</p>
		// 	</div>
		// )


		return (
			<div className="article">
				<p className="news__author">{author}:</p>
				<p className="news__text">{text}</p>
				<button
					onClick={this.readmoreClick}
					className={'news__readmore ' + visible}>
					Подроблнее
				</button>

				<button
					onClick={this.hideClick}
					className={'news__readmore ' + visible}>
					Скрыть
				</button>

				<p className={'news__big-text ' + (visible ? '': 'none')}>{bigText}</p>
			</div>
		)
	}
});

export default Article