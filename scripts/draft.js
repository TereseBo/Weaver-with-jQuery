
//Functions for greating draft

function createGrid(x = 4, y = 4, id = "grid") {//Skapar ett table-element med x antal rader och y antal kolumner och id id.
    console.log("createGrid");

    $(`#content`).append(`<div id="${id}-wrapper" class="grid"></div>`);

    for (let i = 0; i < y; i++) {
        $(`#${id}-wrapper`).append(`<div class="row" id="row-${i}"></div>`);
        for (let j = 0; j < x; j++) {
            $(`#${id}-wrapper`).find(`#row-${i}`).append(`<div class="cell" id="${id}-${i}-${j}"></div>`)
            let cellId = `#${id}-${i}-${j}`;

            onClickfunctionPicker(id, cellId);
        }
    }
}
function onClickfunctionPicker(grid, cellId) {
    switch (grid) {
        case "draft":
            break;
        case "shafts":
            $(cellId).on("click", function () {
                setBackgroundColorOnClick(cellId);
                shafts(cellId);
                console.log(cellId);
                console.log(getRows(grid));
                console.log(getColumns(grid));
            });
                
            break;
        case "thredles":
            $(cellId).on("click", function () {
                setBackgroundColorOnClick(cellId);
                console.log(cellId);
                console.log(getRows(grid));
                console.log(getColumns(grid));
            
            });
            break;
        case "tie-up":
            $(cellId).on("click", function () {
                setBackgroundColorOnClick(cellId);
                console.log(cellId);});
            break;
        default:
            break;
    }
}
function shafts(cellId){
    console.log(cellId);
    let grid=cellId.split("-")[0];
    console.log(grid);
    let y = cellId.split("-")[1];
    console.log(y);
    let x = cellId.split("-")[2];
    console.log(x);

    let rows=$(`${grid}-wrapper`).children().length
    for(let i=0;i<rows;i++){
        let currentCell=`${grid}-${i}-${x}`;
        if(currentCell==cellId){
            continue;
        }
        resetBakcgroundColor(currentCell);
    }
}

function thredles(cellId){
    console.log(cellId);
    let grid=cellId.split("-")[0];
    console.log(grid);
    let y = cellId.split("-")[1];
    console.log(y);
    let x = cellId.split("-")[2];
    console.log(x);

    let rows=$(`#tie-up-wrapper`).children().length
    for(let i=0;i<rows;i++){
        let currentCell=`#tie-up-${i}-${x}`;
        if($(currentCell).css("background-color")==$(currentCell).parent().css("background-color")){
            continue;
        }else{
            let weftColor=$(cellId).css("background-color");
            let warpColor=$(`#shafts-${i}-${x}`).css("background-color");
        }

        
    }





}

function getRows(grid){
    if(grid[0]=="#"){
        grid=grid.slice(1);
    }
    return $(`#${grid}-wrapper`).children().length;
}
function getColumns(grid){
    if(grid[0]=="#"){
        grid=grid.slice(1);
    }
    return $(`#${grid}-wrapper`).children().first().children().length;
}
    


function adjustDraftDisplay(gridSizeX, gridSizeY, thredlePreference, shaftPreference) {//Adjusts the size of the draft grid to prevent rezising of cells when adding shafts/thredles.
    console.log("adjustDraftDisplay");

    gridSizeX = parseInt(gridSizeX);
    gridSizeY = parseInt(gridSizeY);
    //Adjusts the end columns/rows of the grid to accomodate for the number of shafts/thredles
    thredlePreference = parseInt(thredlePreference);
    shaftPreference = parseInt(shaftPreference);
    let draftAreaWidth = gridSizeX + thredlePreference + 2;
    let draftAreaHeight = gridSizeY + shaftPreference + 2;

    $(`#shafts-wrapper`).css("grid-row-end", draftAreaHeight);
    $(`#thredles-wrapper`).css("grid-column-end", draftAreaWidth);
    $(`#tie-up-wrapper`).css("grid-row-end", draftAreaHeight);
    $(`#tie-up-wrapper`).css("grid-column-end", draftAreaWidth);
}
function draftSetUp() {//Checks if user has set thredle/shaft preferences, if not uses 4 as default. Navigation to draft.html and creation og grid.
    console.log("draftSetUp");
    let shaftPreference;
    let thredlePreference;
    console.log(localStorage.getItem('thredleInput'));
    (localStorage.getItem('shaftInput')) ? shaftPreference = localStorage.getItem('shaftInput') : shaftPreference = 4;
    (localStorage.getItem('thredleInput')) ? thredlePreference = localStorage.getItem('thredleInput') : thredlePreference = 4;
    let gridSizeX = 50;
    let gridSizeY = 50;
    createGrid(gridSizeX, gridSizeY, "draft");
    createGrid(gridSizeX, shaftPreference, "shafts");
    createGrid(thredlePreference, gridSizeY, "thredles");
    createGrid(thredlePreference, shaftPreference, "tie-up");

    adjustDraftDisplay(gridSizeX, gridSizeY, thredlePreference, shaftPreference);
}
//Functions in the actual draft
function getActiveColor() {//Returns the color of color-picker
    return $(`#currentcolor`).val();
}
function setBackgroundColorOnClick(cellId) {//Sets the background color of the cell to the color of the color-picker
    if ($(cellId).css("background-color") == $(cellId).parent().css("background-color")) {
        $(cellId).css("background-color", getActiveColor());
    } else {
        $(cellId).css("background-color", $(cellId).parent().css("background-color"));
    }
}
function resetBakcgroundColor(cellId) {//Sets the background color of the cell to the color of the parent
    if ($(cellId).css("background-color") != $(cellId).parent().css("background-color")) {
        $(cellId).css("background-color", $(cellId).parent().css("background-color"));
    }

}
//Shafts
//Write function to change color of cells in draft grid depending on the color of the cell in the tie-up grid, thredle, and shafts grid.
//First check if same row tie-up is filled
//if so, check if corresponding thredle column is filled 
//if so, chande background of corresp cells in draft grid to match weft color

//Thredles
////First check if same row tie-up is filled
//Varje ruta i grid kan ha status Upp/ner motsvarande varp-färg eller inslagsfärg

$(document).ready(function () {
    draftSetUp();
    document.getElementById("currentcolor").addEventListener("change", function () {
        currentColor = document.getElementById("currentcolor").value;
        console.log(currentColor);
    });

});

