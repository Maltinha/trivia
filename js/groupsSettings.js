import { applyBackgroundGradient } from '../assets/theme.js';
applyBackgroundGradient(); 

const permGroups = JSON.parse(localStorage.getItem('permGroups')) || [];
const groups = JSON.parse(localStorage.getItem('groups')) || [];
const groupsContainer = document.getElementById("groupsContainer");

console.log(permGroups);

groupsContainer.innerHTML = '';

function render_groups() {
    groupsContainer.innerHTML = '';
    permGroups.forEach(g => {

        const groupItem = document.createElement('div');
        groupItem.className = 'groupItem';

        const groupContent = document.createElement('div');
        groupContent.className = 'groupContent';

        const groupImg = document.createElement('img');
        groupImg.src = g.image || '../assets/default_group_image.png';

        const groupText = document.createElement('div');
        groupText.className = 'groupText';

        const groupName = document.createElement('h2');
        groupName.textContent = g.name;

        const groupPoints = document.createElement('p');
        groupPoints.textContent = `Points: ${g.points}`;

        const groupWins = document.createElement('p');
        groupWins.textContent = `Wins: ${g.wins}`;

        const groupButtons = document.createElement('div');
        groupButtons.className = 'groupButtons';

        const addGroupButton = document.createElement('button');
        const plus = document.createElement("i");
        plus.className = "material-icons";
        plus.textContent = "add";
        addGroupButton.appendChild(plus);

        addGroupButton.onclick = () => {
            if (groups.find(gr => gr.name === g.name)){
                alert('Group already added.');
            }else if(groups.length >= 5) {
                alert('Maximum number of groups reached.');
            }else{
                groups.push(g);
                localStorage.setItem('groups', JSON.stringify(groups));
            }
        }
        addGroupButton.className = 'groupButton';

        const removeGroupButton = document.createElement('button');
        const cross = document.createElement("i");
        cross.className = "material-icons";
        cross.textContent = "close";
        removeGroupButton.appendChild(cross);

        removeGroupButton.onclick = () => {
            permGroups.splice(permGroups.indexOf(g), 1);
            groups.splice(groups.indexOf(g), 1);
            localStorage.setItem('permGroups', JSON.stringify(permGroups));
            localStorage.setItem('groups', JSON.stringify(groups));
            render_groups();
        }
        removeGroupButton.className = 'groupButton';

        groupText.appendChild(groupName);
        groupText.appendChild(groupPoints);
        groupText.appendChild(groupWins);
        groupContent.appendChild(groupImg);
        groupContent.appendChild(groupText);
        groupButtons.appendChild(addGroupButton);
        groupButtons.appendChild(removeGroupButton);
        groupItem.appendChild(groupContent);
        groupItem.appendChild(groupButtons);

        groupsContainer.appendChild(groupItem);
    });
}

render_groups();

document.querySelector('.homeButton').onclick = () => {
    window.location.href = '../index.html';
}

