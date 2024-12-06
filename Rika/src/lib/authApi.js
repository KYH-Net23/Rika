import axios from 'axios';

//Base config for authorization. Do not change!
const authApi = axios.create({
    baseURL: 'https://rika-tokenservice-agbebvf3drayfqf6.swedencentral-01.azurewebsites.net'
})

export default authApi;