import axios from 'axios';

export const Query = () => {
    return axios.get('http://localhost:5000').then((response) => {
        try {
            console.log(response);
           return response;
        } catch {
            throw new  Error('Invalid response')
        }
    })
};
