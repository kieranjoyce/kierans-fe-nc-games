import { createContext } from "react";
import type { User } from "../types";

export const UserContext = createContext<User>({
    username: "happyamy2016",
    name: "Amy Happy",
    avatar_url:
        "https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729",
});
