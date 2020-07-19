// console.log("script wire up");
//Variables
let form1 = document.querySelector("#mainForm");
let mylevels = document.querySelector("#levels");
let message = document.querySelector("#message-item");
let isDiskSelected = false;
let movesDisplay = document.querySelector("#moves");
let scoreDisplay = document.querySelector("#score");
let divDisks = document.querySelectorAll(".disk-item");
//variables to reset
let moves = 0;
let score = 0;
let level = "easy";
let diskLevel = 2;
let totNumDisks = 0;
let maxNumDisks = 0;
let currentTower = "";
let destTower = "";
let idDiskSelected = "";
let diskSelected = "";
let diskNumSelected = "";
let indexCurrentTower = 0;
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
let totDisk = "";
let towerList = "";
let messageLog = "";

function messageFnc() {
	console.log(messageLog);
}

//Function to reset variables
function resetVariables() {
	maxNumDisks = 7;
	// level = "easy";
	isDiskSelected = false;
	idDiskSelected = "";
	diskSelected = "";
	towerSelected = "";
	indexCurrentTower = 0;
	diskNumSelected = "";
	currentTower = "";
	destTower = "";
	indexA = -1;
	indexB = -1;
	indexC = -1;
	//loadMode = true;
	//idTower = 0;
	idDisk = 0;
	//diskLevel = 2;
	totNumDisks = 2;
	totDisk = 0;
	disks = "";
	oldDiskSelected = "";
}

//Function to create disks based on level
function createDisk() {
	let newdisk = "";
	let disks = document.querySelector(`#disks-tower-${destTower}`);
	//idTower = 0;
	idDisk = 0;

	messageLog = `createDisk function - level: ${level}  totNumDisks: ${totNumDisks} destTower:${destTower}`;
	messageFnc();
	console.log(event.target.value);
	//when is load activated then tower=a (idTower=0)
	//else we changed level, we need to create disks based on it. destTower(a=0, b=1, c=2)
	if (isDiskSelected) {
		//idTower = 0;
		totDisk = 0;
		totNumDisks = 1;
		messageLog = `disk selected - totDisk: ${totDisk}  totNumDisks: ${totNumDisks} destTower:${destTower}`;
		messageFnc();
		maxNumDisks = diskNumSelected;
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
		messageLog = "level:" + level;
		messageFnc();
		//assign totNumDisks  based on level  tower already has disks assigned
		if (towerDisks[idTower].length > 0) {
			idDisk = towerDisks[idTower].length;
		}
	} else if (event.target.value) {
		messageLog = "change level - level:" + level;
		messageFnc();
		switch (event.target.value) {
			case "easy":
				idTower = 0;
				diskLevel = 2;
				totNumDisks = 2;
				totDisk = 0;
				towerDisks = [[], [], []];
				break;
			case "normal":
				idTower = 0;
				diskLevel = 4;
				totDisk = 0;
				totNumDisks = 4;
				towerDisks = [[], [], []];
				break;
			case "hard":
				idTower = 0;
				diskLevel = 7;
				totDisk = 0;
				totNumDisks = 7;
				towerDisks = [[], [], []];
				break;
		}
	}
	messageLog = `idTower: ${idTower}  idDisk:${idDisk}  totDisk:${totDisk}  totNumDisks:${totNumDisks}`;
	messageFnc();

	while (totDisk < totNumDisks) {
		newdisk = document.createElement("div");
		newdisk.id = `disk${maxNumDisks}`;
		newdisk.className = "disk-item";
		disks.prepend(newdisk);

		//disksTowers[0][0] TowerA
		messageLog = `idTower: ${idTower}  idDisk:${idDisk} totDisk:${totDisk} totNumDisks:${totNumDisks}`;
		messageFnc();
		towerDisks[idTower][idDisk] = parseInt(newdisk.id.substr(-1));
		maxNumDisks--;
		totDisk++;
		idDisk++;
	}
	maxNumDisks = 7;
}

