import React, { useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  marginTop: 0,
  width: "90%",
  height: "500px", // Adjust height as needed
  // Centers the map horizontally
};
const defaultCenter = {
  lat: 9.0302, // Addis Ababa Latitude
  lng: 38.7408, // Addis Ababa Longitude
};

const GoogleMapViewer = () => {
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  const handleMapDragEnd = (map) => {
    const newCenter = {
      lat: map.getCenter().lat(),
      lng: map.getCenter().lng(),
    };
    setMapCenter(newCenter);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyC2SvXYuARfTATUjQzg3GUIIEbth2kDYH4">
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <p>
          If you're unsure about the street name where you lost or found an
          item, use the map to find it and copy the location manually.
        </p>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={12}
        onDragEnd={(event) => handleMapDragEnd(event)}
      >
        {/* No markers or input fields, just a map for reference */}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapViewer;
