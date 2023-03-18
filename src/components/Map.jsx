import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl';
import MapStylesData from '../data/mapstyles.json';
import Cuboid from './Cuboid';

mapboxgl.accessToken = import.meta.env.REACT_APP_MAPBOX_TOKEN;

const Map = () => {

    const MapContainerRef = useRef();
    const [longitude, setLongitude] = useState(75.82);
    const [latitude, setLatitude] = useState(26.93);
    const [zoom, setZoom] = useState(16);
    const [center, setCenter] = useState([longitude, latitude]);
    const [mapStyles, setMapStyles] = useState(MapStylesData[0]['Default']);
    const [image, setImage] = useState(null);
    const [showCuboid, setShowCuboid] = useState(false);
    const width = window.innerWidth;
    const height = window.innerHeight;

    const findLocation = () => {
        setCenter([longitude, latitude]);
    }

    useEffect(() => {
        let map;
        if (MapContainerRef.current) {
            map = new mapboxgl.Map({
                container: MapContainerRef.current,
                style: mapStyles,
                center: center,
                zoom: 16,
            });

            map.on("move", () => {
                setLongitude(map.getCenter().lng.toFixed(4));
                setLatitude(map.getCenter().lat.toFixed(4));
                setZoom(map.getZoom().toFixed(2));
            });
        }

        return () => map.remove();
    }, [mapStyles, center, showCuboid]);


    useEffect(() => {
        setImage(
            `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${longitude},${latitude},${zoom},0/${width}x${height}?access_token=${mapboxgl.accessToken}`
        );
    }, [longitude, latitude, width, height, zoom]);
    return (
        <>
            {
                !showCuboid &&
                <div className='header'>
                    <div className="user-inputs">
                        <div className='input-group'>
                            <label htmlFor="Longitude">Longitude</label>
                            <input type="text" name='lan' value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder='-74.5' />
                        </div>
                        <div className='input-group'>
                            <label htmlFor="Latitude">Latitude</label>
                            <input type="text" name='Latitude' value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder='40' />
                        </div>
                        <div className='button'>
                            <button onClick={findLocation}>Find</button>
                        </div>
                    </div>
                    <hr />
                    <div className="map-settings">
                        <p className='setting-title'>Map style</p>
                        <select name="mapStyle" id="map-style" onChange={(e) => setMapStyles(e.target.value)}>
                            {
                                MapStylesData.map((map, index) => {
                                    let keys = Object.keys(map);
                                    let values = Object.values(map);
                                    return <option value={values[0]} key={index + keys[0]}>{keys[0]}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
            }
            {
                <div className="map" style={{ width: !showCuboid ? "100%" : "0px", height: !showCuboid ? "100vh" : "0px" }} ref={MapContainerRef}>
                </div>
            }

            {
                image && showCuboid &&
                <Cuboid textureUrl={image} />
            }

            <div className='button-3d'>
                <button onClick={() => setShowCuboid(!showCuboid)}>
                    {showCuboid ? "Hide 3D cuboid" : "Show 3D cuboid"}
                </button>
            </div>

        </>
    )
}

export default Map