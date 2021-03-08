
import axios from "axios";

export const loadApiData = () => async => {
    
    const base_url = "https://api.coindesk.com/v1/bpi/currentprice/CNY.json";
    const fetchData = await axios.get(base_url);

    return(
        fetchData()
    )

}