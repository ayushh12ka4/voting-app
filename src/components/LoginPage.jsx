import { loginUser } from "../redux/authSlice"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function LoginPage() {
  const user = useSelector(state => state.auth.user)
  const [formData, setFormData] = useState({ email: "", password: "" })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleChange(e) {
    const { value, name } = e.target
    setFormData({ ...formData, [name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(loginUser(formData))
  }

  useEffect(() => {
    if (user) navigate("/dashboard")
  }, [user, navigate])

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    backgroundColor: "#f0f4f8",
    padding: "20px"
  }

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "30px",
    borderRadius: "10px",
    backgroundColor: "white",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px"
  }

  const inputStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px"
  }

  const buttonStyle = {
    padding: "12px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#1976d2",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.3s"
  }

  const buttonHover = (e) => {
    e.target.style.backgroundColor = "#1565c0"
  }

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          style={inputStyle}
        />
        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={buttonHover}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#1976d2")}
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
