import { toMeters, getDistanceMt } from './functions.js';

const Lat = document.getElementById('Lat');
const Lon = document.getElementById('Lon');

const traLat = document.getElementById('traLat');
const traLon = document.getElementById('traLon'); 

const meters = document.getElementById('meters');

let lt;
let lo;
let traLt;
let traLo;

const showPosition = (position) => {
    Lat.innerHTML = position.coords.latitude;
    Lon.innerHTML = position.coords.longitude;
}

const trackPosition = (position) => {
    traLat.innerHTML = position.coords.latitude;
    traLon.innerHTML = position.coords.longitude;
}

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        Lat.innerHTML = "Geolocation is not supported by this browser.";
    }
};

const trackLocation = () =>{
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(trackPosition);
    }else{
        Lat.innerHTML = "Geolocation is not supported by this browser.";
    }
}

const setData = () =>{
    
    trackLocation();

    getLocation();

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(p => {
            traLt = p.coords.latitude < 0 ? -p.coords.latitude : p.coords.latitude;
            traLo = p.coords.longitude;
            console.log(traLt, traLo);
        });
        navigator.geolocation.getCurrentPosition(p => {
            lt = p.coords.latitude < 0 ? -p.coords.latitude : p.coords.latitude;
            lo = p.coords.longitude;
            console.log(lt, lo);
        });
    }

    let dist = getDistanceMt(lt, lo, traLt, traLo);

    if(dist >= 0){
        meters.innerHTML = dist; 
    }else{
        meters.innerHTML = `Same Position`;
    }
}

window.setInterval(setData, 900);










