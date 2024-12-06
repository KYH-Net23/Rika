import axios from 'axios';

//Base config for authorization. Do not change!
const identityApi = axios.create({
    baseURL: 'https://rika-identity-user-f5e3fddxg4bve2eg.swedencentral-01.azurewebsites.net/'
})

export default identityApi;