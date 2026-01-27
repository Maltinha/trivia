const groups = JSON.parse(localStorage.getItem('groups')) || [];

console.log(groups);

function render_Winner(){
    let group = groups.reduce((prev, current) => (prev.points > current.points) ? prev : current);

    let winnerImg = document.getElementById("winnerImg");
    winnerImg.src = group.image || '../assets/default_group_image.png';
    let winnerName = document.getElementById("winnerName");
    winnerName.innerHTML = group.name;
}

render_Winner()

document.getElementById("homeButton").addEventListener('click', () => {
    window.location.href = '../index.html'
});
