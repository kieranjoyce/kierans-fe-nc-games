import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import ReviewsList from "./components/ReviewsList";
import SingleReview from "./components/SingleReview";
import { UserContext } from "./contexts/UserContext";
import { getCategories } from "./utils/api";

function App() {
    const [categories, setCategories] = useState([]);

    const user = {
        username: "happyamy2016",
        name: "Amy Happy",
        avatar_url:
            "https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729",
    };

    useEffect(() => {
        getCategories().then((categories) => {
            setCategories(categories);
        });
    }, []);

    return (
        <UserContext.Provider value={user}>
            <div className="App">
                <Header />
                <NavBar categories={categories} />
                <Routes>
                    <Route path="/" element={<ReviewsList />} />
                    <Route
                        path="/categories/:category"
                        element={<ReviewsList categories={categories} />}
                    />
                    <Route
                        path="/reviews/:review_id"
                        element={<SingleReview />}
                    />
                    <Route path="/*" element={<h2>404: page not found</h2>} />
                </Routes>
            </div>
        </UserContext.Provider>
    );
}

export default App;
