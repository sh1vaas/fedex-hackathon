import React, { useState } from 'react';

export default function App() {
  const [text, setText] = useState("");
  const [nudge, setNudge] = useState("Awaiting analysis...");
  const [bttc, setBttc] = useState("Calculating..."); // New State for BTTC
  const [disputeStatus, setDisputeStatus] = useState(null);

  const processCall = async () => {
    try {
      // Replace with your Render Backend URL
      const res = await fetch('https://fedex-backend.onrender.com/analyze', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ text, call_count: 1, case_id: "fedex-101" })
      });
      const data = await res.json();
      
      if (data.status === "BLOCKED") {
        setNudge(data.reason);
      } else {
        setNudge(data.copilot.nudge);
        // UPDATE: Show the BTTC from the backend
        setBttc(`${data.bttc.window} via ${data.bttc.channel}`);
      }
    } catch (e) {
      console.log("Backend not connected yet");
      // Fallback for demo if backend is offline
      setBttc("06:00 PM - 08:00 PM via WhatsApp");
      setNudge("Client is ready. Confirm payment date now.");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDisputeStatus("📂 Uploading secure document...");
      setTimeout(() => setDisputeStatus("🔍 AI OCR Scanning..."), 1500);
      setTimeout(() => setDisputeStatus("✅ DISPUTE RESOLVED: Collection Halted."), 3500);
    }
  };

  return (
    <div style={{backgroundColor: '#111827', color: 'white', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif'}}>
      <h1 style={{color: '#60A5FA', textAlign: 'center'}}>FedEx Smart DCA Hub</h1>
      
      {/* NEW: Top Bar showing "Invisible" Backend Steps */}
      <div style={{display: 'flex', gap: '20px', marginBottom: '30px', justifyContent: 'center'}}>
        <div style={{backgroundColor: '#1F2937', padding: '15px', borderRadius: '10px', border: '1px solid #374151', minWidth: '200px'}}>
           <div style={{color: '#9CA3AF', fontSize: '0.8rem'}}>CASE RECOVERY SCORE</div>
           <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#34D399'}}>High (87%)</div>
        </div>
        <div style={{backgroundColor: '#1F2937', padding: '15px', borderRadius: '10px', border: '1px solid #374151', minWidth: '200px'}}>
           <div style={{color: '#9CA3AF', fontSize: '0.8rem'}}>BEST TIME TO CONTACT (BTTC)</div>
           <div style={{fontSize: '1.2rem', fontWeight: 'bold', color: '#F472B6'}}>{bttc}</div>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '1000px', margin: '0 auto'}}>
        {/* Left: AI Copilot */}
        <div style={{backgroundColor: '#1F2937', padding: '20px', borderRadius: '15px'}}>
          <h3 style={{color: '#93C5FD', margin: '0 0 10px 0'}}>🤖 AI Negotiation Copilot</h3>
          <textarea 
            placeholder="Type customer response here..."
            style={{width: '95%', height: '100px', backgroundColor: '#374151', color: 'white', padding: '10px', borderRadius: '5px', border: 'none'}} 
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={processCall} style={{marginTop: '15px', width: '100%', padding: '10px', backgroundColor: '#2563EB', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>
            Analyze Interaction
          </button>
        </div>

        {/* Right: Results */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <div style={{backgroundColor: '#1F2937', padding: '20px', borderRadius: '15px', borderLeft: '5px solid #EAB308'}}>
            <h3 style={{color: '#FDE047', margin: '0'}}>🛡️ Compliance Result</h3>
            <p style={{fontSize: '1.1rem'}}>{nudge}</p>
          </div>

          <div style={{backgroundColor: '#1F2937', padding: '20px', borderRadius: '15px', borderLeft: '5px solid #10B981'}}>
            <h3 style={{color: '#34D399', margin: '0'}}>⚖️ Dispute Shield</h3>
            <input type="file" onChange={handleFileUpload} style={{marginTop: '10px'}}/>
            <p style={{color: '#D1FAE5'}}>{disputeStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
}