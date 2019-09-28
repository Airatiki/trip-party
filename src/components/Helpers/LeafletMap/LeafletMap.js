import React, { Component } from 'react';
import { Icon } from 'leaflet';
import { Map, Marker, TileLayer } from 'react-leaflet';
import PropTypes from 'prop-types';
import Icon28Place from '@vkontakte/icons/dist/28/place';
import L from 'leaflet';


import 'leaflet/dist/leaflet.css';
import './LeafletMap.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
// const defaultLIcon = {
//     iconRetinaUrl: Icon28Place,
//     iconUrl: Icon28Place,
//     shadowUrl: null,
//     iconAnchor: [30, 49],
// };

// const selectedLIcon = {
//     iconRetinaUrl: require('./marker-obs-hover.png'),
//     iconUrl: require('./marker-obs-hover.png'),
//     shadowUrl: null,
//     iconAnchor: [30, 49],
// };

class LeafletMap extends Component {
    static propTypes = {
        lat: PropTypes.string,
        lng: PropTypes.string,
        disabled: PropTypes.bool,
    };

    static defaultProps = {
        lat: '0',
        lng: '0',
        disabled: false,
    };

    render() {
        const position = [this.props.lat, this.props.lng];

        return(
            <div className="map">
                <Map
                    center={position} zoom={10}
                    maxZoom={18}
                    className='home-map'
                    dragging={this.props.disabled}
                    touchZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url={'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
                    />
                    <Marker position={position}/>
                </Map>
            </div>
        );
    }
}

export default LeafletMap;
