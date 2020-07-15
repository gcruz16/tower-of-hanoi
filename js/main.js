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
let diskLevel = 2;
let maxNumDisks = 0;
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
let towerDisks = [[], [], []];
let loadMode = true;
let idTower = 0;
let idDisk = 0;
let oldDiskSelected = "";

// console.log(form1);
//Function to reset variables
function resetVariables() {
    maxNumDisks = 7;
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
    //loadMode = true;
    idTower = 0;
    idDisk = 0;

};


//Function to create disks based on level
function createDisk(event) {
    let newdisk = "";
    let disks = document.querySelector(`#disks-tower-${destTower}`);
    let totDisk = 1;
    idTower = 0;
    idDisk = 0;

    // console.log(`CreateDisk Function level: ${level} i: ${i} totNumDisks: ${totNumDisks} destTower:${destTower}  `);

    //when is load activated then tower=a (idTower=0)
    //else we assign idTower value based on destTower(a=0, b=1, c=2)
    if (loadMode) {
        idTower = 0;

    } else {
        switch (destTower) {
            case "a":
                idTower = 0;
                break;
            case "b":
                idTower = 1;
                break;
            case "c":
                idTower = 2;
                break;
        }

        //tower already has disks assigned 
        if (towerDisks[idTower].length > 0) {
            idDisk = towerDisks[idTower].length;
        }
    }

    console.log(`idTower: ${idTower}  idDisk:${idDisk}`);
    while (totDisk <= totNumDisks) {
        newdisk = document.createElement("div");
        newdisk.id = `disk${maxNumDisks}`;
        newdisk.className = "disk-item";
        // newdisk.setAttribute("draggable", true);
        // newdisk.setAttribute("ondragstart",   "event.dataTransfer.setData("text/plain",null)")
        disks.prepend(newdisk);

        //disksTowers[0][0] TowerA
        console.log(`idTower: ${idTower}  idDisk:${idDisk} totDisk:${totDisk} totNumDisks:${totNumDisks}`)
        towerDisks[idTower][idDisk] = parseInt(newdisk.id.substr(-1));
        // console.log("create disk-->" + parseInt(newdisk.id.substr(-1)));
        maxNumDisks--;
        totDisk++;
        idDisk++;
    }
    maxNumDisks = 7;
}

//Function to validate if we are done
function win() {

    console.log(`win function** diskLevel: ${diskLevel}  towerDisks[1].length : ${towerDisks[1].length} towerDisks[2].length: ${towerDisks[2].length}`);
    // return false;
    if ((towerDisks[1].length === diskLevel) || (towerDisks[2].length === diskLevel)) {
        return true;
    } else {
        return false;
    }

}
//Main function to load disks, we need to remove existing disks when we toggle between levels and then
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
            diskLevel = 2;
            totNumDisks = 2;
            towerDisks = [[], [], []];
            break;
        case "normal":
            diskLevel = 4;
            totNumDisks = 4;
            towerDisks = [[], [], []];
            break;
        case "hard":
            diskLevel = 7;
            totNumDisks = 7;
            towerDisks = [[], [], []];
            break;

    }

    //create disks
    createDisk(); //currentTower:a
    message.innerHTML = "Select a level and start playing, check rules prior to move the disks..";

    disksItems = document.querySelectorAll(".disk-item");
    disksItems.forEach(disk => {
        //disk selected
        console.log(`disk selected-- > ${disk} isDiskSelected:${isDiskSelected}`);
        disk.addEventListener("click", selectDisk);
        disk.addEventListener("dblclick", deselectDisk);
    });

    //select tower
    let towerList = document.querySelectorAll(".tower-item");
    console.log("towerList--->");
    console.log(towerList);
    towerList.forEach(tower => {
        tower.addEventListener("mouseover", tower.setAttribute("style", "border:2px solid green; "));
        tower.addEventListener("click", moveDisk)
        tower.addEventListener("mouseout", tower.setAttribute("style", "border:0px solid gray; "));
    });
}

