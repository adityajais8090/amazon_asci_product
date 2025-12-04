import axios from 'axios';

//shift it to the env once update
const API_URL = 'http://localhost:8000';

export const getData = async (data) => {
    try{
         const response = await axios.post(`${API_URL}/asin`, data);
         console.log("Here is the response", response.data);
          return response.data;
    }catch(err){
        console.log("Error while uploading files",err);
    }
}