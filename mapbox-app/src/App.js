import React, { useRef, useEffect, useState } from 'react';

// # To use Mapbox GL with Create React App, you must add an exclamation point to exclude mapbox-gl from transpilation and disable the eslint rule import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

// #use the access token you gain from registration
mapboxgl.accessToken = 'pk.eyJ1IjoianlrMTk5OTEyMjIiLCJhIjoiY2x0M2FqODhkMWdhZzJscDhsNnlzYTFyaCJ9.eSPui_SEdaclP0xtujBzvw';

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  // # The state stores the longitude, latitude, and zoom for the map. These values will all change as your user interacts with the map.
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}