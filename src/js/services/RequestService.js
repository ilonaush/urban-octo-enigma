import axios from 'axios';

export const Query = () => {
    return axios.get('http://localhost:7000').then((response) => {
        try {
           return response;
        } catch {
            throw new  Error('Invalid response')
        }
    })
};
