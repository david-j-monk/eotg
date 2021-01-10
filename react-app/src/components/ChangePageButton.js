import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export class ChangePageButton extends Component {
  render() {
    return (
        <div>
          {this.props.onNewsPage ? (
            <Button
              id="button"
              variant="contained"
              color="primary"
              onClick={this.props.changePage}
            >
              Click to
              <br />
              Report
            </Button>
          ) : (
            <Button
              id="button"
              variant="contained"
              onClick={this.props.changePage}
            >
              Back to
              <br />
              News
            </Button>
          )}
        </div>
    );
  }
}

export default ChangePageButton;
