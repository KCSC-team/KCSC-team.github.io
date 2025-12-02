import Header from "./Header.js";
import Footer from "./Footer.js";


const headerContainer = document.querySelector ('#header');
const footerContainer = document.querySelector ("#footer");

headerContainer.innerHTML = Header();
footerContainer.innerHTML = Footer();



var checkActive = {
    'members': {
        render () {
            const el = document.querySelector('.members');
            if(el) el.classList.add('active');
        }
    },
    'about': {
        render () {
            const el = document.querySelector('.about_us');
            if(el) el.classList.add('active');
        }
    },
    'history': {
        render () {
            const el = document.querySelector('.history');
            if(el) el.classList.add('active');
        }
    },
    'achievement': {
        render () {
            const el = document.querySelector('.achievement');
            if(el) el.classList.add('active');
        }
    },
    
}



const activeBtn = (string) => {
    for (const key in checkActive) {
        if (string.includes (key)) {
            checkActive[key].render();
        }
    }
}


activeBtn (location.href);