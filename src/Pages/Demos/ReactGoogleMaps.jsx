import _ from "lodash";
import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import GitHubForkRibbon from "react-github-fork-ribbon";
import Header from "../../Header";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    <Marker position={{ lat: -34.397, lng: 150.644 }} />
  </GoogleMap>
));

const enhance = _.identity;

const ReactGoogleMaps = () => [
  <Header key="header" />,
  <GitHubForkRibbon
    key="ribbon"
    href="https://github.com/tomchentw/react-google-maps"
    target="_blank"
    rel="noopener noreferrer"
    position="right"
  >
    Fork me on GitHub
  </GitHubForkRibbon>,
  <MyMapComponent key="map" />
];

export default enhance(ReactGoogleMaps);
