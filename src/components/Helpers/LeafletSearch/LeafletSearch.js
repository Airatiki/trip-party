import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import {Map, TileLayer} from 'react-leaflet';
import L from 'leaflet';
import * as ELG from 'esri-leaflet-geocoder';
import 'leaflet/dist/leaflet.css';
import './LeafletSearch.css';


class LeafletSearch extends Component {
    static propTypes = {
        defaultLatLng: PropTypes.shape({
            lat: PropTypes.string,
            lng: PropTypes.string,
        }).isRequired,
        onChange: PropTypes.func.isRequired,
    };

    mapRef = React.createRef();

    componentDidMount() {
        const map = this.mapRef.current.leafletElement;
        const searchControl = new ELG.Geosearch().addTo(map);
        const results = new L.LayerGroup().addTo(map);

        searchControl.on('results', function (data) {
            this.props && this.props.onChange({
                lat: `${data.latlng.lat}`,
                lng: `${data.latlng.lng}`,
            });
            results.clearLayers();
            for (let i = data.results.length - 1; i >= 0; i--) {
                results.addLayer(L.marker(data.results[i].latlng));
            }
        });

        const elem = document.getElementsByClassName('geocoder-control-input')[0];
        elem.placeholder = 'Выберите место';
        elem.addEventListener('focus', function() {
            elem.placeholder = 'Выберите место';
        });

        const suggestions = document.getElementsByClassName('geocoder-control-suggestions')[0];

        elem.addEventListener('keydown', function() {
            suggestions.childNodes.forEach((child) =>{
                console.log(child.classList);
            });
        });
    }

    render() {
        const center = [
            parseInt(this.props.defaultLatLng.lat, 10),
            parseInt(this.props.defaultLatLng.lng, 10),
        ];

        return (
            <Map
                center={center}
                zoom="10"
                ref={this.mapRef}>
                dragging={this.props.disabled}
                touchZoom={true}
                <TileLayer
                    attribution="&amp;copy Google"
                    url={'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'} />
                <div className='pointer'/>
            </Map>
        );
    }
}

export default LeafletSearch;
