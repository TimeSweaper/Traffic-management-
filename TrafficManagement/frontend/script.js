const API = "http://127.0.0.1:5000";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

let currentGreen = "north";
let latestData = null;

// ================= DRAW ROAD =================
function drawRoad(){
    ctx.fillStyle = "gray";

    // vertical road
    ctx.fillRect(350, 0 , 100, 600);

    // horizontal road
    ctx.fillRect(0,250,800,100);
}

// ================= ADD VEHICLE =================
function addVehicle(){
    const type = document.getElementById("type").value;
    const lane = document.getElementById("lane").value;
    
    fetch(API+"/add_vehicle",{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({type, lane})
    })
    .then(res=> res.json())
    .then(data=>{
        console.log("Added:",data);
    });
}

function getStartX(lane){
    if(lane === "north") return 390;
    if(lane === "south") return 410;
    if(lane === "east") return 800;
    if(lane === "west") return 0;
    return 0;
}

function getStartY(lane){
    if(lane === "north") return 0;
    if(lane === "south") return 600;
    if(lane === "east") return 290;
    if(lane === "west") return 310;
    return 0;
}

function drawVehiclesFromBackend(data){

    Object.keys(data.lanes).forEach(lane => {

        let queue = data.lanes[lane];

        queue.forEach((v, index) => {

            let x = getStartX(lane);
            let y = getStartY(lane);

            let progress = (v.pos || 0) * 5;

            if(lane === "north") y += index * 30 + progress;
            if(lane === "south") y -= index * 30 + progress;
            if(lane === "east")  x -= index * 30 + progress;
            if(lane === "west")  x += index * 30 + progress;

            ctx.fillStyle = v.type === "ambulance" ? "red" : "blue";
            ctx.fillRect(x, y, 20, 20);
        });
    });
}

function drawTrafficLight(){

    ctx.fillStyle = currentGreen === "north" ? "green" : "red";
    ctx.beginPath();
    ctx.arc(400,220,10,0,Math.PI*2);
    ctx.fill();

    ctx.fillStyle = currentGreen === "south" ? "green" : "red";
    ctx.beginPath();
    ctx.arc(400,380,10,0,Math.PI*2);
    ctx.fill();

    ctx.fillStyle = currentGreen === "east" ? "green" : "red";
    ctx.beginPath();
    ctx.arc(450,300,10,0,Math.PI*2);
    ctx.fill();


    ctx.fillStyle = currentGreen === "west" ? "green" : "red";
    ctx.beginPath();
    ctx.arc(350,300,10,0,Math.PI*2);
    ctx.fill();
}

function updateState(){
    fetch(API + "/state")
    .then(res => res.json())
    .then(data => {

        latestData = data;
        currentGreen = data.current_green;

        document.getElementById("northCount").innerText = data.lanes.north.length;
        document.getElementById("southCount").innerText = data.lanes.south.length;
        document.getElementById("eastCount").innerText = data.lanes.east.length;
        document.getElementById("westCount").innerText = data.lanes.west.length;
    });
}


function stepSimulation(){
    fetch(API + "/step");
}

function loop(){
    ctx.clearRect(0,0,canvas.width, canvas.height);

    drawRoad();
    drawTrafficLight();

    if(latestData){
        drawVehiclesFromBackend(latestData);
    }

    requestAnimationFrame(loop);
}

setInterval(()=>{
    stepSimulation();
    updateState();
}, 500); 

loop();