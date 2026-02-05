import { applyBackgroundGradient } from '../assets/theme.js';
applyBackgroundGradient(); 

let groups = JSON.parse(localStorage.getItem('groups')) || [];
let permGroups = JSON.parse(localStorage.getItem('permGroups')) || [];

//localStorage.clear();
console.log(permGroups);
console.log(groups);

function addGroup(){
    const groupName = document.getElementById('groupNameInput').value.trim();
    const fileInput = document.getElementById('groupFileInput');
    const file = fileInput.files[0];

    
    if(groups.length === 5)return;

    if(!groupName) return;

    if(groups.some(g => g.name === groupName.toUpperCase())){
        alert('A group with this name already exists. Please choose a different name.');
        return;
    }   

    if(file){
        const reader = new FileReader();
        reader.onload = function(e){
            const imageDataUrl = e.target.result;

            if(permGroups.some(g => g.name === groupName.toUpperCase())){
                return;
            }else{
                permGroups.push({
                    name: groupName.toUpperCase(),
                    image: imageDataUrl,
                    points: 0,
                    wins: 0
                });
                localStorage.setItem('permGroups', JSON.stringify(permGroups));
            }

            groups.push({ 
                name: groupName.toUpperCase(),
                image: imageDataUrl,
                points: 0,
                categoryPoints:[]
                });
            localStorage.setItem('groups', JSON.stringify(groups));
            renderGroups();
        };
        reader.readAsDataURL(file); 

    } else {

        if(permGroups.some(g => g.name === groupName.toUpperCase())){
                return;
            }else{
                permGroups.push({
                    name: groupName.toUpperCase(),
                    image: null,
                    points: 0,
                    wins: 0
                });
                localStorage.setItem('permGroups', JSON.stringify(permGroups));
            }

        groups.push({
            name: groupName.toUpperCase(),
            image : null,
            points: 0, 
            categoryPoints:[]
        });
        localStorage.setItem('groups', JSON.stringify(groups));
        renderGroups();
    }

    document.getElementById('groupNameInput').value = '';
    fileInput.value = '';
}

function renderGroups() {
    const ul = document.getElementById('groupsList');
    ul.innerHTML = '';

    groups.forEach(group => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        const content = document.createElement('div');
        content.classList.add('groupContent');

        img.src = group.image || './assets/default_group_image.png';
        img.classList.add('groupImage');

        const nameSpan = document.createElement('h2');
        nameSpan.textContent = group.name;

        const deleteBtn = document.createElement('button');
        const cross = document.createElement("i");
        cross.className = "material-icons";
        cross.textContent = "close";
        deleteBtn.classList.add('deleteGroupButton');

        content.appendChild(img);
        content.appendChild(nameSpan);
        deleteBtn.appendChild(cross);
        li.appendChild(content);
        li.appendChild(deleteBtn);
        li.classList.add('groupItem');


        deleteBtn.addEventListener('click', () => {
            groups = groups.filter(g => g !== group);
            localStorage.setItem('groups', JSON.stringify(groups));
            renderGroups();
        });

        ul.appendChild(li);
    });
}

renderGroups();
document.getElementById('addGroupButton').addEventListener('click', addGroup);
document.getElementById('startGameButton').addEventListener('click', () => {
    if(groups.length < 1){
        alert('Please add at least one group to start the game.');
        return;
    }
    window.location.href = "./pages/gameScreen.html";
});

// Settings Panel Logic
const settingsPanel = document.getElementById("settingsPanel");
const bgColorPicker1 = document.getElementById("bgColorPicker1");
const bgColorPicker2 = document.getElementById("bgColorPicker2");

bgColorPicker1.value = localStorage.getItem("bgTopColor") || "#740574";
bgColorPicker2.value = localStorage.getItem("bgBottomColor") || "#c06e7c";   

document.querySelector(".settingsButton").addEventListener("click", () => {
    if(settingsPanel.style.display === "block"){
        settingsPanel.style.display = "none";
    } else {
        settingsPanel.style.display = "block";
    }   
});

document.getElementById("groupSettings").addEventListener("click", () => {
    window.location.href = "./pages/groupsSettings.html";
});

document.getElementById("categorySettings").addEventListener("click", () => {
    window.location.href = "./pages/categorySettings.html";
});

document.getElementById("closeSettings").addEventListener("click", () => {
    settingsPanel.style.display = "none";
});

document.getElementById("resetSettings").addEventListener("click", () => {
    localStorage.removeItem("bgTopColor");
    localStorage.removeItem("bgBottomColor");   
    bgColorPicker1.value = "#740574";
    bgColorPicker2.value = "#c06e7c";    
    applyBackgroundGradient();
});

bgColorPicker1.addEventListener("input", (e) => {
    const color = e.target.value;
    localStorage.setItem("bgTopColor", color);
    applyBackgroundGradient();
});

bgColorPicker2.addEventListener("input", (e) => {
    const color = e.target.value;
    localStorage.setItem("bgBottomColor", color);
    applyBackgroundGradient();
});

