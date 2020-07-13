// console.log("scrit linked");

let form1 = document.querySelector("#mainForm");
let mylevels = document.querySelector("#levels");
let level = "easy";
let totNumDisks = 2;

mylevels.addEventListener('change', detectLevel);

console.log(form1);

function detectLevel(event) {
    event.preventDefault;
    level = event.target.value;
    loadDisks();

}

function loadDisks() {
    console.log(`level: ${level}  totNumDisks: ${totNumDisks} `);
    let newdisk = "";
    let disks = document.querySelector("#disks-tower-a");
    let disksItems = document.querySelectorAll(".disk-item");


    //remove existing disks
    if (disksItems) {
        disksItems.forEach(diskItem => {
            diskItem.remove();
        });

    }

    if (level === "easy") {
        // console.log("loadDisks");
        totNumDisks = 2;

        for (let i = 4; i > totNumDisks; i--) {
            console.log(`level: ${level} i: ${i} totNumDisks: ${totNumDisks} `);

            // console.log(`i: ${i}`);
            newdisk = document.createElement("div");
            newdisk.id = `disk${i}`;
            newdisk.className = "disk-item";
            disks.prepend(newdisk);
        };
    } else if (level === "normal") {
        // console.log("loadDisks");

        totNumDisks = 4;

        for (i = 4; i > 0; i--) {
            // console.log(`i: ${i}`);
            newdisk = document.createElement("div");
            newdisk.id = `disk${i}`;
            newdisk.className = "disk-item";
            disks.prepend(newdisk);
        };

    } else if (level === "hard") {

        totNumDisks = 7;

    }


    // disks = document.querySelectorAll("#disks-tower-a");
    // console.log(disks);
}

window.addEventListener('load', loadDisks);
// class hanoi {
//     constructor(diskNum) {
//         this.diskNum = [];
//     }

//     hanoi() {

//     }
//     createDisks() {

//     }
//     moveDisk() {
//         console.log("move disk");
//     }
//     validateMovement() {
//         console.log("validate movement ");
//     }

// };


// const hanoi = new hanoi(4);
// // let disksArray = document.querySelectorAll(".disk-item");

