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
let idTowerSelected = "";
let towerSelected = "";
let indexA = 0;
let indexB = 0;
let indexC = 0;
let disks = "";
let loadMode = true;
let message = document.querySelector("#message-item");
let isDiskSelected = false;

let towersLabel = ["a", "b", "c"];
let myDisksSelected = "";
let diskarray = [];

// console.log(form1);

//Function to create disks based on level
function createDisk() {
    console.log("createDisk function destTower: " + destTower);
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
        console.log("create disk-->" + parseInt(newdisk.id.substr(-1)));

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



// function validateMovement() {
//     event.preventDefault();
//     destId = event.target.id.substr(-1);
//     console.log(`destTower: ${destTower} currentTower:${currentTower}`);

//     divDisks.forEach(divdisk => {
//         event.preventDefault();
//         console.log(event.target);
//         divdisk.addEventListener('click', moveDisk);
//     });

// }
function validateDiskSize() {
    console.log(`**validMovement function**`);
    let upperDiskTowerDest = 0;
    divdisks = document.querySelectorAll(`#disks-tower-${destTower} .disk-item`);

    //Tower with existing disks
    if (divdisks.length > 0) {
        upperDiskTowerDest = parseInt(divdisks[divdisks.length - 1].id);
        //UpperDisk must be smaller than diskNumSelected
        if (upperDiskTowerDest < diskNumSelected) {
            console.log(`UpperDisk is smaller than diskNumSelected...upperDiskTowerDest:${upperDiskTowerDest}  diskNumSelected:${diskNumSelected}`);
            console.log(divdisks[divdisks.length - 1].id);
            return true;
        } else {
            // console.log(`UpperDisk is not smaller than diskNumSelected...upperDiskTowerDest:${upperDiskTowerDest}  diskNumSelected:${diskNumSelected}`);
            message.innerHTML = `Upper disk of Tower:${destTower} is smaller than disk selected, you can move to a different tower.`;
            return false;
        }
    } else {  //Tower without disks
        console.log(`Tower without disks...destTower${destTower}`);
        // console.log(divdisks);
        return true;
    }

    return true;
    // let upperDiskTowerDest = 0;
    // if (divdisks) {
    //     console.log(divdisks[divdisks.length - 1].id);
    //     upperDiskTowerDest = parseInt((divdisks[divdisks.length - 1].id).substr(-1));
    //     console.log(`upperDiskTowerDest:${upperDiskTowerDest}`);
    //     console.log(`Lenght greater than 0...  upperDiskTowerDest:${upperDiskTowerDest}`);
    //     return true;
    // } else {
    //     console.log("tower do not have disks");
    //     return true;
    // }



    // console.log(`validMovement....upperDiskTowerDest: ${upperDiskTowerDest}`);
    // if ((upperDiskTowerDest > diskNumSelected) || !diskarray) {
    //     return true;
    // } else {
    //     return false;
    // }


}
function findCurrentTower() {
    towersLabel.forEach(tower => {
        console.log("findCurrentTower");
        diskarray = document.querySelectorAll(`#disks-tower-${tower} `);
        console.log(`forEach tower ${diskarray}`);
        if (diskarray) {
            diskarray.forEach(disk => {
                if (disk.id === `disk${diskNumSelected}`) {
                    currentTower = tower;
                }
            });
        }
    });
}

function selectDisk(event) {

    event.preventDefault();
    console.log(`selectDisk function event.target.id: `);
    console.log(`${event.target.id} `);
    message.innerHTML = "You have selected a disk (white border). Select destination tower, where you want to move disk selected.";
    if (!isDiskSelected) {
        console.log("!isDiskSelected");
        idDiskSelected = event.target.id;
        diskSelected = document.querySelector(`#${idDiskSelected} `)
        diskNumSelected = parseInt(event.target.id.substr(-1));
        //detect currentTower
        findCurrentTower();

        //find index of diskNumSelected
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
    }
    else {
        idTowerSelected = event.target.id;
        towerSelected = document.querySelector(`#${idTowerSelected} `);
        destTower = event.target.id.substr(-1);
        console.log(`idTowerSelected: ${idTowerSelected} towerSelected: ${towerSelected} destTower: ${destTower} `);

    }

    //disks = document.querySelectorAll("#disks-tower-b");
    loadMode = false;
    console.log(`PRIOR TO IF isDiskSelected: ${isDiskSelected} currentTower: ${currentTower} destTower: ${destTower} diskNumSelected: ${diskNumSelected} idDiskSelected: ${idDiskSelected} diskSelected: ${diskSelected} diskNumSelected: ${diskNumSelected} `);

    //console.log(`indexA: ${ indexA } indexB: ${ indexB } indexC: ${ indexC } `);
    //Validate tower of disk selected and validate we are selecting upper disk from the tower, make sure we do not have a disk already selected
    if ((((indexA !== -1) && (towerA[towerA.length - 1] === towerA[indexA])) ||
        ((indexB !== -1) && (towerB[towerB.length - 1] === towerB[indexB])) ||
        ((indexC !== -1) && (towerC[towerC.length - 1] === towerC[indexC]))) && !isDiskSelected) {
        console.log(`IF Upper Disk: ${towerA[towerA.length - 1]} Disk selected: ${towerA[indexA]} `);

        //Activate background color of the selected block
        document.querySelector(`#${idDiskSelected} `).setAttribute('style', ' border-style: solid; border-color: white');
        isDiskSelected = true;
    } else if (isDiskSelected) {
        //If currentTower && destTower are different && idDiskSelected ===true
        console.log(`ELSE IF isDiskselected: + isDiskSelected currentTower: ${currentTower} destTower: ${destTower} `);
        if ((currentTower !== destTower) && (isDiskSelected)) {
            //Move disk from origin tower to dest tower
            console.log(`prior to moveDisk...diskNumSelected ${diskNumSelected}`);

            //ValidMovement functions determines if we can move a disk from one tower to another one 
            //based on "No larger disk can be placed on top of a smaller disk"
            console.log("prior to validMovement function");
            if (validateDiskSize()) {
                console.log("prior to move disk function");
                moveDisk();
            }


        }
    } else {
        message.innerHTML = "The disk you want to move is not the upper disk of the tower!";
        alert("The disk you want to move is not the upper disk of the tower!");
        console.log(`indexA: ${indexA}  indexB: ${indexB}  indexC: ${indexC}`);
    };


};

function moveDisk() {
    console.log("moving disk");
    // //Remove disk selected from origin tower
    maxNumDisks = diskNumSelected;
    diskSelected.remove();

    //Add child (disk selected) to destination tower selected, you can just move one disk at the time
    totNumDisks = 1;
    createDisk();
    //reset variables
    isDiskSelected = false;
    idDiskSelected = "";
    diskSelected = "";
    idTowerSelected = "";
    towerSelected = "";
    diskNumSelected = "";
    currentTower = "";
    destTower = "";
    indexA = 0;
    indexB = 0;
    indexC = 0;
}


// function hanoi() {
//     if (idDiskSelected > 0) {

//     }
// }
//load page
window.addEventListener('load', loadDisks);

//Create disks based on  Level
mylevels.addEventListener('change', detectLevel);


//select tower where we want to move the disk, validate if is allow to move disk there
//Validate for each tower if we clicked one of them
console.log("prior to towersLabel");
towersLabel.forEach(tower => {
    console.log("towersLabel");
    diskarray = document.querySelectorAll(`#disks-tower-${tower}`);
    console.log(`forEach tower ${diskarray}`);
    if (diskarray) {
        console.log(`diskarray TRUE #disks - tower - ${tower}`);
        diskarray.forEach(disk => {
            //disk selected
            console.log(`disk selected-- > ${disk}`);
            disk.addEventListener("click", selectDisk);

        });
    }
});

// // let disksArray = document.querySelectorAll(".disk-item");