//Function to validate if we are done
function win() {
	messageLog = `win function** diskLevel: ${diskLevel}  towerDisks[1].length : ${towerDisks[1].length} towerDisks[2].length: ${towerDisks[2].length}`;
	messageFnc();
	// return false;
	if (
		towerDisks[1].length === diskLevel ||
		towerDisks[2].length === diskLevel
	) {
		return true;
	} else {
		return false;
	}
}
//Main function to load disks, we need to remove existing disks when we toggle between levels
function loadDisks() {
	//reset game
	resetGame();
	let level = document.querySelector("#levels").value;
	towerList = document.querySelectorAll(".tower-item");
	divDisks = document.querySelectorAll(".disk-item");

	//remove existing disks
	if (divDisks) {
		divDisks.forEach((diskItem) => {
			diskItem.remove();
		});
	}

	//create disks
	console.log("CreateDisk2");
	createDisk(); //currentTower:a or depends of level changed
	message.innerHTML =
		"Select a level and start playing, check rules prior to move the disks..";

	divDisks = document.querySelectorAll(".disk-item");
	//disk selected
	divDisks.forEach((disk) => {
		disk.addEventListener("click", selectDisk);
	});

	//select tower
	messageLog = `idTower: ${idTower}  idDisk:${idDisk}  totDisk:${totDisk}  totNumDisks:${totNumDisks}`;
	messageFnc();
	towerList.forEach((tower) => {
		tower.addEventListener("click", moveDisk);
	});
}

function validateDiskSize() {
	let upperDiskTowerDest = 0;

	divdisks = document.querySelectorAll(`#disks-tower-${destTower} .disk-item`);
	messageLog = `validateDiskSize function destTower:${destTower}  currentTower:${currentTower}`;
	messageFnc();

	//Tower with existing disks
	if (divdisks.length > 0) {
		upperDiskTowerDest = parseInt(divdisks[0].id.substr(-1));
		messageLog = `Comparison upperDiskTowerDest:${upperDiskTowerDest}  diskNumSelected:${diskNumSelected}`;
		messageFnc();
		console.log();
		//UpperDisk must be smaller than diskNumSelected
		if (upperDiskTowerDest >= diskNumSelected) {
			return true;
		} else {
			message.innerHTML = `Upper disk of Tower:${destTower} is smaller than disk selected, you can move to a different tower.`;
			alert(`Upper disk of Tower:${destTower} is smaller than disk selected.`);
			return false;
		}
	} else {
		if (!destTower) {
			return true;
		} else {
			//Tower without disks
			messageLog = `Tower without disks...destTower${destTower}`;
			messageFnc();
			return true;
		}
	}
}

function findCurrentTower() {
	indexCurrentTower = "";
	let i = 0;
	messageLog = ` findCurrentTower ->diskNumSelected: ${diskNumSelected}`;
	messageFnc();
	while (indexCurrentTower === "") {
		indexCurrentTower = towerDisks[i].indexOf(diskNumSelected);
		messageLog = ` findCurrentTower ->indexCurrentTower: ${indexCurrentTower}`;
		messageFnc();
		if (indexCurrentTower === -1) {
			indexCurrentTower = "";
		} else {
			indexCurrentTower = i;
			switch (indexCurrentTower) {
				case 0:
					currentTower = "a";
					break;
				case 1:
					currentTower = "b";
					break;
				case 2:
					currentTower = "c";
					break;
			}
		}
		i++;
	}
}

