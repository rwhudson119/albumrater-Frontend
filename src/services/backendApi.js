import axios from "axios";
export default axios.create({
    baseURL: `https://album-rater-backend.herokuapp.com/`,
    //baseURL: `http://localhost:4000/`,
    
});