// Storage
let collectedSheetDB = []; //Contain all sheetDB
let sheetDB = [];

{
    let addSheetBtn = document.querySelector(".sheet-add-icon");
    addSheetBtn.click();
    handleSheetProperties();
}

// for(let i=0; i<rows; i++){
//     let sheetRow = [];
//     for(let j=0; j<cols; j++){
//         let cellProp = {
//             bold : false,
//             italic : false,
//             underline: false,
//             alignment : "left",
//             fontFamily : "monospace",
//             fontSize : "14",
//             fontColor : "#000000",
//             BGColor : "#000000",
//             value : "",
//             formula : "",
//             children : [],
//         }
//         sheetRow.push(cellProp)
//     }
//     sheetDB.push(sheetRow);
// }

// Selectors for selecting Cell Properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontFamily = document.querySelector(".font-family-prop");
let fontSize = document.querySelector(".font-size-prop");
let fontColor =  document.querySelector(".font-color-prop");
let BGColor = document.querySelector(".BGColor-prop");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";

// Application of two way binding
// Attach Property Listeners
bold.addEventListener("click" , (e)=>{
    let address = addressBar.value;
    let [cell , cellProp] = getCellAndCellProp(address);

    // Modifications
    cellProp.bold = !cellProp.bold; //Change in storage DB
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal" ; //UI change (Phase 1) 
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp ; //UI change (Phase 2)
})
italic.addEventListener("click" , (e)=>{
    let address = addressBar.value;
    let [cell , cellProp] = getCellAndCellProp(address);

    // Modifications
    cellProp.italic = !cellProp.italic; //Change in storage DB
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal" ; //UI change (Phase 1) 
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp ; //UI change (Phase 2)
})
underline.addEventListener("click" , (e)=>{
    let address = addressBar.value;
    let [cell , cellProp] = getCellAndCellProp(address);

    // Modifications
    cellProp.underline = !cellProp.underline; //Change in storage DB
    cell.style.textDecoration = cellProp.underline ? "underline" : "none" ; //UI change (Phase 1) 
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp ; //UI change (Phase 2)
})
fontSize.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.fontSize = fontSize.value; // Data change
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
})
fontFamily.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.fontFamily = fontFamily.value; // Data change
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
})
fontColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.fontColor = fontColor.value; // Data change
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
})
BGColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.BGColor = BGColor.value; // Data change
    cell.style.backgroundColor = cellProp.BGColor;
    BGColor.value = cellProp.BGColor;
})

alignment.forEach((alignElem)=>{
    alignElem.addEventListener( "click" , (e)=>{
        let address = addressBar.value;
        let [cell, cellProp] = getCellAndCellProp(address);

        let alignValue = e.target.classList[0]; 
        cellProp.alignment = alignValue; // Data Change
        cell.style.textAlign = cellProp.alignment; // UI change Phase-1

        switch(alignValue){
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right" :
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }
    })
})

let allCells = document.querySelectorAll(".cell");
for(let i=0; i<allCells.length; i++){
    addListenerToAttachCellProperties(allCells[i]);
}

function addListenerToAttachCellProperties(cell){
    cell.addEventListener("click" , (e)=>{

        let address = addressBar.value;
        let [rid , cid] = decodeRIDCIDFromAddress(address) ;
        let cellProp = sheetDB[rid][cid];        

        // Apply properties to UI prop of cell
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal" ;
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal" ;
        cell.style.textDecoration = cellProp.underline ? "underline" : "none" ;
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGColor === "#000000" ? "transparent" : cellProp.BGColor;
        cell.style.textAlign = cellProp.alignment;

        // Apply properties to Ui prop container
        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp ;
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp ;
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp ;
        fontSize.value = cellProp.fontSize;
        fontColor.value = cellProp.fontColor;
        BGColor.value = cellProp.BGColor;
        switch(cellProp.alignment){
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right" :
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }

        let formulaBar = document.querySelector(".formula-bar");
        formulaBar.value = cellProp.formula;
        cell.innerText = cellProp.value;

    })
}


function getCellAndCellProp(address){
    let [rid , cid] = decodeRIDCIDFromAddress(address);
    let cell = document.querySelector(`.cell[rid = "${rid}"][cid = "${cid}"]`);
    let cellProp = sheetDB[rid][cid];

    return[cell , cellProp];
}

function decodeRIDCIDFromAddress(address){
    // address -> A1
    let rid = Number(address.slice(1) - 1);
    let cid = Number(address.charCodeAt(0)) - 65;

    return [rid , cid]; 
}

