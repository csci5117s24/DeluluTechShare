// import React, { useRef, useEffect, useState } from 'react';

// // # To use Mapbox GL with Create React App, you must add an exclamation point to exclude mapbox-gl from transpilation and disable the eslint rule import/no-webpack-loader-syntax
// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

// // #use the access token you gain from registration
// mapboxgl.accessToken = 'pk.eyJ1IjoianlrMTk5OTEyMjIiLCJhIjoiY2x0M2FqODhkMWdhZzJscDhsNnlzYTFyaCJ9.eSPui_SEdaclP0xtujBzvw';

// export default function App() {
//   const mapContainer = useRef(null);
//   const map = useRef(null);

//   // # The state stores the longitude, latitude, and zoom for the map. These values will all change as your user interacts with the map.
//   const [lng, setLng] = useState(-70.9);
//   const [lat, setLat] = useState(42.35);
//   const [zoom, setZoom] = useState(9);

//   useEffect(() => {
//     if (map.current) return; // initialize map only once
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: 'mapbox://styles/mapbox/streets-v12',
//       center: [lng, lat],
//       zoom: zoom
//     });

//     map.current.on('move', () => {
//       setLng(map.current.getCenter().lng.toFixed(4));
//       setLat(map.current.getCenter().lat.toFixed(4));
//       setZoom(map.current.getZoom().toFixed(2));
//     });

//     // Get coordinates of the mouse pointer
//     map.current.on('mousemove', (e) => {
//       document.getElementById('info').innerHTML =
//         // `e.point` is the x, y coordinates of the `mousemove` event
//         // relative to the top-left corner of the map.
//         JSON.stringify(e.point) +
//         '<br />' +
//         // `e.lngLat` is the longitude, latitude geographical position of the event.
//         JSON.stringify(e.lngLat.wrap());
//     });

//     // Add a scale control to the map
//     map.current.addControl(new mapboxgl.ScaleControl());

//     // Add zoom and rotation controls to the map.
//     map.current.addControl(new mapboxgl.NavigationControl());

//   });

//   return (
//     <div>
//       <div className="sidebar">
//         Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
//         <pre id="info"></pre> {/* The coordinates of the mouse pointer */}
//       </div>
//       <div ref={mapContainer} className="map-container" />
//     </div>
//   );
// }



// basic map: style, zoom, center current location
import React, { useRef, useEffect, useState } from 'react';
import { Geocoder } from '@mapbox/search-js-react'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoieGlhbzAyNjEiLCJhIjoiY2x2ZTMwamd5MDVnZzJrbjEydDlhcHY2MyJ9.S1KPQNcqgcoJckWvb5o76g';

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return;

    // Add this function to get current location
    const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { longitude, latitude } = position.coords;
        setLng(longitude);
        setLat(latitude);
        map.current.setCenter([longitude, latitude]);
      });
    };

    map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/xiao0261/clvfkua2x028o01qlb78c6359',
        
        center: [lng, lat],
        zoom: zoom
    });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on('click', (event) => {
      // If the user clicked on one of your markers, get its information.
      const features = map.current.queryRenderedFeatures(event.point, {
        layers: ['chicago-parks'] // replace with your layer name
      });
      if (!features.length) {
        return;
      }
      const feature = features[0];
      const popup = new mapboxgl.Popup({ offset: [0, -15] })
      .setLngLat(feature.geometry.coordinates)
      .setHTML(
        `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
      )
      .addTo(map.current);
    });
    getCurrentLocation();

    map.current.on('load', () => {
      map.current.addSource('earthquakes', {
        type: 'geojson',
        // Use a URL for the value for the data property.
        data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
      });

      map.current.addLayer({
        'id': 'earthquakes-layer',
        'type': 'circle',
        'source': 'earthquakes',
        'paint': {
          'circle-radius': 4,
          'circle-stroke-width': 2,
          'circle-color': 'red',
          'circle-stroke-color': 'white'
        }
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div className='searchbox'>
        <form>
          <Geocoder map={map.current} value='' placeholder='Search Here' accessToken={ mapboxgl.accessToken } />
        </form>
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}