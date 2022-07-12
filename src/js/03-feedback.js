'use strict';
import throttle from 'lodash.throttle';
import localStorageApi from './localstorage';

const CONTACT_FORM_LOCAL_STORAGE_KEY = 'feedback-form-state';
const contactFormEl = document.querySelector('.feedback-form');
const userData = {};

const fillFormFields = () => { //Функція коли поля заповнені
    const userDataFromLS = localStorageApi.load(CONTACT_FORM_LOCAL_STORAGE_KEY); //отримуємо данні з LS

    if (userDataFromLS === undefined) { //Перевіряємо чи є якісь значення в localStorage
        return;
    }

    const formElements = contactFormEl.elements; //Отримуємо елементи форми Input

    for (const key in userDataFromLS) { // Перебираємо властивості з LS
    if (userDataFromLS.hasOwnProperty(key)) {  //перевіряємо чи це влансні властивості обєкту
        formElements[key].value = userDataFromLS[key]; //Записуємо в елементи форми значення властивостей LS
    }
    }
};

const onFormElChange = event => { //Функція коли вводяться данні
    const target = event.target; //Визначаємо на якому елементі відбувалась подія

    const formElValue = target.value; //Отримуємо данні що були введені 
    const formElName = target.name; //Отримуэмо данні з атрібуту(type="email", name="message" HTML)

    userData[formElName] = formElValue; // В userData записуэмо данні атрибут: значення

    localStorageApi.save(CONTACT_FORM_LOCAL_STORAGE_KEY, userData); // Зберыгаэмо данні в LS
};

const onContactFormSubmit = event => { // Функція після Submit
    event.preventDefault(); // Прибираэмо дії браузера за замовчуванням

    console.dir(localStorageApi.load(CONTACT_FORM_LOCAL_STORAGE_KEY)); // Виводимо у консоль данні з LS

    localStorageApi.remove(CONTACT_FORM_LOCAL_STORAGE_KEY); // Видаляэмо данні з LS
    event.currentTarget.reset(); // Очищуэмо форму 
};

contactFormEl.addEventListener('input', throttle(onFormElChange, 500));
contactFormEl.addEventListener('submit', onContactFormSubmit);

fillFormFields();