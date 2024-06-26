# Delulu Tech Share: Mapbox API

## Table of Contents
- [Delulu Tech Share: Mapbox API](#delulu-tech-share-mapbox-api)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Registration](#registration)
    - [1. Create an Account](#1-create-an-account)
    - [2. Create an Access Token](#2-create-an-access-token)
  - [Map setup](#map-setup)
    - [1. Create React app](#1-create-react-app)
      - [Install Node.js and npm](#install-nodejs-and-npm)
      - [Install and create a new React app](#install-and-create-a-new-react-app)
    - [2. Set up basic map](#2-set-up-basic-map)
    - [3. Edit Map Settings](#3-edit-map-settings)
      - [1. Styles](#1-styles)
      - [2. Zoom level](#2-zoom-level)
      - [3. Center and Current Location](#3-center-and-current-location)
      - [4. Add data (how to load and visualize geographic data on the map)](#4-add-data-how-to-load-and-visualize-geographic-data-on-the-map)
        - [4.1. Add vector data from URL](#41-add-vector-data-from-url)
        - [4.2. Add vector data from GeoJSON](#42-add-vector-data-from-geojson)
        - [4.3. Add raster data](#43-add-raster-data)
  - [Examples](#examples)
      - [1. Get the coordinates of the mouse pointer](#1-get-the-coordinates-of-the-mouse-pointer)
      - [2. Display map scale](#2-display-map-scale)
      - [3. Display zoom and rotation controls](#3-display-zoom-and-rotation-controls)
    - [How to make the map interactive](#how-to-make-the-map-interactive)
      - [1. Search for places](#1-search-for-places)
      - [2. Popup windows of locations on click](#2-popup-windows-of-locations-on-click)
  - [References and Links to More Info](#references-and-links-to-more-info)

---

## Introduction
With **Mapbox**, you're not just making maps - you're creating cool stuff that people love. Whether it's an app to explore new places or a tool to help find your way around, Mapbox makes it easy. You can make your maps look exactly how you want, and it's super simple to use. So why not give it a try? Start making maps that stand out and make a difference!


---

## Registration

Before setting up our map, we need to register in Mapbox to get access token if you have not.

### 1. Create an Account

Click [here](https://www.mapbox.com/) to navigate to the website. Then, click the **sign up** button at the upper right corner:

![Mapbox Homepage](images/homepage.png)

---

### 2. Create an Access Token

Once you've signed up and verified your email, follow these steps:

1. Go to the account home page.
2. Scroll down and click on **create a token**:

![Account Home](images/accounthome.png)

---

3. Choose a name for your token and keep the token scope default.
4. Scroll down and click **create** at the end:

![Create Token](images/createkey.png)

---

5. Now you have your access token. Click the button to copy it for later use:

![Copy Token](images/copykey.png)

---

## Map setup 
### 1. Create React app
#### Install Node.js and npm
If you haven't already, download and install [Node.js](https://nodejs.org/en), which includes npm.

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

    ```js
    import React from 'react';
    import ReactDOM from 'react-dom';
    import 'mapbox-gl/dist/mapbox-gl.css'; // The stylesheet contains the Mapbox GL JS styles to display the map.
    import './index.css';
    import App from './App';

    ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
    );
    ```

2. Now navigate to `src/App.js` and add the following (see comments for details):

    ```js
    import React, { useRef, useEffect, useState } from 'react';

    // To use Mapbox GL with Create React App, you must add an exclamation point to exclude mapbox-gl from transpilation and disable the eslint rule import/no-webpack-loader-syntax
    import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

    // use the access token you gain from registration
    mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

    export default function App() {
    const mapContainer = useRef(null);
    const map = useRef(null);

    // The state stores the longitude, latitude, and zoom for the map. These values will all change as your user interacts with the map.
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


3. Then, navigate to `src/index.css` and add the following:
   
    ```css
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

4. Now we are done with implementing the basic map, before we run it, we need to install mapbox-gl if we have not:
    ``` shell
    npm install mapbox-gl
    ```

    after done installing, run the program with this line in terminal:

    ``` shell
    npm start
    ```

    Navigate to `http://localhost:3000` to see the map:

    <img src="images/basicmap.png" width="825" height="425">
    </div>


### 3. Edit Map Settings
#### 1. Styles 
To change the map style in the implemented map, modify the `style` in `src/App.js` to use the styles link provided by [Mapbox](https://docs.mapbox.com/api/maps/styles/). For instance, to switch to the satellite street style, replace it with the satellite map link:

```js
map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12', // change here
      center: [lng, lat],
      zoom: zoom
    });
```

Here we can see how the map looks like with new style:

<img src="images/mapstyle.png" width="825" height="425">
</div>


#### 2. Zoom level
Zoom levels control the extent of the world visible on a map. Mapbox offers maps across 23 zoom levels, ranging from 0 (fully zoomed out) to 22 (fully zoomed in).

Here is a reference of what users would see with different zoom levels:
| at zoom level | what you can see |
|----------|----------|
| 0 | The Earth |
| 3 | A continent |
| 4 | Large islands |
| 6 | Large rivers |
| 10 | Large roads |
| 15 | Buildings |

We can change the zoom level in `src/App.js`:
```js
const [zoom, setZoom] = useState(9); // Replace '9' with your preferred zoom level
```

#### 3. Center and Current Location 
The **center location** on a map typically refers to the geographical coordinates around which the map is centered and displayed to the user. 

We can change the map center location by changing the longitude and latitude in `src/App.js`:
```js
  const [lng, setLng] = useState(-70.9); // replace -70.9 to preferred longitude
  const [lat, setLat] = useState(42.35); // replace -42.35 to preferred latitude
```
We can also set the center location to user's **current location** by change the following code in `src/App.js`:

```js
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
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom
    });

    map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
    });

    getCurrentLocation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
```



#### 4. Add data (how to load and visualize geographic data on the map) 
The two major geographic data types are raster data and vector data. Raster data are pixel-based images (or say matrices) with geocoordinates, such as satellite imagery. Vector data are a series of coordinates based. The majority types of vector data include point, polyline, and polygon, which are usually represented by the coordinates of points on the map. 

##### 4.1. Add vector data from URL 

First, add a `map.current.on('load', () => {});` event to the body of "useEffect" in the App function in `src/App.js`. This enables loading and rendering the geographic data on the map when loading.

```js
    map.current.on('load', () => {

    });
```

Then, include the `map.current.addSource` method in the `map.current.on('load', () => {});`. Change the data property if you have a URL of geographic data. The example below is a global earthquake dataset in "point" format. 


```js     
      map.current.addSource('earthquakes', {
        type: 'geojson',
        data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
      });
```


Here is the dataset example of the earthquake geographic data asset if you open its link:
```json
{
"type": "FeatureCollection",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
"features": [
{ "type": "Feature", "properties": { "id": "ak16994521", "mag": 2.3, "time": 1507425650893, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [ -151.5129, 63.1016, 0.0 ] } },
{ "type": "Feature", "properties": { "id": "ak16994519", "mag": 1.7, "time": 1507425289659, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [ -150.4048, 63.1224, 105.5 ] } },
{ "type": "Feature", "properties": { "id": "ak16994517", "mag": 1.6, "time": 1507424832518, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [ -151.3597, 63.0781, 0.0 ] } },
{ "type": "Feature", "properties": { "id": "ci38021336", "mag": 1.42, "time": 1507423898710, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [ -118.497, 34.299667, 7.64 ] } },
......

```

<!-- ![Mapbox Earthquake Data Asset](images/dataURLexample.jpg) -->
<!-- <img src="images/dataURLexample.jpg" width="825" height="425">
</div> -->

After adding the data to the new layer, you might want to style it using the paint properties for that layer type. The paint properties link provided by [MapboxLayerStyle](https://docs.mapbox.com/style-spec/reference/layers/). The "map.current.addLayer" method below is the style settings of the data visualization. This method will also be included in the `map.current.on('load', () => {});`.

```js  
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
```
Now, you might want to zoom out to the entire earth and then you can see the visualization of the global earthquake points on the map. Here is a screenshot of the map. Each data point is represented by the red circle.

<!-- ![Mapbox Earthquake Data Visualization](images/EarthquakeVisualization.jpg) -->
<img src="images/EarthquakeVisualization.jpg" width="825" height="425">

##### 4.2. Add vector data from GeoJSON 

Replace the corresponding method above with the following two code blocks. This is a user defined GeoJSON data collection with two points. The symbol choices could be adaptive to fit into the dataset.

```js
      map.current.addSource('points', {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': [
                            {
                                // feature for Mapbox DC
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [
                                        -77.03238901390978, 38.913188059745586
                                    ]
                                },
                                'properties': {
                                    'title': 'Mapbox DC'
                                }
                            },
                            {
                                // feature for Mapbox SF
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [-122.414, 37.776]
                                },
                                'properties': {
                                    'title': 'Mapbox SF'
                                }
                            }
                        ]
                    }
                });
      // Add a symbol layer
      map.current.addLayer({
                    'id': 'points',
                    'type': 'symbol',
                    'source': 'points',
                    'layout': {
                        'icon-image': 'custom-marker',
                        // get the title name from the source's "title" property
                        'text-field': ['get', 'title'],
                        'text-font': [
                            'Open Sans Semibold',
                            'Arial Unicode MS Bold'
                        ],
                        'text-offset': [0, 1.25],
                        'text-anchor': 'top'
                    }
                });
```

##### 4.3. Add raster data

Mapbox supports self-uploaded raster data and API-based raster data. You can upload raster data to your Mapbox account in the GeoTIFF format. Please check this link for more details about the self-uploaded raster data [MapboxRaster](https://docs.mapbox.com/help/troubleshooting/uploads/#accepted-file-types-and-transfer-limits). The Mapbox Raster Tiles API also allows you to request tiles from a Mapbox-hosted raster tileset. Here is a example of Raster Tiles API query. It references the Mapbox Satellite tileset ID:
```ruby
https://api.mapbox.com/v4/mapbox.satellite/1/0/0@2x.jpg90?access_token= <UserAccessToken />
```
---
## Examples

Now that we've developed a comprehensive map, here are additional functionalities we can incorporate.

#### 1. Get the coordinates of the mouse pointer 
To retrieve the coordinates of the mouse pointer, you can utilize Mapbox GL JS events.

In `src/App.js`, add the following:

```js
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

Then, in the return section of the same file, include the following HTML element to display the coordinates:

```js
<pre id="info"></pre> 
```
<div style="text-align:center;">
<img src="images/get_the_coordinates_of_the_mouse_pointer.gif" width="450" height="350">
</div>

This code listens for the `mousemove` event on the map and displays the coordinates of the mouse pointer relative to the map container along with the corresponding longitude and latitude.

#### 2. Display map scale
To show the map scale dynamically, you can use the `ScaleControl` provided by Mapbox GL JS.

In `src/App.js`, add:

```js
map.current.addControl(new mapboxgl.ScaleControl());
```
<div style="text-align:center;">
<img src="images/display_map_scale.gif" width="450" height="300">
</div>

This snippet initializes and adds a scale control, allowing users to visualize the map scale in real-time, typically in metric or imperial units, depending on the map's zoom level.

#### 3. Display zoom and rotation controls 
To add zoom and rotation controls to your Mapbox map, you can utilize the `NavigationControl` provided by Mapbox GL JS.

Add the following code snippet to `src/App.js`:

```js
map.current.addControl(new mapboxgl.NavigationControl());
```

<div style="text-align:center;">
<img src="images/display_zoom_and_rotation_controls.gif" width="450" height="300">
</div>

These controls empower users to zoom in, zoom out, and rotate the map view, providing an intuitive way to interact with the map and customize their view as needed.

---
### How to make the map interactive

#### 1. Search for places 

A search bar is a common feature in maps and navigation. Luckily, Mapbox has a complementary search library for both web and React that we will use to implement search for our map. The React version of the library will provide us with a component that we can use to handle search.

<div style="text-align:center;">
<img src="images/searchbar.gif" width="450" height="300">
</div>

1. To start, install the search package for react using npm:

    ```
    npm install @mapbox/search-js-react
    ```

2. Then, we will update our `src/App.js` file by importing the `Geocoder` component from the newly installed package:

    ``` js
    import { Geocoder } from '@mapbox/search-js-react'
    ```

3. Next, we will integrate a Geocoder component into the returned HTML. Remember, the accessToken is necessary, and you already have it!

    ```js
    // in src/App.js

    useEffect(() => {
    ...

    map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom
        });

    ...
    }, []);

    return (
    <div>
        <div className='searchbox'>
        <form>
            <Geocoder map={map.current} value='' placeholder='Search Here' accessToken={ mapboxgl.accessToken } />
        </form>
        </div>
        <div ref={mapContainer} className="map-container" />
    </div>
    );
    ```

The `Geocoder` component also has other props that can be passed in to set its behavior. For our example, we use the `map` prop, which takes a map instance, to center the provided map to the searched location. Both `value` and `placeholder` act similarly to their uses in HTML's `input` and just set placeholder text and values. For the full list of props, click [here](https://docs.mapbox.com/mapbox-search-js/api/react/geocoding/#geocoderprops).



#### 2. Popup windows of locations on click 
This section contains **additional** information about implementing popup windows for locations, it allows a user to click on a place and show the details for a certain place or area. 

Implementing popup windows for locations requires a substantial amount of code. Due to its complexity, it is impractical to include all the code here. If you are interested in adding this functionality, you can find detailed instructions below:


1. Follow the [Part 1 tutorial](https://docs.mapbox.com/help/tutorials/add-points-pt-1/) to make a create a dataset and add points.
2. You need to customize your own map style and configure your Popup style. Follow the [Part 2 tutorial](https://docs.mapbox.com/help/tutorials/add-points-pt-2/).
3. Copy the code below and paste it into your own code of your Map initialization block.
```js
map.current.on('click', (event) => {
      // If the user clicked on one of your markers, get its information.
      const features = map.current.queryRenderedFeatures(event.point, {
        layers: ['YOUR_LAYER_NAME'] // replace with your layer name in part 1 
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
```


## References and Links to More Info
[Mapbox API documents](https://docs.mapbox.com/)  

