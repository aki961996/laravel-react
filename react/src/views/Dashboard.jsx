
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Dashboard() {
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        axiosClient.get(`/dashboard`)
            .then(({ data }) => {
                // console.log(data, 'dashboard data');
                setUserCount(data.userCount);
            })
            .catch(() => {
                console.error('There was an error fetching the user count!', error);
            })
    }, [])


    return (

        <div>
            <h1>User Count: {userCount}</h1>
        </div>

    )
}