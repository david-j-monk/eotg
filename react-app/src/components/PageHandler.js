import React, { Component } from 'react';
import { ChangePageButton } from './ChangePageButton';
import { MapPage } from './MapPage';
import { NewsPage } from './NewsPage';

export class PageHandler extends Component {
  state = { onNewsPage: true, buttonHidden: true };
  changePage = () => {
    this.setState((prevState) => ({ onNewsPage: !prevState.onNewsPage }));
  };
  toggleButton = () => {
    if (this.state.buttonHidden) {
      this.setState({ buttonHidden: false });
    }
  };
  render() {
    const { onNewsPage } = this.state;
    const { buttonHidden } = this.state;
    return (
      <div id="PageHandler">
        <div className="header">
        <div id="title">Eyes on the Ground</div>
          {this.state.onNewsPage ? (
            <div id="tagline">Helping your council help {process.env.APPINSIGHTS_INSTRUMENTATIONKEY}</div>
          ) : null}
        </div>
        {onNewsPage ? (
          <NewsPage toggleButton={this.toggleButton} />
        ) : (
          <MapPage />
        )}
        {!buttonHidden ? (
          <ChangePageButton
            onNewsPage={onNewsPage}
            changePage={this.changePage}
          />
        ) : null}
      </div>
    );
  }
}

export default PageHandler;
