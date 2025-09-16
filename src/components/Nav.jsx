import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logoutUser } from "../redux/authSlice"

function Nav() {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const navStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        padding: "15px 20px",
        backgroundColor: "#1976d2", // blue theme
        color: "white",
        borderRadius: "10px",
        marginBottom: "20px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    }

    const linkStyle = {
        color: "white",
        textDecoration: "none",
        padding: "8px 15px",
        borderRadius: "5px",
        transition: "background 0.3s",
    }

    const linkHover = (e) => {
        e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
    }

    const linkLeave = (e) => {
        e.target.style.backgroundColor = "transparent"
    }

    const buttonStyle = {
        padding: "8px 15px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        backgroundColor: "#f44336", // red for logout
        color: "white",
        transition: "background 0.3s"
    }

    const buttonHover = (e) => {
        e.target.style.backgroundColor = "#d32f2f"
    }

    return (
        <div style={navStyle}>
            <Link to="/" style={linkStyle} onMouseEnter={linkHover} onMouseLeave={linkLeave}>Home</Link>
            {user && <Link to="/profile" style={linkStyle} onMouseEnter={linkHover} onMouseLeave={linkLeave}>Profile</Link>}
            {user && <Link to="/dashboard" style={linkStyle} onMouseEnter={linkHover} onMouseLeave={linkLeave}>Dashboard</Link>}
            {!user && <Link to="/register" style={linkStyle} onMouseEnter={linkHover} onMouseLeave={linkLeave}>Register</Link>}
            {!user && <Link to="/login" style={linkStyle} onMouseEnter={linkHover} onMouseLeave={linkLeave}>Login</Link>}
            {user && 
                <button 
                    style={buttonStyle} 
                    onClick={() => { dispatch(logoutUser()); navigate("/") }}
                    onMouseEnter={buttonHover} 
                    onMouseLeave={(e) => e.target.style.backgroundColor = "#f44336"}
                >
                    Logout
                </button>
            }
        </div>
    )
}

export default Nav
