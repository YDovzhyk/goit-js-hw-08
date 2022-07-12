'use strict';
import throttle from 'lodash.throttle';
import localStorageApi from './localstorage';

const CONTACT_FORM_LOCAL_STORAGE_KEY = 'feedback-form-state';
const contactFormEl = document.querySelector('.feedback-form');
const userData = {};

const fillFormFields = () => {
    const userDataFromLS = localStorageApi.load(CONTACT_FORM_LOCAL_STORAGE_KEY);

    if (userDataFromLS === undefined) {
        return;
    }

    const formElements = contactFormEl.elements;

    for (const key in userDataFromLS) {
    if (userDataFromLS.hasOwnProperty(key)) {
        formElements[key].value = userDataFromLS[key];
    }
    }
};

const onFormElChange = event => {
    const target = event.target;

    const formElValue = target.value;
    const formElName = target.name;

    userData[formElName] = formElValue;

    localStorageApi.save(CONTACT_FORM_LOCAL_STORAGE_KEY, userData);
};

const onContactFormSubmit = event => {
    event.preventDefault();

    console.dir(localStorageApi.load(CONTACT_FORM_LOCAL_STORAGE_KEY));

    localStorageApi.remove(CONTACT_FORM_LOCAL_STORAGE_KEY);
    event.currentTarget.reset();
};

contactFormEl.addEventListener('input', throttle(onFormElChange, 500));
contactFormEl.addEventListener('submit', onContactFormSubmit);

fillFormFields();