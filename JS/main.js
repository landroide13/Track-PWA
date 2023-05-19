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
    }

    onValue(trackAppDB, (snapshot) => {

        if(snapshot.exists()){
            let items = Object.entries(snapshot.val());
            
            for(let i = 0; i < items.length; i++){
                let currentItem = items[i];
                let currentId = currentItem[0];
                let currentLoc = currentItem[1];
                //addItem(currentItem);
                //console.log(currentLoc)

                let dist = getDistanceMt(currentLoc.latitud, currentLoc.longitud, traLt, traLo);

                if(dist >= 0){
                    meters.innerHTML = dist; 
                }else{
                    meters.innerHTML = `Same Position`;
                }
            }
        }else{
            meters.innerHTML = "No items here..yet";
        }
    });
   
}

window.setInterval(setData, 900);

// Firebase Functions

save.addEventListener("click", () => {

    navigator.geolocation.getCurrentPosition(p => {
        lt = p.coords.latitude < 0 ? -p.coords.latitude : p.coords.latitude;
        lo = p.coords.longitude;
        console.log(lt, lo);
    });

    let inputLoc = {
        latitud: lt,
        longitud: lo
    }

    push(trackAppDB, inputLoc);
});

/*
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
        meters.innerHTML = "No items here..yet";
    }
});

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







