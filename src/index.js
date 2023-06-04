import './sass/_common.scss'
// import './css/style.css'
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
// import 'slim-select/dist/slimselect.css';




// new SlimSelect({
//   select: '#selectElement'
// });npm


const refs = {
    selectEl: document.querySelector(".breed-select"),
    loadingMsgEl: document.querySelector(".loader"),
    errorMsgEl: document.querySelector(".error"),
    divEl: document.querySelector(".cat-info"),
};

