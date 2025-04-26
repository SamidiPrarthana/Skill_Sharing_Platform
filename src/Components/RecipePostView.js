import React, { useEffect, useState } from "react";
import{ useNavigate} from "react-router-dom";
import axios from "axios";
import api from "../api/api";

function Allpost(){


    const [dataList, setDataList] = useState([]);
    const navigate=useNavigate();
    const getFetchData = async () => {
        try{
            const response = await axios.get("http://localhost:8080/api/v1/recipe/getAll");
            console.log(response.data);
            if (response.data.success) {
                setDataList(response.data.recipe);
                alert("Recipe  fetched successfully");
            } else {
                alert("Failed to fetch recipe");
            }
        }catch (error) {
            console.error("Error fetching data:", error);
            alert("Failed to fetch recipe");
        }
    };

    return(
        <div>

        </div>
    )
  
};
export default Allpost;