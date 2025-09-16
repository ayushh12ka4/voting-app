import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { registerUser, resetStatus } from "../redux/authSlice"
import { useNavigate } from "react-router-dom"

function RegisterPage(){
  const { user, status, error } = useSelector(state => state.auth)
  const [formData,setFormData] = useState({email:"",password:""})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleChange(e){
    const {value, name} = e.target 
    setFormData({...formData,[name]:value})
  }

  function handleSubmit(e){
    e.preventDefault()
    dispatch(registerUser(formData))
  }

  useEffect(() => {
    if (user && status === "succeeded") {
      navigate("/login") // changed to login
      dispatch(resetStatus())
    }
  }, [user, status, navigate, dispatch])

  return(
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Register</h2>

        <input 
          type="email" 
          value={formData.email} 
          name="email" 
          onChange={handleChange} 
          placeholder="Email"
          style={styles.input}
        />
        <input 
          type="password" 
          value={formData.password} 
          name="password" 
          onChange={handleChange} 
          placeholder="Password"
          style={styles.input}
        />
        <button 
          type="submit" 
          disabled={status==="pending"} 
          style={status==="pending" ? styles.buttonDisabled : styles.button}
        >
          {status==="pending" ? "Registering..." : "Register"}
        </button>

        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f0f2f5",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "40px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    width: "300px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  buttonDisabled: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#a5d6a7",
    color: "#fff",
    fontSize: "16px",
    cursor: "not-allowed",
  },
  error: {
    marginTop: "10px",
    color: "red",
    textAlign: "center",
  }
}

export default RegisterPage

