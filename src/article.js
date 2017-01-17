import React, { Component, PropTypes } from 'react'

class Article extends Component {
	state = {
		visible: false
	};

	toggleBigText() {
		this.setState({visible: !this.state.visible})
	}

	render() {
		const { author, text, bigText } = this.props.data;
		const { visible } = this.state;

		let button;

		if (bigText) {
			button = (
				<button
					onClick={::this.toggleBigText}
					className={'news__readmore ' + visible}>
					{ visible ? 'Hide' : 'Show'}
				</button>
			)
		}

		return (
			<div className="article">
				{author && <p className="news__author">{author}:</p> }
				<p className="news__text">{text}</p>
				{ visible && <p className="news__big-text">{bigText}</p> }
				{ bigText && button }
			</div>
		)
	}
}

Article.propTypes = {
	data: PropTypes.shape({
		author: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		bigText: PropTypes.string.isRequired
	})
};

export default Article