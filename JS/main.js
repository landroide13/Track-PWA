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
      } else {
        Lat.innerHTML = "Geolocation is not supported by this browser.";
      }
}

const setData = () =>{
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(p => {
            traLt = p.coords.latitude < 0 ? (-1 * p.coords.latitude) : p.coords.latitude;
            traLo = p.coords.longitude;
            console.log(traLt, traLo);
        });
        navigator.geolocation.getCurrentPosition(p => {
            lt = p.coords.latitude < 0 ? (-1 * p.coords.latitude) : p.coords.latitude;
            lo = p.coords.longitude;
            console.log(lt, lo);
        });

        if(getDistanceMt(lt, lo, traLt, traLo) > 0){
            meters.innerHTML = getDistanceMt(lt, lo, traLt, traLo); 
            console.log("to MTS: " + getDistanceMt(lt, lo, traLt, traLo));
        }else{
            meters.innerHTML = `Same Position`;
        }
    }
}

trackLocation();

getLocation();

setInterval(setData(), 1000);