function selectDisk(event) {
	event.preventDefault();

	idDiskSelected = event.target.id;
	diskSelected = document.querySelector(`#${idDiskSelected}`);
	diskNumSelected = parseInt(event.target.id.substr(-1));

	//detect currentTower
	findCurrentTower();
	messageLog = `selectDisk function isDiskSelected: ${isDiskSelected} idDiskSelected": ${idDiskSelected}  currentTower:${currentTower}`;
	messageFnc();
	indexA = -1;
	indexB = -1;
	indexC = -1;

	//find index of diskNumSelected when currentTower is NULL
	if (!currentTower) {
		findCurrentTower();
	}

	//validate if is disk selected has valid size to move
	if (validateDiskSize()) {
		// if (!isDiskSelected) {
		switch (currentTower) {
			case "a":
				indexA = towerDisks[0].indexOf(diskNumSelected);
				break;
			case "b":
				indexB = towerDisks[1].indexOf(diskNumSelected);
				break;
			case "c":
				indexC = towerDisks[2].indexOf(diskNumSelected);
				break;
		}
		messageLog = `selectDisk function indexA: ${indexA} indexB": ${indexB}  indexC:${indexC}`;
		messageFnc();

		//Validate tower of disk selected and validate we are selecting upper disk from the tower, make sure we do not have a disk already selected
		if (
			(indexA !== -1 &&
				towerDisks[0][towerDisks[0].length - 1] === towerDisks[0][indexA]) ||
			(indexB !== -1 &&
				towerDisks[1][towerDisks[1].length - 1] === towerDisks[1][indexB]) ||
			(indexC !== -1 &&
				towerDisks[2][towerDisks[2].length - 1] === towerDisks[2][indexC])
		) {
			//Activate background color of the selected block
			divDisks = document.querySelectorAll(".disk-item");

			//remove border of disks
			if (divDisks) {
				divDisks.forEach((diskItem) => {
					diskItem.setAttribute("style", " border: 0px");
				});
			}

			document
				.querySelector(`#${idDiskSelected} `)
				.setAttribute("style", " border: 3px solid white");
			message.innerHTML =
				"You have selected a disk (white border), please select top of a Tower to move the disk";
			isDiskSelected = true;
		} else {
			message.innerHTML =
				"The disk you want to move is not the upper disk of the tower!";
			alert("The disk you want to move is not the upper disk of the tower!");
			isDiskSelected = false;
		}
		// }
	} else {
		message.innerHTML =
			"The disk you want to move is not the upper disk of the tower!";
		alert("The disk you want to move is not the upper disk of the tower!");
		isDiskSelected = false;
	}
}

function moveDisk() {
	destTower = event.target.id.substr(-1).toLowerCase();
	messageLog = `moveDisk Function currentTower:${currentTower} destTower:${destTower}`;
	messageFnc();
	//Prior to move a disk it has to be selected
	if (!isDiskSelected) {
		message.innerHTML = "Select a disk to move";
		alert("Select a disk to move");
	} else {
		if (currentTower !== destTower) {
			//Move disk from origin tower to dest tower,validateDiskSize functions determines if we can move a disk from one tower to another one
			//based on "No larger disk can be placed on top of a smaller disk"
			messageLog = `prior to validMovement function. maxNumDisks: ${maxNumDisks}   diskSelected:${diskSelected} idTower:${idTower}`;
			messageFnc();

			if (validateDiskSize()) {
				//moving disk
				// //Remove disk selected from origin tower
				messageLog = `Remove disk selected from origin tower: ${idTower}  currentTower:${currentTower} destTower:${destTower}`;
				messageFnc();
				maxNumDisks = diskNumSelected;
				towerDisks[indexCurrentTower].pop();
				diskSelected.remove();

				//Add child (disk selected) to destination tower selected, you can just move one disk at the time
				totNumDisks = 1;
				loadMode = false;
				console.log("CreateDisk1");
				createDisk();

				//reset variables
				resetVariables();
				moves++;

				//Display moves in the game board
				console.log(movesDisplay);
				movesDisplay.innerHTML = moves;

				message.innerHTML = ` Disk moved successfully. Moves: ${moves}`;

				//select disks
				divDisks = document.querySelectorAll(".disk-item");
				divDisks.forEach((disk) => {
					//disk selected
					disk.addEventListener("click", selectDisk);
				});

				//select tower
				towerList = document.querySelectorAll(".tower-item");
				towerList.forEach((tower) => {
					tower.addEventListener("click", moveDisk);
				});
				//Increment score if we won
				if (win()) {
					score++;
					scoreDisplay.innerHTML = score;
					message.innerHTML = ` You won!!. Score: ${score}`;
				}
				//}
			} else {
				message.innerHTML = "Select different tower to move disk selected";
				alert("Select different tower to move disk selected");
			}
		}
	}
}

function resetGame() {
	resetVariables();
	currentTower = "a";
	destTower = "a";
	towerDisks = [[], [], []];
	moves = 0;
	movesDisplay.innerHTML = moves;
	//score = 0;
	scoreDisplay.innerHTML = score;
}
//load page
window.addEventListener("load", loadDisks);

//Create disks based on  Level
mylevels.addEventListener("change", loadDisks);

//reset button
form1.addEventListener("submit", resetGame);
