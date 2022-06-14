import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AllReviews from "./components/AllReviews";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import { getCategories, getUsers } from "./utils/api";

function App() {
    const [categories, setCategories] = useState([]);
    
    // const [users, setUsers] = useState([]);
    
    useEffect(() => {
        getCategories()
        .then(categories => {
            setCategories(categories);
        })
    }, [])
    
    // useEffect(() => {
    //     getUsers()
    //     .then(users => {
    //         console.log(users);
    //         setUsers(users);
    //     })
    // }, [])

    return (
        <div className="App">
        <Header />
        <NavBar categories={categories}/>
        <Routes>
            <Route path="/" element={<AllReviews />} />
        </Routes>
        </div>
        );
    }
    
export default App;
