import axios from 'axios';

const ncGamesApi = axios.create({
    baseURL: 'https://kierans-be-nc-games.herokuapp.com/api/'
})

export function getCategories() {
    return ncGamesApi.get('/categories')
    .then(({data: {categories}}) => {
        return categories;
    })
}

export function getReviews() {
    let path = '/reviews';
    return ncGamesApi.get(path)
    .then(({ data: {reviews}}) => {
        return reviews;
    })
}

export function getUsers() {
    return ncGamesApi.get('/users')
    .then(({ data: {users}}) => {
        return users;
    })
}