import { applyBackgroundGradient } from '../assets/theme.js';
applyBackgroundGradient();

const groups = JSON.parse(localStorage.getItem('groups')) || [];
const permGroups = JSON.parse(localStorage.getItem('permGroups')) || [];
let wName = "";
let wPoints = 0;
let wImg = "";

function update_PermGroups(){
    groups.forEach(g => {
        if(g.points > wPoints){
            wName = g.name;
            wPoints = g.points;
            wImg = g.image;
        }
        const permGroup = permGroups.find(pg => pg.name === g.name);
        permGroup.points += g.points;
    });
    const winner = permGroups.find(g => g.name === wName);
    winner.wins += 1;


    console.log(groups);
    console.log(permGroups);
    localStorage.setItem('permGroups', JSON.stringify(permGroups));
}

function render_Winner(){
    let winnerImg = document.getElementById("winnerImg");
    winnerImg.src = wImg || '../assets/default_group_image.png';
    let winnerName = document.getElementById("winnerName");
    winnerName.innerHTML = "Winner: " + wName;
    let winnerPoints = document.getElementById("winnerPoints");
    winnerPoints.innerHTML = "Points: " + wPoints;
}

update_PermGroups();
render_Winner()

document.getElementById("homeButton").addEventListener('click', () => {
    localStorage.removeItem('currentCategory');
    window.location.href = '../index.html'
});
