import React from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import Geocode from 'react-geocode';
import { CSSTransition } from 'react-transition-group';
import { Search } from './Search';
import Locate from './Locate';
import '@reach/combobox/styles.css';
import mapStyles from '../styles/mapStyles';
import { ReportBox } from './ReportBox';

const cosmos = require('./CosmosDB');

const libraries = ['places'];
const mapContainerStyle = {
  position: 'absolute',
  top: '0',
  left: '0',
  height: '100%',
  width: '100%',
};
const center = {
  lat: 54.029578,
  lng: -4.153496,
};

export default function MapContainer() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [gotIssues, setGotIssues] = React.useState(false);
  const [reportBoxOpen, setReportBoxState] = React.useState(false);
  const [reportMarkerSelected, setReportMarkerSelected] = React.useState(null);
  const [reportMarker, setReportMarker] = React.useState(null);
  const [options, setOptions] = React.useState({
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    draggable: true,
  });
  const markerSize = 30;
  const mapRef = React.useRef();
  const panTo = React.useCallback(({ lat, lng }, zoomLevel) => {
    if (zoomLevel !== null) {
      mapRef.current.setZoom(zoomLevel);
    }
    mapRef.current.panTo({ lat, lng });
  }, []);
  const onMapClick = React.useCallback(
    (event) => {
      if (!reportBoxOpen) {
        setReportMarker({
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          time: new Date(),
        });
        panTo(
          {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          },
          null,
        );
        setSelected(null);
        setReportMarkerSelected(true);
        setReportBoxState(false);
        setOptions({ draggable: true });
      }
    },
    [panTo, reportBoxOpen],
  );

  const onMapLoad = React.useCallback(
    (map) => {
      mapRef.current = map;
      navigator.geolocation.getCurrentPosition((position) => {
        panTo(
          {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          18,
        );
      });
    },
    [panTo],
  );
  async function getIssues() {
    if (!gotIssues) {
      setGotIssues(true);
      setMarkers([]);
      await cosmos.getIssues().then((results) =>
        results.map((e) =>
          setMarkers((current) => [
            ...current,
            {
              id: e.issueItems.id,
              lat: e.issueItems.lat,
              lng: e.issueItems.lng,
              county: e.issueItems.county,
              time: new Date(e.issueItems.time),
              category: e.issueItems.category,
              content: e.issueItems.content,
            },
          ]),
        ),
      );
    }
  }
  async function submitReport(category, content) {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
    Geocode.fromLatLng(reportMarker.lat, reportMarker.lng).then(
      async (response) => {
        await response.results[0].address_components
          .filter((e) => e.types.includes('administrative_area_level_2'))
          .map(async (filtered) => {
            await cosmos
              .createIssueItem({
                lat: reportMarker.lat,
                lng: reportMarker.lng,
                county: filtered.long_name,
                time: new Date(),
                category,
                content,
              })
              .then(
                () => setGotIssues(false),
                getIssues(),
                setReportBoxState(false),
                setReportMarker(null),
                setOptions({ draggable: true }),
                panTo(
                  {
                    lat: mapRef.current.center.lat() - 0.00002,
                    lng: mapRef.current.center.lng(),
                  },
                  18,
                ),
              );
          });
      },
      (error) => {
        console.error(error);
      },
    );
  }

  const closeReportBox = () => {
    mapRef.current.setZoom(14);
    setSelected(null);
    setReportMarkerSelected(false);
    setReportBoxState(false);
    setReportMarker(false);
    setOptions({ draggable: true });
  };

  const openReportForm = React.useCallback(
    (report) => {
      setOptions({ draggable: false });
      setReportMarkerSelected(false);
      setReportBoxState(true);
      panTo(
        {
          lat: report.lat,
          lng: report.lng,
        },
        20,
      );
    },
    [panTo],
  );

  if (loadError) return 'Error loading Map';
  if (!isLoaded) return 'Loading Map...';

  return (
    getIssues(),
    (
      <div className="map">
        {!reportBoxOpen ? <Search panTo={panTo} /> : null}
        {!reportBoxOpen ? <Locate panTo={panTo} /> : null}

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={center}
          options={options}
          onClick={onMapClick}
          onLoad={onMapLoad}
        >
          {reportMarker ? (
            <Marker
              key={reportMarker.time + reportMarker.lat + reportMarker.lng}
              position={{ lat: reportMarker.lat, lng: reportMarker.lng }}
              animation={window.google.maps.Animation.BOUNCE}
              icon={{
                url: '/images/warning.svg',
                scaledSize: new window.google.maps.Size(markerSize, markerSize),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(
                  markerSize / 2,
                  markerSize / 2,
                ),
              }}
              onClick={() => {
                panTo(
                  {
                    lat: reportMarker.lat,
                    lng: reportMarker.lng,
                  },
                  20,
                );
              }}
            />
          ) : null}
          {reportMarkerSelected ? (
            <InfoWindow
              position={{
                lat: reportMarker.lat + 0.00002,
                lng: reportMarker.lng,
              }}
              onCloseClick={() => {
                setReportMarkerSelected(false);
                setReportMarker(null);
              }}
            >
              <div>
                Need to report an issue?
                <br />
                <button
                  type="button"
                  onClick={() => openReportForm(reportMarker)}
                >
                  Tap to open a report form
                </button>
              </div>
            </InfoWindow>
          ) : null}

          {reportBoxOpen ? (
            <div>
              <CSSTransition in appear timeout={1000} classNames="animation">
                <ReportBox
                  closeBox={closeReportBox}
                  submitReport={submitReport}
                />
              </CSSTransition>
            </div>
          ) : null}

          {markers.map((marker) => (
            <Marker
              key={marker.time + marker.lat + marker.lng}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url: '/images/warning.svg',
                scaledSize: new window.google.maps.Size(markerSize, markerSize),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(
                  markerSize / 2,
                  markerSize / 2,
                ),
              }}
              onClick={() => {
                setSelected(marker);
                setReportMarkerSelected(false);
              }}
            />
          ))}

          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onLoad={panTo(
                {
                  lat: selected.lat,
                  lng: selected.lng,
                },
                20,
              )}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div className="issue-box">
                <h3 className="issue-box-heading">{selected.category}</h3>
                <p className="issue-box-info">
                  Reported at {selected.time.toLocaleString()}
                </p>
                <p className="issue-box-content">{selected.content}</p>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
    )
  );
}
