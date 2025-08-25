import axios from "axios";
const baseUrl = 'http://localhost:3001/persons';

export const getAll = () => {
    return axios.get(baseUrl).then(response => response.data);
}

export const create = (person) => {
    return axios.post(baseUrl, person).then(response => response.data);
}

export const deleteRequest = (id) => {
    const url = `${baseUrl}/${id}`;
    return axios.delete(url);
}

export const update = (person) => {
    const url = `${baseUrl}/${person.id}`;
    return axios.put(url, person);
}