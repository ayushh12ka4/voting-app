import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

function DashBoard() {
  const userId = useSelector((state) => state.auth.user?.uid)
  const [profile, setProfile] = useState(null)
  const [elections, setElections] = useState([])
  const navigate = useNavigate()

  async function fetchUser() {
    try {
      const snapShot = await getDoc(doc(db, "users", userId))
      setProfile(snapShot.data())
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (userId) fetchUser()
  }, [userId])

  async function fetchElections() {
    try {
      const querySnap = await getDocs(collection(db, "election2025"))
      const res = []
      querySnap.forEach((doc) => {
        res.push({ id: doc.id, ...doc.data() })
      })
      setElections(res)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchElections()
  }, [])

  const containerStyle = {
    padding: "20px",
    backgroundColor: "#f0f4f8",
    minHeight: "80vh"
  }

  const profileCardStyle = {
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "20px",
    maxWidth: "400px"
  }

  const electionContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px"
  }

  const electionCardStyle = {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "15px",
    width: "220px",
    backgroundColor: "white",
    boxShadow: "0 3px 8px rgba(0,0,0,0.08)"
  }

  const voteButtonStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#1976d2",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
    width: "100%",
    transition: "background 0.3s"
  }

  if (!profile) return <p>Loading profile...</p>

  if (!profile.profileCompleted) {
    return (
      <div style={{ padding: "20px" }}>
        <p>You must complete your profile first.</p>
        <button
          style={{ ...voteButtonStyle, width: "auto" }}
          onClick={() => navigate("/profile")}
        >
          Go to Profile
        </button>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      <div style={profileCardStyle}>
        <h2>Welcome, {profile.name}!</h2>
        <p><strong>Age:</strong> {profile.age}</p>
        <p><strong>Address:</strong> {profile.address}</p>
        <p><strong>Voter ID:</strong> {profile.voterId}</p>
      </div>

      <h3>Available Elections</h3>
      <div style={electionContainerStyle}>
        {elections.length === 0 && <p>No elections currently available.</p>}
        {elections.map((election) => (
          <div key={election.id} style={electionCardStyle}>
            <h4>{election.title}</h4>
            <p><strong>Candidates:</strong> {election.candidate?.join(", ")}</p>
            <p><strong>Date:</strong> {election.date}</p>
            <button
              style={voteButtonStyle}
              onClick={() => navigate(`/vote/${election.id}`)}
            >
              Vote
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashBoard

