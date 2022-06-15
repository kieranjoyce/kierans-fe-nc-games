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

export function getReviews(category) {
    return ncGamesApi.get('/reviews', {params: {category}})
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