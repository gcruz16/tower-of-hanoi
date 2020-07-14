// console.log("script wire up");

//Variables
let form1 = document.querySelector("#mainForm");
let mylevels = document.querySelector("#levels");
let message = document.querySelector("#message-item");
let isDiskSelected = false;
let towersLabel = ["a", "b", "c"];
let diskarray = [];
let movesDisplay = document.querySelector("#moves");
let scoreDisplay = document.querySelector("#score");
//variables to reset
let moves = 0;
let score = 0;
let level = "easy";
let totNumDisks = 2;
let maxNumDisks = 0;
let towerA = [];
let towerB = [];
let towerC = [];
let currentTower = "";
let destTower = "";
let idDiskSelected = "";
let diskSelected = "";
let diskNumSelected = "";
let idTowerSelected = "";
let towerSelected = "";
let indexA = 0;
let indexB = 0;
let indexC = 0;
let disks = "";


// console.log(form1);
//Function to reset variables
function resetVariables() {

    maxNumDisks = 7;
    towerA = [maxNumDisks];
    towerB = [maxNumDisks];
    towerC = [maxNumDisks];
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


};

//Function to create disks based on level
function createDisk() {
    let newdisk = "";
    let disks = document.querySelector(`#disks-tower-${destTower}`);
    let totDisk = 1;
    let i = 0;

    console.log(`CreateDisk Function level: ${level} i: ${i} totNumDisks: ${totNumDisks} destTower:${destTower}  `);
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
    //reset variables
    resetVariables();

    //reset game
    resetGame();

    // console.log(`level: ${level}  totNumDisks: ${totNumDisks} `);
    let disksItems = document.querySelectorAll(".disk-item");

    //remove existing disks
    if (disksItems) {
        disksItems.forEach(diskItem => {
            diskItem.remove();
        });

    }

    //assign totNumDisks  based on level
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

    //create disks
    createDisk(); //currentTower:a
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
    event.preventDefault();
    console.log("detectLevel function");
    console.log(event.target.value);
    level = event.target.value;
    loadDisks();

}
// const hanoi = new hanoi(4);

function validateDiskSize() {
    console.log(`**validMovement function**`);
    let upperDiskTowerDest = 0;
    divdisks = document.querySelectorAll(`#disks-tower-${destTower} .disk-item`);

    //Tower with existing disks
    if (divdisks.length > 0) {
        upperDiskTowerDest = parseInt(divdisks[divdisks.length - 1].id);
        //UpperDisk must be smaller than diskNumSelected
        if (upperDiskTowerDest < diskNumSelected) {
            // console.log(`UpperDisk is smaller than diskNumSelected...upperDiskTowerDest:${upperDiskTowerDest}  diskNumSelected:${diskNumSelected}`);
            console.log(divdisks[divdisks.length - 1].id);
            return true;
        } else {
            // console.log(`UpperDisk is not smaller than diskNumSelected...upperDiskTowerDest:${upperDiskTowerDest}  diskNumSelected:${diskNumSelected}`);
            message.innerHTML = `Upper disk of Tower:${destTower} is smaller than disk selected, you can move to a different tower.`;
            alert(`Upper disk of Tower:${destTower} is smaller than disk selected.`);
            return false;
        }
    } else {  //Tower without disks
        // console.log(`Tower without disks...destTower${destTower}`);
        // console.log(divdisks);
        return true;
    }
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
        } else {
            if (isDiskSelected) {
                console.log("Select different tower to move disk selected");
                message.innerHTML = "Select different tower to move disk selected";
                alert("Select different tower to move disk selected");
            } else {
                console.log("select a disk");
                message.innerHTML = "Select a disk";
                alert("Select a disk");
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
    resetVariables();
    moves++;

    //Display moves in the game board
    console.log(movesDisplay);
    movesDisplay.innerHTML = moves;

    message.innerHTML = ` Disk moved successfully. Moves: ${moves}`;

}

function resetGame() {
    console.log("reset game function");

    resetVariables();
    currentTower = "a";
    destTower = "a";
    moves = 0;
    score = 0;
    movesDisplay.innerHTML = moves;
    scoreDisplay.innerHTML = score;

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

//reset button
form1.addEventListener('submit', resetGame);

