import React, { Component } from 'react';
import { NewsItem } from './NewsItem';

const cosmos = require('./CosmosDB');

export class NewsPage extends Component {
  state = {
    newsItems: null,
    connectionIssue: false,
  };

  async componentDidMount() {
    await cosmos
      .getNews()
      .then(async (result) => this.setState({ newsItems: result }))
      .then(() => this.props.toggleButton())
      .catch(() => this.setState({ connectionIssue: true }));
  }

  renderNewsItem = () => {
    if (this.state.newsItems !== null) {
      const sortedNews = this.state.newsItems.sort((a, b) => new Date(b.newsItems.date) - new Date(a.newsItems.date))
      return sortedNews.map((e) => (
        <NewsItem key={e.newsItems.id} newsData={e.newsItems} />
      ));
    } else if (this.state.connectionIssue) {
      return (
        <div className="connection-issue">
          Having trouble connecting. <br />
          Please make sure you are connected to the internet...
        </div>
      );
    } else {
      return <div className="loading">Loading news...</div>;
    }
  };

  render() {
    return (
      <div id="news" className="main-content fade ">
        {this.renderNewsItem()}
        <div id="spacer" />
      </div>
    );
  }
}

export default NewsPage;
