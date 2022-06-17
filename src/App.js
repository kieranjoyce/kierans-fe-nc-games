import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import ReviewsList from "./components/ReviewsList";
import SingleReview from "./components/SingleReview";
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
        <Header />
        <NavBar categories={categories}/>
        <Routes>
            <Route path="/" element={<ReviewsList />} />
            <Route path="/:category" element={<ReviewsList categories={categories}/>} />
            <Route path="/review/:review_id" element={<SingleReview />} />
        </Routes>
        </div>
        );
    }
    
export default App;
