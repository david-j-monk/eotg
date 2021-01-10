import React, { PureComponent } from 'react';
import ReactHtmlParser from 'react-html-parser';

export class NewsItem extends PureComponent {
  render() {
    const data = this.props;
    const { title, content } = data.newsData;
    const date = new Date(data.newsData.date)

    return (
      <div className="news-item">
        <div className="news-item-title">{title}</div>
        <div className="news-item-date">{date.toLocaleString()}</div>
        <div className="news-item-content">{ReactHtmlParser(content)} </div>
      </div>
    );
  }
}

export default NewsItem;
