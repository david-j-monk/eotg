import React, { Component } from 'react';
import MapContainer from './MapContainer';

export class MapPage extends Component {
  state = {
    update: true,
  };

  refreshPage = () => {
    this.setState((prevState) => ({ update: !prevState.update }));
  };

  render() {
    
    return (
      <div className="map">
        <MapContainer refreshPage={this.refreshPage} />
      </div>
    );
  }
}

export default MapPage;
