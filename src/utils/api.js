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

export function getReview(review_id) {
    return ncGamesApi.get(`/reviews/${review_id}`)
    .then(({ data: {review}}) => {
        return review;
    })
}

export function getUser(targetUsername) {
    return ncGamesApi.get('/users')
    .then(({data : {users}}) => {
        return users.find(({ username }) => username === targetUsername);
    })
    .catch(err => console.log(err))
}

export function getUsers() {
    return ncGamesApi.get('/users')
    .then(({ data: {users}}) => {
        return users;
    })
}