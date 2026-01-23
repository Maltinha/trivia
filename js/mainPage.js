let groups = [];

function addGroup(){
    const groupName = document.getElementById('groupNameInput').value.trim();
    const fileInput = document.getElementById('groupFileInput');
    const file = fileInput.files[0];

    if(!groupName) return;

    if(file){
        const reader = new FileReader();
        reader.onload = function(e){
            const imageDataUrl = e.target.result;
            groups.push({ 
                name: groupName.toUpperCase(),
                image: imageDataUrl,
                points: 0,
                categoryPoints:[]
                });
            renderGroups();
        };
        reader.readAsDataURL(file); 

    } else {
        groups.push({
            name: groupName.toUpperCase(),
            image : null,
            points: 0, 
            categoryPoints:[]
        });
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

        img.src = group.image || './assets/default_group_image.png';
        img.classList.add('groupImage');
        li.appendChild(img);

        const nameSpan = document.createElement('h2');
        nameSpan.textContent = group.name;
        li.appendChild(nameSpan);
        li.classList.add('groupItem');

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        li.appendChild(deleteBtn);
        deleteBtn.classList.add('deleteGroupButton');

        deleteBtn.addEventListener('click', () => {
            groups = groups.filter(g => g !== group);
            renderGroups();
        });

        ul.appendChild(li);
    });
}


document.getElementById('addGroupButton').addEventListener('click', addGroup);
document.getElementById('startGameButton').addEventListener('click', () => {
    if(groups.length < 1){
        alert('Please add at least one group to start the game.');
        return;
    }
    localStorage.clear();
    localStorage.setItem('groups', JSON.stringify(groups));
    window.location.href = "./pages/gameScreen.html";});