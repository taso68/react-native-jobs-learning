import axios from "axios";
import { useEffect, useState } from "react";

const rapidApiKey = 'a82e1d820bmshf85afbf19ab5dbfp120af4jsne1085bb03282';

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: {...query},
        headers: {
          'X-RapidAPI-Key': rapidApiKey,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
      };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res = await axios.request(options);
            setData(res.data.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            alert("There is an error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    };

    return {
        data, 
        isLoading, 
        error, 
        refetch
    };
}

export default useFetch;