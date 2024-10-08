import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";

export default function DefaultLayout() {
    const { user, token, setUser, setToken, notification } = useStateContext();
    if (!token) {
        return <Navigate to="/login" />
    }
    const onLogout = ev => {
        ev.preventDefault()
        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
    }
    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data)
            })
    }, [])

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
                <Link to="/blogs">Blogs</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Data Management System
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', padding: 0 }}>
                        <span > {user.name}</span>
                        <span > {user.email}</span>

                        <a onClick={onLogout} className="btn-logout">Logout</a>
                    </div>

                </header>
                <main>
                    <Outlet />
                </main>
                {
                    notification &&
                    <div className="notification">
                        {notification}
                    </div>
                }
            </div >
        </div >
    )
}