import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001"
});

export const getClients = async() => {

    try {

        const {data} = await api.get('/api/get-clients');
        return data;

    }catch(error) {

        console.log('Error while getting clients ', error);

    }

}

export const setClient = async(data:object) => {

    try {

        const {status} = await api.post('/api/new-client', data);
        return status

    }catch(error) {
        console.log("Error while setting client ", error);
    } 

}