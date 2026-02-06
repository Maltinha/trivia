import {gameQuestions} from "../assets/questionsFile.js";
import { applyBackgroundGradient } from '../assets/theme.js';
applyBackgroundGradient(); 

let numberQuestions = localStorage.getItem('numberQuestions') || 5;
document.getElementById('questionsNumber').textContent = numberQuestions;

let categories = [];
let selectedCategories = JSON.parse(localStorage.getItem('selectedCategories')) || ['Geography','Football','Records','Music'];

console.log(selectedCategories);

function get_Categories(){
    categories = gameQuestions.map(section => section.category)
}

function gridStructure(container) {
    const n = categories.length;
    if (n === 0) return;
    const rows = Math.round(Math.sqrt(n)); // round to get closest to square
    const cols = Math.ceil(n / rows); // ensure enough columns to fit all

    container.style.display = "grid";
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
}

function render_Categories(){
    get_Categories()
    const container = document.getElementById("categoriesContainer");
    container.innerHTML = "";
    gridStructure(container);
    categories.forEach(c => {
        const categoryItem = document.createElement('button');
        categoryItem.className = "categoryItem";
        categoryItem.textContent = c;

        categoryItem.addEventListener('click', () => {
            const category = categoryItem.textContent;
            const index = selectedCategories.findIndex(c => c === category);

            if (index > -1) {
                selectedCategories.splice(index, 1);
                categoryItem.style.borderColor = "white";
            } else {
                selectedCategories.push(category);
                categoryItem.style.borderColor = "green";
            }
        })

        container.appendChild(categoryItem);

        if(selectedCategories.find(sc => sc === c)){
            categoryItem.style.borderColor = "green"
        }
    })
}

render_Categories(); 

document.getElementById('decreaseButton').onclick = () => {
    if(numberQuestions > 1 && numberQuestions <= 9){
        numberQuestions--;
        localStorage.setItem('numberQuestions', numberQuestions);
        document.getElementById('questionsNumber').textContent = numberQuestions;
    }
}

document.getElementById('increaseButton').onclick = () => {
    if(numberQuestions >= 1 && numberQuestions < 9){
        numberQuestions++;
        localStorage.setItem('numberQuestions', numberQuestions);
        document.getElementById('questionsNumber').textContent = numberQuestions;
    }
}

document.querySelector('.homeButton').onclick = () => {
    localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
    window.location.href = '../index.html';
}