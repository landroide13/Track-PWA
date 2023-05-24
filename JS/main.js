import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

import { getDistanceMt, register, cleanInput } from './functions.js';

const appSettings = {
    databaseURL: "https://cat-base-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const save = document.getElementById('save');
const getLoc = document.getElementById('getLoc')

const app = initializeApp(appSettings);
const database = getDatabase(app);
const trackAppDB = ref(database, "trackApp");

const Lat = document.getElementById('Lat');
const Lon = document.getElementById('Lon');
const nameLoc = document.getElementById('nameLoc');

const traLat = document.getElementById('traLat');
const traLon = document.getElementById('traLon'); 

const meters = document.getElementById('meters');


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
}

window.setTimeout(getLocation, 100);

window.setInterval(setData, 900);

// Firebase Functions

save.addEventListener("click", () => {

    getLocation();

    const d = new Date();

    //console.log(nameLoc.value);

    const inputLoc = {
        name: nameLoc.value,
        latitud: Number(Lat.innerHTML.valueOf()) < 0 ? -Number(Lat.innerHTML.valueOf()) : Number(Lat.innerHTML.valueOf()),
        longitud: Number(Lon.innerHTML.valueOf()),
        date: d.toDateString()
    };

    nameLoc.value = "";

    push(trackAppDB, inputLoc);
});

getLoc.addEventListener('click', () =>{

    let lt = Number(Lat.innerHTML.valueOf()) < 0 ? -Number(Lat.innerHTML.valueOf()) :  Number(Lat.innerHTML.valueOf());
    let lo = Number(Lon.innerHTML.valueOf());
    let traLt = Number(traLat.innerHTML.valueOf()) < 0 ? -Number(traLat.innerHTML.valueOf()) : Number(traLat.innerHTML.valueOf());
    let traLo = Number(traLon.innerHTML.valueOf());

    let dist = getDistanceMt(lt, lo, traLt, traLo);

    if(dist >= 0){
        meters.innerHTML = dist; 
    }else{
        meters.innerHTML = `Same Position`;
    }    
})


onValue(trackAppDB, (snapshot) => {

    if(snapshot.exists()){
        let items = Object.entries(snapshot.val());
        
        for(let i = 0; i < items.length; i++){
            let currentItem = items[i];
            let currentId = currentItem[0];
            let currentLoc = currentItem[1];
            //addItem(currentItem);
            console.log(currentLoc)
        }
    }else{
        meters.innerHTML = "Same Position";
    }
});

/*

const addItem = item => {

    let itemId = item[0];
    let itemVal = item[1];

    let newEl = document.createElement("li");
    newEl.textContent = itemVal;

    newEl.addEventListener("dblclick", () => {
        let target = ref(database, `trackApp/${itemId}`)
        remove(target);
    })

    list.append(newEl)
};

*/


//Register SW
register();







