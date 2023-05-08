import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001/api"
});

export const getClients = async() => {

    try {

        const {data} = await api.get('get-clients');
        return data;

    }catch(error) {

        console.log('Error while getting clients ', error);

    }

}

export const getClient = async(id:any) => {

    try {
        const {data} = await api.get(`get-client/${id}`);
        return data;
    }catch(error) {
        console.log('Error while getting client ', error);
    }

}

export const setClient = async(data:object) => {

    try {

        const {status} = await api.post('new-client', data);
        return status

    }catch(error) {
        console.log("Error while setting client ", error);
    } 

}

export const updateClient = async(data: any) => {

    try {
        const {status} = await api.put('update-client', data);
        return status
    }catch(error) {
        console.log("Error while updating client ", error);
    }

}