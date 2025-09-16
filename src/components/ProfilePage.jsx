import { doc, setDoc } from "firebase/firestore"
import { useState } from "react"
import { useSelector } from "react-redux"
import { db } from "../firebase/config"
import { useNavigate } from "react-router-dom"

function ProfilePage() {
  const userId = useSelector((state) => state.auth.user.uid)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
  })

  function handleChange(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await setDoc(
        doc(db, "users", userId),
        {
          ...formData,
          profileCompleted: true,
        },
        { merge: true }
      )

      console.log("Profile updated successfully")
      navigate("/dashboard")
    } catch (error) {
      alert(error.message)
    }
  }

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
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          style={inputStyle}
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          style={inputStyle}
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          style={inputStyle}
        />
        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={buttonHover}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#1976d2")}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default ProfilePage

