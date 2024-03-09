import { trackEvent, trackPageView } from "./analytics-api.js";
import content from './content.json' assert { type: 'json' };


const contentDiv = document.getElementById('content');
const signUpButton = document.getElementById('signUpBtn');
const successModal =  document.getElementById('successModal')
const closeButton =  document.getElementById('closeBtn')
const confirmButton =  document.getElementById('confirmBtn')
successModal.style.display = 'none';
const variations = content;


let userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : undefined;
if (!userData) {
    const randomIndex = Math.floor(Math.random() * variations.variations.length);
    const assignedVariation = variations.variations[randomIndex].id;
    userData = {
        id: generateUserId(),
        variation: assignedVariation,
        signedUp: false,
        pageView: "0",
        clickCount: "0"
    }
    localStorage.setItem('userData', JSON.stringify(userData))
}

userData.pageView = userData.pageView + 1
localStorage.setItem('userData', JSON.stringify(userData))
trackPageView(userData);

const variation = variations.variations.find(variation => variation.id === userData.variation);
if (variation) {
    const img = '<img src="src/sample.jpg" class="content-image" style="display: block; margin-bottom: 20px;">';
    contentDiv.innerHTML = img + variation.content;
}

signUpButton.addEventListener('click', function() {
    userData.signedUp =  true
    userData.clickCount = userData.clickCount + 1
    successModal.style.display = 'block';
    localStorage.setItem('userData', JSON.stringify(userData))
    trackEvent('signUpButtonClicked', userData);
});

closeButton.addEventListener('click', function() {
    successModal.style.display = 'none';
});

confirmButton.addEventListener('click', function() {
    successModal.style.display = 'none';
});

function generateUserId(){
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        let counter = 0;
        let length = 8;
        const charactersLength = characters.length;
        while(counter < length){
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }


