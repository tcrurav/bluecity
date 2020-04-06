# Contact

Contact is now an example of use of react-leaflet

## Getting Started

Download links:

SSH clone URL: ssh://git@git.jetbrains.space/elrincon/BlueCity.git

HTTPS clone URL: https://git.jetbrains.space/elrincon/BlueCity.git

## Prerequisites

I would start taking a look to the links in the Resources section below to start with react-leaflet.

## Deployment

It's important to follow the steps:
1. Add the css to your index.html in your React project.

```
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
    crossorigin="" />
```

2. Install the react-leaflet package.

```
npm install react-leaflet
npm install leaflet
```

3. Add the import you need in the components where you use react-leaflet.

```
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
```

4. You need the following styles for your component so that your map has the right size.

```
.leaflet-container {
    width: 100%;
    height: 100vh;
  }
```

5. import the preceding css file in your component.

```
import "./contact.css";
```

## Resources

* [react-leaflet](https://react-leaflet.js.org/) - React components for 🍃 Leaflet maps
* [How to use React-Leaflet](https://blog.logrocket.com/how-to-use-react-leaflet/) - How to use React-Leaflet
* [leaflet](https://leafletjs.com/) - an open-source JavaScript library
for mobile-friendly interactive maps
