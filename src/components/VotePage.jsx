import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { db } from "../firebase/config";

function VotePage() {
  const { electionId } = useParams();
  const user = useSelector(state => state.auth.user);
  const userId = user?.uid;
  const [election, setElection] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const navigate = useNavigate();

  // Fetch election data
  useEffect(() => {
    async function fetchElection() {
      const snap = await getDoc(doc(db, "election2025", electionId));
      if (snap.exists()) setElection({ id: snap.id, ...snap.data() });
    }
    fetchElection();
  }, [electionId]);

  async function handleVote() {
    if (!selectedCandidate) return alert("Please select a candidate.");
    try {
      const electionRef = doc(db, "election2025", electionId);
      await updateDoc(electionRef, {
        [`votes.${selectedCandidate}`]: (election.votes?.[selectedCandidate] || 0) + 1
      });

      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        votedElections: arrayUnion(electionId)
      });

      alert("Your vote has been submitted!");
      navigate("/dashboard");
    } catch (err) {
      console.log(err.message);
      alert("Error submitting vote.");
    }
  }

  // Hooks must always stay at top level
  if (!election) return <p>Loading election...</p>;

  if (user?.votedElections?.includes(electionId)) {
    return <p style={{ padding: "20px", fontWeight: "bold" }}>You have already voted in this election.</p>;
  }

  // --- Styles ---
  const containerStyle = {
    padding: "20px",
    backgroundColor: "#f0f4f8",
    minHeight: "80vh",
  };

  const cardStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    maxWidth: "500px",
    margin: "20px auto"
  };

  const candidateStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px"
  };

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
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "10px" }}>{election.title}</h2>
        <p style={{ marginBottom: "15px" }}><strong>Date:</strong> {election.date}</p>
        <h3 style={{ marginBottom: "10px" }}>Candidates:</h3>
        {election.candidate.map((c) => (
          <div key={c} style={candidateStyle}>
            <input
              type="radio"
              name="candidate"
              value={c}
              onChange={(e) => setSelectedCandidate(e.target.value)}
            />
            <label style={{ marginLeft: "8px" }}>{c}</label>
          </div>
        ))}
        <button style={voteButtonStyle} onClick={handleVote}>
          Submit Vote
        </button>
      </div>
    </div>
  );
}

export default VotePage;

