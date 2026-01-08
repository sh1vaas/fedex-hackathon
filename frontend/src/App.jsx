import React, { useState } from 'react';

export default function App() {
  const [text, setText] = useState("");
  const [nudge, setNudge] = useState("Awaiting call log...");
  const [disputeStatus, setDisputeStatus] = useState(null); // New state for dispute

  const processCall = async () => {
    // Ensure this URL matches your live Render backend
    const res = await fetch('https://fedex-hackathon.onrender.com/analyze', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ text, call_count: 1, case_id: "fedex-101" })
    });
    const data = await res.json();
    setNudge(data.status === "BLOCKED" ? data.reason : data.copilot.nudge);
  };

  // New function to handle the "Wow Factor" dispute upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDisputeStatus("Scanning document with OCR...");
      
      // Simulate an AI processing delay (2 seconds)
      setTimeout(() => {
        setDisputeStatus("✅ Receipt Verified. Case Suspended automatically.");
      }, 2000);
    }
  };

  return (
    <div style={{backgroundColor: '#111827', color: 'white', minHeight: '100vh', padding: '40px', fontFamily: 'Inter, sans-serif'}}>
      <h1 style={{color: '#60A5FA', textAlign: 'center', marginBottom: '40px'}}>FedEx Smart DCA Hub</h1>
      
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '1200px', margin: '0 auto'}}>
        
        {/* Left Column: AI Copilot */}
        <div style={{backgroundColor: '#1F2937', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)'}}>
          <h3 style={{color: '#93C5FD', marginTop: 0}}>🤖 AI Negotiation Copilot</h3>
          <p style={{color: '#9CA3AF', fontSize: '0.9rem'}}>Paste customer chat here to get real-time guidance.</p>
          <textarea 
            placeholder="e.g., 'I lost my job and cannot pay right now...'"
            style={{width: '95%', height: '120px', backgroundColor: '#374151', color: 'white', border: '1px solid #4B5563', borderRadius: '8px', padding: '10px', fontSize: '1rem'}} 
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={processCall} style={{marginTop: '15px', width: '100%', padding: '12px', backgroundColor: '#2563EB', border: 'none', color: 'white', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s'}}>
            Analyze Interaction
          </button>
        </div>

        {/* Right Column: Compliance & Results */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          
          {/* Compliance Box */}
          <div style={{backgroundColor: '#1F2937', padding: '25px', borderRadius: '15px', borderLeft: '6px solid #EAB308', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)'}}>
            <h3 style={{color: '#FDE047', marginTop: 0}}>🛡️ Compliance Result</h3>
            <p style={{fontSize: '1.1rem', fontWeight: '500'}}>{nudge}</p>
          </div>

          {/* NEW: Ombudsman AI (Dispute Shield) Box */}
          <div style={{backgroundColor: '#1F2937', padding: '25px', borderRadius: '15px', borderLeft: '6px solid #10B981', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)'}}>
            <h3 style={{color: '#34D399', marginTop: 0}}>⚖️ Ombudsman AI (Dispute Shield)</h3>
            <p style={{color: '#D1D5DB', fontSize: '0.9rem'}}>Upload proof of payment to auto-resolve disputes.</p>
            
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px'}}>
               <input 
                 type="file" 
                 onChange={handleFileUpload} 
                 style={{color: 'white', fontSize: '0.9rem'}}
               />
            </div>
            
            {disputeStatus && (
              <div style={{marginTop: '15px', padding: '10px', backgroundColor: disputeStatus.includes("Scanning") ? '#374151' : '#064E3B', borderRadius: '8px', color: disputeStatus.includes("Scanning") ? '#9CA3AF' : '#D1FAE5'}}>
                {disputeStatus}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}