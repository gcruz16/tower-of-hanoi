// console.log("scrit linked");

//Variables
let form1 = document.querySelector("#mainForm");
let mylevels = document.querySelector("#levels");
let level = "easy";
let totNumDisks = 2;
let maxNumDisks = 7;
let moves = 0;
let towerA = [maxNumDisks];
let towerB = [maxNumDisks];
let towerC = [maxNumDisks];
let currentTower = "a";
let destTower = "a";
let idDiskSelected = "";
let diskSelected = "";
let diskNumSelected = "";
let indexA = 0;
let indexB = 0;
let indexC = 0;
let divDisks = document.querySelectorAll("#disks-tower-b");
let loadMode = true;
let message = document.querySelector("#message-item");



let towersLabel = ["a", "b", "c"];
let myDisksSelected = "";
let diskarray = [];

// console.log(form1);

//Function to create disks based on level
function createDisk() {
    // console.log("destTower: " + destTower);
    let newdisk = "";
    let disks = document.querySelector(`#disks-tower-${destTower}`);
    let totDisk = 1;
    let i = 0;

    // console.log(`level: ${level} i: ${i} totNumDisks: ${totNumDisks} destTower:${destTower}  `);
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
            maxNumDisks = 7;
            break;
        case "normal":
            totNumDisks = 4;
            maxNumDisks = 7;
            break;
        case "hard":
            totNumDisks = 7;
            maxNumDisks = 7;
            break;

    }

    createDisk(); //Tower a
    message.innerHTML = "Select a level and start playing, check rules prior to move the disks..";
    // disks = document.querySelectorAll("#disks-tower-a");
    // console.log(disks);
}


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
    loadMode = true;
    loadDisks();

}
// const hanoi = new hanoi(4);


// myDisksSelected = document.querySelectorAll(`#disks-tower-${towersLabel[0]}`);
// console.log("my disks selected" + towersLabel[0]);
// myDisksSelected.forEach(disk => {
//     console.log("my disks CLICK -->" + disk[0]);
//     disk.addEventListener("click", moveDisk);

// });


// console.log(diskarray.disk);

// for (let i = 0; i < towersLabel.length; i++) {
// diskarray = document.querySelectorAll(`#disks-tower-${towersLabel[i]}`);



function selectDisk(event) {

    event.preventDefault();
    console.log(event.target);
    message.innerHTML = "You have selected a disk (white border). Select destination tower, where you want to move disk selected.";

    idDiskSelected = event.target.id;
    diskSelected = document.querySelector(`#${idDiskSelected}`)
    diskNumSelected = parseInt(event.target.id.substr(-1));
    indexA = 0;
    indexB = 0;
    indexC = 0;
    divDisks = document.querySelectorAll("#disks-tower-b");
    loadMode = false;
    console.log(`currentTower: ${currentTower} diskNumSelected: ${diskNumSelected}`);
    switch (currentTower) {
        case "a":
            indexA = towerA.indexOf(diskNumSelected);
            indexB = -1;
            indexC = -1;
            break;
        case "b":
            indexB = towerB.indexOf(diskNumSelected);
            indexA = -1;
            indexC = -1;
            break;
        case "c":
            indexC = towerC.indexOf(diskNumSelected);
            indexA = -1;
            indexB = -1;
            break;
    }

    // console.log(`indexA: ${indexA}  indexB: ${indexB}  indexC: ${indexC}`);

    // console.log(typeof (diskNumSelected));


    console.log('index of disk selected: ' + indexA);
    //Validate tower of disk selected and validate we are selecting upper disk from the tower
    if (((indexA !== -1) && (towerA[towerA.length - 1] === towerA[indexA])) ||
        ((indexB !== -1) && (towerB[towerB.length - 1] === towerB[indexB])) ||
        ((indexC !== -1) && (towerC[towerC.length - 1] === towerC[indexC]))) {
        console.log(`Upper Disk: ${towerA[towerA.length - 1]}  Disk selected: ${towerA[indexA]} `);

        //Activate background color of the selected block
        document.querySelector(`#${idDiskSelected}`).setAttribute('style', ' border-style: solid; border-color: white');
        console.log("element selected!!!");
    } else {
        message.innerHTML = "The disk you want to move is not the upper disk of the tower!";
        alert("The disk you want to move is not the upper disk of the tower!");

        idDiskSelected = 0;
    };

    //select tower where we want to move the disk, validate if is allow to move disk there

    // if (currentTower !== destTower) {
    //     divDisks.forEach(divdisk => {
    //         event.preventDefault();
    //         console.log(event.target);
    //         divdisk.addEventListener('click', moveDisk);
    //     });
    // };

    // while (currentTower !== destTower) {

    // }

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


// }


// function hanoi() {
//     if (idDiskSelected > 0) {

//     }
// }
//load page
window.addEventListener('load', loadDisks);

//Create disks based on  Level
mylevels.addEventListener('change', detectLevel);

//Select a disk
// diskarray = document.querySelectorAll(`#disks-tower-a`);

// diskarray.forEach(disk => {
//     console.log(disk);

//     disk.addEventListener("click", selectDisk);

// });


function moveDisk(event) {
    event.preventDefault();
    console.log("moving disk");
    // //Remove disk selected from origin tower
    maxNumDisks = diskNumSelected;
    diskSelected.remove();

    //Add child (disk selected) to destination tower selected, you can just move one disk at the time
    totNumDisks = 1;
    createDisk();
}


function validateMovement() {
    event.preventDefault();
    destTower = event.target.id.substr(-1);
    console.log(destTower);

    console.log(`div-tower-${destTower} selected`);
    if (currentTower !== destTower) {
        divDisks.forEach(divdisk => {
            event.preventDefault();
            console.log(event.target);
            divdisk.addEventListener('click', moveDisk);
        });
    };



}

//Validate for each tower if we clicked one of them
towersLabel.forEach(tower => {
    diskarray = document.querySelectorAll(`#disks-tower-${tower}`);
    console.log(diskarray);
    if (diskarray) {
        diskarray.forEach(disk => {
            //disk selected
            disk.addEventListener("click", selectDisk);
            //validate movement of a disk, if is OK you can move disk
            disk.addEventListener('click', validateMovement);

        });
    } else {
        //Add disk to tower dest  

    }

})



// // let disksArray = document.querySelectorAll(".disk-item");

