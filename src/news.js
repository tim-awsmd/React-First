import React from 'react'
import Article from './article'

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
		const {data} = this.props.data;
		var newsTemplate;

		if (data.length > 0) {
			newsTemplate = data.map(function(item, index) {
				return (
					<div key={index + Math.random()}>
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

export default News