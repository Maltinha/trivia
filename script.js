let groups = [];

function addGroup(){
    const groupName = document.getElementById('GroupNameInput').value.trim();
    const fileInput = document.getElementById('GroupFileInput');
    const file = fileInput.files[0];

    if(!groupName) return;

    if(file){
        const reader = new FileReader();
        reader.onload = function(e){
            const imageDataUrl = e.target.result;
            groups.push({ name: groupName.toUpperCase(), points: 0, image: imageDataUrl });
            renderGroups();
        };
        reader.readAsDataURL(file); 

    } else {
        groups.push({name: groupName, points: 0, image : null});
        renderGroups();
    }

    document.getElementById('GroupNameInput').value = '';
    fileInput.value = '';
}

function renderGroups() {
    const ul = document.getElementById('groupsList');
    ul.innerHTML = '';

    groups.forEach(group => {
        const li = document.createElement('li');

        if (group.image) {
            const img = document.createElement('img');
            img.src = group.image;
            img.alt = group.name;
            img.classList.add('group-image');
            li.appendChild(img);
        }

        const nameSpan = document.createElement('span');
        nameSpan.textContent = group.name;
        li.appendChild(nameSpan);
        li.classList.add('group-item');

        ul.appendChild(li);
    });
}


document.getElementById('addGroupButton').addEventListener('click', addGroup);


