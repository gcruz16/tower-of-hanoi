// console.log("scrit linked");

let form1 = document.querySelector("#mainForm");
let mylevels = document.querySelector("#levels");
let level = "easy";
let totNumDisks = 2;
let maxNumDisks = 7;
let moves = 0;
let towerA = [maxNumDisks];
let towerB = [maxNumDisks];
let towerC = [maxNumDisks];
let currentTower = "a"

// console.log(form1);

//Function to create disks based on level
function createDisk() {
    let newdisk = "";
    let disks = document.querySelector("#disks-tower-a");
    let totDisk = 1;
    let i = 0;

    // console.log(`level: ${level} i: ${i} totNumDisks: ${totNumDisks}  `);
    while (totDisk <= totNumDisks) {
        newdisk = document.createElement("div");
        newdisk.id = `disk${maxNumDisks}`;
        newdisk.className = "disk-item";
        disks.prepend(newdisk);
        towerA[i] = parseInt(newdisk.id.substr(-1));
        // console.log("create disk-->" + parseInt(newdisk.id.substr(-1)));

        maxNumDisks--;
        totDisk++;
        i++;
    }
    maxNumDisks = 7;


}

//Main function to load disks,we need to remove existing disks when we toggle between levels and then 
function loadDisks() {
    // console.log(`level: ${level}  totNumDisks: ${totNumDisks} `);

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


mylevels.addEventListener('change', detectLevel);



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
// console.log(diskarray.disk);

// for (let i = 0; i < towersLabel.length; i++) {
// diskarray = document.querySelectorAll(`#disks-tower-${towersLabel[i]}`);

diskarray = document.querySelectorAll(`#disks-tower-a`);

function selectDisk(event) {

    event.preventDefault();
    console.log(event.target);
    let diskNameSelected = event.target.id;
    let diskNumSelected = parseInt(event.target.id.substr(-1));
    let indexA = 0;
    let indexB = 0;
    let indexC = 0;
    let divDisks = document.querySelector("#div-disks");


    switch (currentTower) {
        case "a":
            indexA = towerA.indexOf(diskNumSelected);
            indexB = -1;
            indexC = -1;
        case "b":
            indexB = towerB.indexOf(diskNumSelected);
            indexA = -1;
            indexC = -1;
        case "c":
            indexC = towerC.indexOf(diskNumSelected);
            indexA = -1;
            indexB = -1;
    }


    console.log(typeof (diskNumSelected));


    console.log('posicion donde encontro fue: ' + indexA);
    //Validate tower of disk selected and validate we are selecting upper disk from the tower
    if (((indexA !== -1) && (towerA[towerA.length - 1] === towerA[indexA])) ||
        ((indexB !== -1) && (towerB[towerB.length - 1] === towerB[indexB])) ||
        ((indexC !== -1) && (towerC[towerC.length - 1] === towerC[indexC]))) {
        console.log(`Upper Disk: ${towerA[towerA.length - 1]}  Disk selected: ${towerA[indexA]} towerA[towerA.length]: ${towerA[towerA.length - 1]}`);

        //Activate background color of the selected block
        document.querySelector(`#${diskNameSelected}`).setAttribute('style', ' border-style: solid; border-color: white');
    } else {
        alert("The disk you want to move is not the upper disk of the tower!");
    };

    //select tower where we want to move the disk, validate if is allow to move disk there
    divDisks.forEach(divdisk => {
        divdisk.addEventListener('click', moveDisk);
    });
    //if we are allow then move position of disk from tower origin tower dest


    console.log(event.target);
    // console.log(`tower selected: ${towerSelected} disk selected: ${diskSelected}`);
    // // let diskTop = document.querySelector("#disks-tower-a");
    // // console.log("diskTop" + diskTop.id);

    // moves++;
    // // while (diskSelected <= diskTop) {

    // // }

    // if(event.target)
}

diskarray.forEach(disk => {
    // myDisks.tower = towersLabel[i];
    // myDisks.disks = disk.
    // console.log("for each");
    // myDisks.disks = disk.
    // console.log(disk);
    disk.addEventListener("click", selectDisk);

});
// }





// // let disksArray = document.querySelectorAll(".disk-item");

