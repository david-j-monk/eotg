import React, { Component } from 'react';

import { TextField, Button, Select, MenuItem } from '@material-ui/core';

export class ReportBox extends Component {
  state = {
    selected: '',
    content: '',
    buttonDisabled: false,
  };

  render() {
    const handleSubmit = (e) => {
      e.preventDefault();
      if (this.state.selected === '') {
        alert('You must select a category!');
      } else if (this.state.content === '') {
        alert('You must provide some details on the report!');
      } else {
        this.setState({ buttonDisabled: true });
        this.props.submitReport(this.state.selected, this.state.content);
      }
    };
    return (
      <div className="report-box">
        <button
          type="button"
          className="close-button"
          onClick={this.props.closeBox}
        >
          <img className="close-button-image" src="/images/close.svg" alt="Close" />
        </button>
        <div className="rules">
          Rules:
          <br />
          Be: specific, polite, and kind.
          <br />
          Don&apos;t be: rude, accusatory, or a troll.
          <br />
          Manage your expectations.
          <br />
          Be mindful of others&apos; privacy.
        </div>
        <form className="report-box-form" onSubmit={handleSubmit}>
          <Select
            className="report-box-category"
            value={this.state.selected}
            displayEmpty
            onChange={(e) => {
              this.setState({ selected: e.target.value });
            }}
          >
            <MenuItem value="" disabled>
              Select category...
            </MenuItem>
            <MenuItem value="Abandoned vehicles">Abandoned vehicles</MenuItem>
            <MenuItem value="Bus stops">Bus stops</MenuItem>
            <MenuItem value="Car parking">Car parking</MenuItem>
            <MenuItem value="Dog fouling">Dog fouling</MenuItem>
            <MenuItem value="Flyposting">Flyposting</MenuItem>
            <MenuItem value="Flytipping">Flytipping</MenuItem>
            <MenuItem value="Graffiti">Graffiti</MenuItem>
            <MenuItem value="Parks/landscapes">Parks/landscapes</MenuItem>
            <MenuItem value="Pavements/footpaths">Pavements/footpaths</MenuItem>
            <MenuItem value="Potholes">Potholes</MenuItem>
            <MenuItem value="Public toilets">Public toilets</MenuItem>
            <MenuItem value="Road traffic">Road traffic signs</MenuItem>
            <MenuItem value="Roads/highways">Roads/highways</MenuItem>
            <MenuItem value="Rubbish (refuse and recycling)">
              Rubbish (refuse and recycling)
            </MenuItem>
            <MenuItem value="Street cleaning">Street cleaning</MenuItem>
            <MenuItem value="Street lighting">Street lighting</MenuItem>
            <MenuItem value="Street nameplates">Street nameplates</MenuItem>
            <MenuItem value="Traffic lights">Traffic lights</MenuItem>
            <MenuItem value="Trees">Trees</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
          <br />
          <TextField
            className="content"
            onChange={(e) => this.setState({ content: e.target.value })}
            multiline
            placeholder="Now please describe the problem."
          />
          <Button
            className="submit"
            disabled={this.state.buttonDisabled}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default ReportBox;
