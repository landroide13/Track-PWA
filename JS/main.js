

const Lat = document.getElementById('Lat');
const Lon = document.getElementById('Lon');


const getLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
        const { lat, lon } = position.coords;
        Lat.innerText = lat;
        Lon.innerText = lon;
        console.log(lat, lon);
    });
};

getLocation();















