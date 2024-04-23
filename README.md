# Delulu Tech Share: Mapbox API

## Table of Contents
- [Delulu Tech Share: Mapbox API](#delulu-tech-share-mapbox-api)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Registration](#registration)
  - [Map setup](#map-setup)
    - [1. Create React app](#1-create-react-app)
      - [Install Node.js and npm (if you have not)  Node.js install](#install-nodejs-and-npm-if-you-have-not--nodejs-install)
      - [Install and create a new React app](#install-and-create-a-new-react-app)
    - [2. Set up basic map](#2-set-up-basic-map)
    - [Step 1. Styles (how to change the link to switch the base map style)](#step-1-styles-how-to-change-the-link-to-switch-the-base-map-style)
    - [Step 2. Zoom level introduction (what is zoom level, why does it matter, how to change it)](#step-2-zoom-level-introduction-what-is-zoom-level-why-does-it-matter-how-to-change-it)
    - [Step 3. Center Location (how to get your current location and set it as the center)](#step-3-center-location-how-to-get-your-current-location-and-set-it-as-the-center)
    - [Step 4. Add data (how to load and visualize geographic data on the map)](#step-4-add-data-how-to-load-and-visualize-geographic-data-on-the-map)
  - [Examples](#examples)
    - [How to add the basic map components you need](#how-to-add-the-basic-map-components-you-need)
      - [Get the coordinates of the mouse pointer](#get-the-coordinates-of-the-mouse-pointer)
      - [Display map scale](#display-map-scale)
      - [Display zoom and rotation controls](#display-zoom-and-rotation-controls)
    - [How to make the map interactive](#how-to-make-the-map-interactive)
      - [Search for places](#search-for-places)
      - [Popup windows of locations on click](#popup-windows-of-locations-on-click)
  - [References and Links to More Info](#references-and-links-to-more-info)



## Introduction



## Registration


## Map setup 
### 1. Create React app
#### Install Node.js and npm (if you have not)  [Node.js install](https://nodejs.org/en)  
When Node.js is downloaded, npm comes bundled with Node.js

#### Install and create a new React app
Open your terminal, copy and paste and run the following line to install Create React App globally:

 ```shell
npm install -g create-react-app
 ```

Once you have it downloaded, navigate to the directory you want to create the Map app and run the following code:

```shell
npx create-react-app mapbox-app
```

### 2. Set up basic map
1. After creating the React app, open the project folder in your code editor. Navigate to `src/index.js` and add the necessary stylesheets and Mapbox GL JS for your map:

```shell
import React from 'react';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css'; // # The stylesheet contains the Mapbox GL JS styles to display the map.
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

2. Now navigate to `src/App.js` and add the following:

``` shell
import React, { useRef, useEffect, useState } from 'react';

// # To use Mapbox GL with Create React App, you must add an exclamation point to exclude mapbox-gl from transpilation and disable the eslint rule import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

// #use the access token you gain from registration
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

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
```


3. Lastly, navigate to `src/index.css` and add the following:
   
```shell
.map-container {
  height: 100vh; /*edit here to change map size*/
}

.sidebar {
  background-color: rgb(35 55 75 / 90%);
  color: #fff;
  padding: 6px 12px;
  font-family: monospace;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  margin: 12px;
  border-radius: 4px;
}
```

need to `npm install mapbox-gl` before we run `npm start`


### Step 1. Styles (how to change the link to switch the base map style)
### Step 2. Zoom level introduction (what is zoom level, why does it matter, how to change it)
### Step 3. Center Location (how to get your current location and set it as the center)
### Step 4. Add data (how to load and visualize geographic data on the map) 

## Examples

### How to add the basic map components you need

#### Get the coordinates of the mouse pointer 
To retrieve the coordinates of the mouse pointer, you can utilize Mapbox GL JS events. The following example demonstrates how to achieve this functionality in a React application:

In the `src/App.js` file, add the following code:

```
... js code
map.current.on('mousemove', (e) => {
  document.getElementById('info').innerHTML =
    // `e.point` is the x, y coordinates of the `mousemove` event
    // relative to the top-left corner of the map.
    JSON.stringify(e.point) +
    '<br />' +
    // `e.lngLat` is the longitude, latitude geographical position of the event.
    JSON.stringify(e.lngLat.wrap());
});
```

Then, in the return section of the same file, add the following HTML element to display the coordinates:

```
<pre id="info"></pre> 
```

This code listens for the mousemove event on the map and displays the coordinates of the mouse pointer relative to the map container and the corresponding longitude and latitude geographical position on the map.

#### Display map scale
#### Display zoom and rotation controls 

### How to make the map interactive

#### Search for places 
#### Popup windows of locations on click 


## References and Links to More Info
[Mapbox API documents](https://docs.mapbox.com/)  

