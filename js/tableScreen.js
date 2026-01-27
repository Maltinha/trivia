import {gameQuestions} from "../assets/questionsFile.js";

const groups = JSON.parse(localStorage.getItem('groups')) || [];
let currentCategory = JSON.parse(localStorage.getItem('currentCategory')) || 0;

function renderGroups(){
    let groupsDisplay = document.getElementById("groups");
    
    groups.forEach(g => {
        let group = document.createElement("div");
        
        let img = document.createElement("img");
        img.src= g.image || '../assets/default_group_image.png';
        img.classList.add("groupImage")
        group.appendChild(img);

        let points = document.createElement("h2")
        points.textContent = g.points
        points.classList.add("groupPoints")
        group.appendChild(points);


        group.classList.add("groupItem");
        groupsDisplay.appendChild(group)
    });
}

function renderTable(){
    const groupsNames = groups.map(g => g.name);
    const categoriesNames = gameQuestions.map(cat => cat.category);

    const container = document.getElementById("tableContainer");
    container.innerHTML = "";
    const columnCount = categoriesNames.length + 1;
    container.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;

    const emptyCell = document.createElement("div")
    emptyCell.classList.add("gridItem", "emptyCell");
    container.appendChild(emptyCell);

    
    categoriesNames.forEach(name => {   
        let categoryName = document.createElement("div");
        categoryName.textContent = name;
        categoryName.classList.add("gridItem");
        container.appendChild(categoryName);
    });

    groupsNames.forEach(name => {
        let groupName = document.createElement("div");
        groupName.textContent = name;
        groupName.classList.add("gridItem");
        container.appendChild(groupName);

        const group = groups.find(g => g.name === name);
        group.categoryPoints.forEach(points => {
                let pointsCell = document.createElement("div");
                pointsCell.textContent = points;
                pointsCell.classList.add("gridItem");
                container.appendChild(pointsCell);
            });

        if(group.categoryPoints.length < categoriesNames.length){
            for(let i = group.categoryPoints.length; i < categoriesNames.length; i++){
                let emptyCell = document.createElement("div");
                emptyCell.textContent = "-";
                emptyCell.classList.add("gridItem");
                emptyCell.style.backgroundColor = "gray";

                container.appendChild(emptyCell);
            }
        }
    });
}

document.getElementById("nextPageButton").addEventListener('click', () => {
    if(currentCategory === gameQuestions.length){
        currentCategory = 0;
        localStorage.setItem('currentCategory', JSON.stringify(currentCategory));
        window.location.href = '../pages/rankPage.html';    
    } 
    else window.location.href = '../pages/gameScreen.html'
});

renderGroups();
renderTable();