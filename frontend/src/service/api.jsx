import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL;

export const getData = async (data) => {
    try{
         const response = await axios.post(`${API_URL}/asin`, data);
         console.log("Here is the response", response.data);
          return response.data;
    }catch(err){
        console.log("Error while uploading files",err);
    }
}

export const getAllData = async() => {
    try{
         const response = await axios.get(`${API_URL}/product`);
         console.log("Here is the response", response.data);
          return response.data;
    }catch(err){
        console.log("Error while fetching all data",err);
    }
}