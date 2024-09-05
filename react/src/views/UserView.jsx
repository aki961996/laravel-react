import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function UserView() {
    let { id } = useParams();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();
    // useEffect(() => {
    //     getUsers();

    // }, [])

    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false)
                    setUsers(data.data);
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }

    return (
        <>
            <div>
                <h1>User Details</h1>

                {loading ? (
                    <p>Loading...</p>
                ) : users ? (
                    <div className="user-details">
                        <p><strong>ID:</strong> {users.id}</p>
                        <p><strong>Name:</strong> {users.name}</p>
                        <p><strong>Email:</strong> {users.email}</p>
                        <p><strong>Created At:</strong> {users.created_at}</p>

                    </div>
                ) : (
                    <p>No user found</p>
                )}
            </div>
        </>
    )

}