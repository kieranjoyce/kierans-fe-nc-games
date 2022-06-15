import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import BurgerMenu from "./components/BurgerMenu";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import ReviewsList from "./components/ReviewsList";
import { getCategories} from "./utils/api";

function App() {
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        getCategories()
        .then(categories => {
            setCategories(categories);
        })
    }, [])

    return (
        <div className="App">
            <BurgerMenu categories={categories}/>
            <div className="page-wrap">
            <Header />
            <NavBar categories={categories}/>
            <Routes>
                <Route path="/" element={<ReviewsList />} />
                <Route path="/reviews/:category" element={<ReviewsList categories={categories}/>} />
            </Routes>
            </div>
        </div>
        );
    }
    
export default App;
