

const Lat = document.getElementById('Lat');
const Lon = document.getElementById('Lon');

const traLat = document.getElementById('traLat');
const traLon = document.getElementById('traLon'); 

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

trackLocation();

getLocation();















