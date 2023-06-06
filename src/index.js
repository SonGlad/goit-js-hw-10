import {fetchBreeds, fetchCatByBreed} from './js/cat-api'
import './sass/index.scss'
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';



let selectData = [];
const select =  new SlimSelect({
    select: '.breed-select',

    data: selectData,
  });


const refs = {
    selectEl: document.querySelector(".breed-select"),
    loadingMsgEl: document.querySelector(".loader"),
    errorMsgEl: document.querySelector(".error"),
    divEl: document.querySelector(".cat-info"),
    slimSelectDivEl: document.querySelector(".ss-main"), 
};

refs.slimSelectDivEl.classList.add('is-hidden')
refs.loadingMsgEl.style.display = "none";

let isFirstLoad = true;


refs.selectEl.addEventListener('change', handleCatSelect);


function showLoader(){
    refs.loadingMsgEl.style.display = "block";
};
function hideLoader(){
    refs.loadingMsgEl.style.display = "none";
    refs.slimSelectDivEl.classList.remove('is-hidden');
    refs.selectEl.classList.remove('hidden');
};
function notiflixCallErrorMessage(){
    const errorMessage = refs.errorMsgEl.textContent;
    // Notiflix.Report.warning(`${errorMessage}`);
    Notiflix.Notify.warning(`${errorMessage}`);
};
function resetContent(){
    refs.divEl.innerHTML = '';
};


showLoader();
fetchBreeds()
    .then((cats) => {
        addListOfCatsToSelect(cats);
        hideLoader()
    })
    .catch((error) => {
        hideLoader(); 
        notiflixCallErrorMessage();
        console.error('Error fetching breeds:', error);
        throw error;
    });


function addListOfCatsToSelect(cats){
    cats.forEach((cat) => {
        value = cat.id;
        textContent = cat.name;
        selectData.push({text: cat.name, value: cat.id});
    });
    select.setData(selectData);
}; 

// //////////////////
// Используем этот тип подключения в переменную SelectEl без плагтна SlimSelect
// const optionEl = document.createElement('option');
// optionEl.value = cat.id;
// optionEl.textContent = cat.name;
// refs.selectEl.append(optionEl);
// //////////////////


function handleCatSelect() {
    if(isFirstLoad){
        isFirstLoad = false;
        return;
    };
    const breedId = this.value;
    showLoader();
    resetContent();
    fetchCatByBreed(breedId)
        .then((catData) => {
            const creatContent = createCatElements(catData);
            refs.divEl.innerHTML = creatContent;
            hideLoader();
        })
        .catch(() => {
            hideLoader();
            notiflixCallErrorMessage();
            resetContent();
            console.error('Error fetching breeds:', error);
            throw error;
        });
};


function createCatElements(catData){
    return catData.map(({ url, breeds: [{ name, description, temperament }] }) => {
        return `
        <div class="cat_container">
            <img class="cat__image" src="${url}" alt="${name}">      
            <div class="cat__body">
                <h2 class="cat__title">${name}</h2>
                <p class="cat__description"><strong>Description: </strong>${description}</p>     
                <p class="cat__temparament"><strong>Temperament: </strong>${temperament}</p>
            </div>
        </div>`
    }).join('');
};






