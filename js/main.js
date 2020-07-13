// console.log("scrit linked");

let form1 = document.querySelector("#mainForm");
let mylevels = document.querySelector("#levels");
let level = "easy";
let totNumDisks = 2;
// let styleBottom = -200;

// console.log(form1);

function createDisk() {
    let newdisk = "";
    let disks = document.querySelector("#disks-tower-a");
    let totDisk = 1;
    let i = 7;

    console.log(`level: ${level} i: ${i} totNumDisks: ${totNumDisks}  styleBottom: ${styleBottom}`);

    // console.log(`i: ${i}`);
    while (totDisk <= totNumDisks) {
        newdisk = document.createElement("div");
        newdisk.id = `disk${i}`;
        newdisk.className = "disk-item";
        disks.prepend(newdisk);
        i--;
        totDisk++;
    }

}

function loadDisks() {
    console.log(`level: ${level}  totNumDisks: ${totNumDisks} `);

    let disksItems = document.querySelectorAll(".disk-item");


    //remove existing disks
    if (disksItems) {
        disksItems.forEach(diskItem => {
            diskItem.remove();
        });

    }

    switch (level) {
        case "easy":
            totNumDisks = 2;
            break;
        case "normal":
            totNumDisks = 4;
            break;
        case "hard":
            totNumDisks = 7;
            break;

    }

    createDisk();


    // disks = document.querySelectorAll("#disks-tower-a");
    // console.log(disks);
}

window.addEventListener('load', loadDisks);
class hanoi {
    constructor(level) {
        this.level = level;
        this.score = 0;
        this.moves = 0;
    }

    hanoi() {

    }
    createDisks() {

    }
    moveDisk() {
        console.log("move disk");
    }
    validateMovement() {
        console.log("validate movement ");
    }

};

function detectLevel(event) {
    event.preventDefault;
    level = event.target.value;
    loadDisks();

}
// const hanoi = new hanoi(4);
function moveDisk() {
    console.log("move disk function");
}

mylevels.addEventListener('change', detectLevel);

let myDisks = {
    tower: "",
    disks: [],
}

let towersLabel = ["a", "b", "c"];
let myDisksSelected = "";
let diskarray = [];

// myDisksSelected = document.querySelectorAll(`#disks-tower-${towersLabel[0]}`);
// console.log("my disks selected" + towersLabel[0]);
// myDisksSelected.forEach(disk => {
//     console.log("my disks CLICK -->" + disk[0]);
//     disk.addEventListener("click", moveDisk);

// });

diskarray = document.querySelectorAll(`#disks-tower-${towersLabel[0]}`);
console.log(diskarray.disk);

for (let i = 0; i < towersLabel.length; i++) {
    diskarray = document.querySelectorAll(`#disks-tower-${towersLabel[i]}`);

    diskarray.forEach(disk => {
        myDisks.tower = towersLabel[i];
        // myDisks.disks = disk.
        console.log("for each");
        // myDisks.disks = disk.
        console.log(disk);
        disk.addEventListener("click", moveDisk);

    });
}





// // let disksArray = document.querySelectorAll(".disk-item");

