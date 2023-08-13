let rows = 100;
let cols = 26;

let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont = document.querySelector(".address-row-cont");
let cellsCont = document.querySelector(".cells-cont");
let addressBar = document.querySelector(".address-bar")

//To form row from 1 to 100
for(let i=0; i<rows; i++){
    let addressCol = document.createElement("div");
    addressCol.innerText = i+1 ;
    addressCol.setAttribute('class' , 'address-col');
    addressColCont.appendChild(addressCol);
}

// To form col from A to Z
for(let i=0; i<cols; i++){
    let addressRow = document.createElement("div");
    addressRow.innerText = String.fromCharCode(65 + i);
    addressRow.setAttribute("class" , "address-row");
    addressRowCont.appendChild(addressRow);
}

//To form grid 
for(let i=0; i<rows; i++){
    let rowCont = document.createElement("div");
    rowCont.setAttribute("class" , "row-cont")
    for(let j=0; j<cols; j++){
        let cell = document.createElement("div");
        cell.setAttribute("class" , "cell");
        cell.setAttribute("contenteditable" , "true");
        cell.setAttribute("spellcheck" , "false");

        // To identify cell in storage DB and to map the UI cell with storage Db
        cell.setAttribute("rid" , i);
        cell.setAttribute("cid" , j);

        rowCont.appendChild(cell);
        addEventListenerForAddressBarDisplay(cell , i , j);
        
    }
    cellsCont.appendChild(rowCont);
}

//To display adress of cell in address bar
function addEventListenerForAddressBarDisplay(cell , i , j){
    cell.addEventListener("click" , (e)=>{
        let rowID = i + 1;
        let colID = String.fromCharCode(65 + j);
        addressBar.value = `${colID}${rowID}`
    })
}