function detectLevel(event) {
    event.preventDefault();
    // console.log("detectLevel function");
    // console.log(event.target.value);
    level = event.target.value;
    loadDisks();

}

function validateDiskSize() {
    console.log(`**validMovement function** destTower:${destTower}`);
    let upperDiskTowerDest = 0;
    divdisks = document.querySelectorAll(`#disks-tower-${destTower} .disk-item`);

    //Tower with existing disks
    if (divdisks.length > 0) {
        upperDiskTowerDest = parseInt(divdisks[0].id.substr(-1));
        console.log(`Comparison upperDiskTowerDest:${upperDiskTowerDest}  diskNumSelected:${diskNumSelected}`);
        //UpperDisk must be smaller than diskNumSelected
        if (upperDiskTowerDest >= diskNumSelected) {
            console.log(`UpperDisk is smaller than diskNumSelected...upperDiskTowerDest:${upperDiskTowerDest}  diskNumSelected:${diskNumSelected}`);
            console.log(divdisks[0].id);
            return true;
        } else {
            // console.log(`UpperDisk is not smaller than diskNumSelected...upperDiskTowerDest:${upperDiskTowerDest}  diskNumSelected:${diskNumSelected}`);
            message.innerHTML = `Upper disk of Tower:${destTower} is smaller than disk selected, you can move to a different tower.`;
            alert(`Upper disk of Tower:${destTower} is smaller than disk selected.`);
            return false;
        }
    } else {  //Tower without disks
        console.log(`Tower without disks...destTower${destTower}`);
        // console.log(divdisks);
        return true;
    }
}
function findCurrentTower() {
    towersLabel.forEach(tower => {
        console.log("findCurrentTower...diskNumSelected:" + diskNumSelected);
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
function deselectDisk(event) {
    event.preventDefault();
    isDiskSelected = false;

}
function selectDisk(event) {

    event.preventDefault();
    console.log(`selectDisk function isDiskSelected: ${isDiskSelected} ...event.target.id: `);
    console.log(`${event.target.id} `);

    console.log("!isDiskSelected");
    idDiskSelected = event.target.id;
    console.log("SELECT DISK event.target.id-->")
    console.log(event.target.id);
    diskSelected = document.querySelector(`#${idDiskSelected}`)
    diskNumSelected = parseInt(event.target.id.substr(-1));
    //detect currentTower
    findCurrentTower();


    //validate if is disk selected has valid size to move
    if (validateDiskSize()) {
        // if (!isDiskSelected) {
        //find index of diskNumSelected
        switch (currentTower) {
            case "a":
                indexA = towerDisks[0].indexOf(diskNumSelected);
                indexB = -1;
                indexC = -1;
                break;
            case "b":
                indexB = towerDisks[1].indexOf(diskNumSelected);
                indexA = -1;
                indexC = -1;
                break;
            case "c":
                indexC = towerDisks[2].indexOf(diskNumSelected);
                indexA = -1;
                indexB = -1;
                break;

        }
        //disks = document.querySelectorAll("#disks-tower-b");
        console.log(`PRIOR TO IF isDiskSelected: ${isDiskSelected} currentTower: ${currentTower} destTower: ${destTower} diskNumSelected: ${diskNumSelected} idDiskSelected: ${idDiskSelected} diskSelected: ${diskSelected} diskNumSelected: ${diskNumSelected} `);

        //console.log(`indexA: ${ indexA } indexB: ${ indexB } indexC: ${ indexC } `);
        //Validate tower of disk selected and validate we are selecting upper disk from the tower, make sure we do not have a disk already selected
        if ((((indexA !== -1) && (towerDisks[0][towerDisks[0].length - 1] === towerDisks[0][indexA])) ||
            ((indexB !== -1) && (towerDisks[1][towerDisks[1].length - 1] === towerDisks[1][indexB])) ||
            ((indexC !== -1) && (towerDisks[2][towerDisks[2].length - 1] === towerDisks[2][indexC])))) {
            console.log(`IF Upper Disk: ${towerDisks[0][towerDisks[0].length - 1]} Disk selected: ${towerDisks[0][indexA]} `);

            //Activate background color of the selected block
            oldDiskSelected = document.querySelector(`#${idDiskSelected} `);
            oldDiskSelected.setAttribute("style", " border: 3px solid white");
            message.innerHTML = "You have selected a disk (white border), please select top of a Tower to move the disk";
            isDiskSelected = true;
        } else {
            message.innerHTML = "The disk you want to move is not the upper disk of the tower!";
            alert("The disk you want to move is not the upper disk of the tower!");
            console.log(`indexA: ${indexA}  indexB: ${indexB}  indexC: ${indexC}`);
            isDiskSelected = false;
        }
        // }
    } else {
        message.innerHTML = "The disk you want to move is not the upper disk of the tower!";
        alert("The disk you want to move is not the upper disk of the tower!");
        console.log(`indexA: ${indexA}  indexB: ${indexB}  indexC: ${indexC}`);
        isDiskSelected = false;

    }
};

function moveDisk() {
    destTower = event.target.id.substr(-1).toLowerCase();
    console.log(`moveDisk Function currentTower:${currentTower} destTower:${destTower}`)
    //Prior to move a disk it has to be selected
    if (!isDiskSelected) {
        console.log("Select a disk to move");
        message.innerHTML = "Select a disk to move";
        alert("Select a disk to move");
    } else {

        if (currentTower !== destTower) {
            //Move disk from origin tower to dest tower
            console.log(`prior to moveDisk...diskNumSelected ${diskNumSelected}`);

            //ValidMovement functions determines if we can move a disk from one tower to another one 
            //based on "No larger disk can be placed on top of a smaller disk"
            console.log("prior to validMovement function");
            if (validateDiskSize()) {
                console.log("prior to move disk function");
                //moving disk

                console.log("moving disk");
                // //Remove disk selected from origin tower
                maxNumDisks = diskNumSelected;
                towerDisks[idTower].pop()
                diskSelected.remove();

                //Add child (disk selected) to destination tower selected, you can just move one disk at the time
                totNumDisks = 1;
                loadMode = false;
                createDisk();

                //reset variables
                resetVariables();
                moves++;

                //Display moves in the game board
                console.log(movesDisplay);
                movesDisplay.innerHTML = moves;

                message.innerHTML = ` Disk moved successfully. Moves: ${moves}`;

                //select disks
                disksItems = document.querySelectorAll(".disk-item");
                disksItems.forEach(disk => {
                    //disk selected
                    console.log(`disk selected-- > ${disk} isDiskSelected:${isDiskSelected}`);
                    disk.addEventListener("click", selectDisk);

                });

                //select tower
                let towerList = document.querySelectorAll(".tower-item");
                console.log("towerList--->");
                console.log(towerList);
                towerList.forEach(tower => {
                    tower.addEventListener("click", moveDisk)

                });
                //Increment score if we won
                console.log("prior to win function");
                if (win()) {
                    score++;
                    scoreDisplay.innerHTML = score;
                    message.innerHTML = ` You won!!. Score: ${score}`;

                }

            }
        } else {
            console.log("Select different tower to move disk selected");
            message.innerHTML = "Select different tower to move disk selected";
            alert("Select different tower to move disk selected");
        }
    }

}

function resetGame() {
    console.log("reset game function");

    resetVariables();
    currentTower = "a";
    destTower = "a";
    moves = 0;
    movesDisplay.innerHTML = moves;
    //score = 0;
    scoreDisplay.innerHTML = score;

}

//load page
window.addEventListener("load", loadDisks);

//Create disks based on  Level
mylevels.addEventListener("change", detectLevel);

//reset button
form1.addEventListener("submit", resetGame);










