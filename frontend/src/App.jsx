import React, { useState } from 'react';

export default function App() {
  const [text, setText] = useState("");
  const [nudge, setNudge] = useState("Awaiting call log...");

  const processCall = async () => {
    // Replace the URL below with your Render URL after Step 4
    const res = await fetch('https://your-backend-url.onrender.com/analyze', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ text, call_count: 1, case_id: "fedex-101" })
    });
    const data = await res.json();
    setNudge(data.status === "BLOCKED" ? data.reason : data.copilot.nudge);
  };

  return (
    <div style={{backgroundColor: '#111827', color: 'white', minHeight: '100vh', padding: '40px'}}>
      <h1 style={{color: '#60A5FA'}}>FedEx Smart DCA Hub</h1>
      <div style={{marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
        <div style={{backgroundColor: '#1F2937', padding: '20px', borderRadius: '10px'}}>
          <h3>AI Negotiation Copilot</h3>
          <textarea 
            style={{width: '100%', height: '100px', backgroundColor: '#030712', color: 'white'}} 
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={processCall} style={{marginTop: '10px', padding: '10px 20px', backgroundColor: '#2563EB', border: 'none', color: 'white', borderRadius: '5px'}}>
            Get AI Nudge
          </button>
        </div>
        <div style={{backgroundColor: '#1F2937', padding: '20px', borderRadius: '10px', borderLeft: '5px solid #EAB308'}}>
          <h3>Compliance Result</h3>
          <p>{nudge}</p>
        </div>
      </div>
    </div>
  );
}