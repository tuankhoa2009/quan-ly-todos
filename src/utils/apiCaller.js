import axios from 'axios';
import * as Config from './../constants/Config';

export default function callApi(endpoint, method = 'GET', body) {
    return axios({
        method: method,
        url: `${Config.MOCK_API}/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    })
}