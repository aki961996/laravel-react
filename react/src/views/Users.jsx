import { useEffect, useState } from "react"
import axiosClient from "../axios-client";

import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Users() {
    const [query, setQuery] = useState('');  // To store the search input

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(false);

    const { setNotification } = useStateContext();

    const [page, setPage] = useState(1); // Initialize page state
    const [pagination, setPagination] = useState({
        current_page: 1,
        per_page: 10,
        total: 0,
        total_pages: 0,
    });

    // useEffect(() => {
    //     getUsers();

    // }, [])

    useEffect(() => {
        getUsers(page); // Fetch users when component mounts or page changes
    }, [page]);


    const onDeleteClick = user => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return
        }
        axiosClient.delete(`/users/${user.id}`)
            .then(() => {
                setNotification('User was successfully deleted')
                getUsers()
            })
    }

    // const getUsers = (pageNumber = 1) => {
    //     setLoading(true)
    //     axiosClient.get(`/users?page=${pageNumber}`)
    //         .then(({ data }) => {
    //             setLoading(false)
    //             // console.log(data, 'user data');
    //             setUsers(data.data)

    //             setPagination({
    //                 current_page: data.meta.current_page,
    //                 per_page: data.meta.per_page,
    //                 total: data.meta.total,
    //                 total_pages: data.meta.last_page,
    //             });
    //             setPage(pageNumber); // Update the current page
    //         })
    //         .catch(() => {
    //             setLoading(false)
    //         })
    // }

    const getUsers = (pageNumber = 1) => {
        setLoading(true);

        // Pass the search query along with the page number in the API request
        axiosClient.get(`/users`, {
            params: {
                page: pageNumber,
                search: query,  // Add the search query here
            }
        })
            .then(({ data }) => {
                setLoading(false);

                setUsers(data.data); // Set the user data

                setPagination({
                    current_page: data.meta.current_page,
                    per_page: data.meta.per_page,
                    total: data.meta.total,
                    total_pages: data.meta.last_page,
                });
                setPage(pageNumber); // Update the current page
            })
            .catch(() => {
                setLoading(false);
            });
    };


    // Function to handle form submission
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        getUsers();

    };


    return (

        <div>
            <form onSubmit={handleSearchSubmit}>
                {/* Text Input */}
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <div style={{ width: '45%', marginRight: '20px' }}>

                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Enter your name"
                        />
                    </div>
                    <button className="btn-add" type="submit">Search</button>
                </div>

            </form>

            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <h1>Users</h1>
                <Link className="btn-add" to="/users/new">Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    {loading &&
                        <tbody>
                            <tr>
                                <td colSpan="5" class="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    }

                    {!loading &&
                        <tbody>
                            {users.map((u, index) => (
                                <tr key={u.id}>
                                    <td>{index + 1}</td>
                                    {/* <td>{u.id}</td> */}
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.created_at}</td>
                                    <td>
                                        <Link className="btn-primary custom-class another-class" to={`/users/view/${u.id}`}>View</Link>
                                        <Link className="btn-edit " to={`/users/${u.id}`}>Edit</Link>
                                        <button className="btn-delete" onClick={() => onDeleteClick(u)}>Delete</button>
                                    </td>
                                </tr>

                            ))}

                        </tbody>
                    }
                </table>


                {/* Pagination Controls */}
                {!loading &&
                    <div className="pagination-controls">
                        <button onClick={() => getUsers(page - 1)} disabled={page === 1}>Previous</button>
                        <span>Page {pagination.current_page} of {pagination.total_pages}</span>
                        <button onClick={() => getUsers(page + 1)} disabled={page === pagination.total_pages}>Next</button>
                    </div>
                }
            </div>
        </div>
    )
}