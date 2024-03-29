# Yellow Pieces

A boardgames review site created for the front-end project stage of the Northcoders coding bootcamp.
### https://yellowpieces.netlify.app/

## Description
This project is a React app where users can view and interact with reviews for a variety of boardgames. The app includes client-side routing utilising React Router v6, and hydrates pages with data retrieved from a RESTful API linked to a PostgreSQL database (https://github.com/kieranjoyce/be-nc-games)
### Features
- can view full list of reviews, which can be filtered by category or sorted by various properties
- can view an individual review in full, along with associated comments
- can vote on a review (updated vote count is rendered optimistically)
- can post comments and delete comments made by logged in user
- error handling if navigate to non-existent endpoint or parametric endpoint not found in the database
- responsive design for mobile and larger views

## Running locally
### Dependenceies
node min version 17.0.0
npm min version 8.0.0

### Installing
1. Clone project files by running following command in the terminal at the desired directory:
```
git clone https://github.com/kieranjoyce/kierans-fe-nc-games.git
```
2. Navigate to the project root folder 
```
cd kierans-fe-nc-games
```
3. run `npm install` to install project dependencies

### Executing program

run `npm start` command to launch app, which can be accessed at ```http://localhost:3000/```
