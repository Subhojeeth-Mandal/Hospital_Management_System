import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    const [isEmergencyActive, setIsEmergencyActive] = useState(false);
    const [emergencyText, setEmergencyText] = useState("");
    const [isSent, setIsSent] = useState(false);

    const handleSOSClick = () => {
        setIsEmergencyActive(true);
        setIsSent(false);
    };

    const handleSubmitEmergency = (e) => {
        e.preventDefault();
        if (emergencyText.trim()) {
            console.log("ALERT SENT:", emergencyText); // Here you would call an API
            setIsSent(true);
            setEmergencyText("");
            // Auto-close health alert after 3 seconds
            setTimeout(() => {
                setIsEmergencyActive(false);
                setIsSent(false);
            }, 3000);
        }
    };

    return (
        <>
            <nav className="hospital-navbar">
                <div className="nav-container">
                    <NavLink to="/" className="nav-brand">
                        <span className="brand-icon">🏥</span>
                        <span className="brand-text">MedFlow<span className="brand-sub">Max</span></span>
                    </NavLink>

                    <div className="nav-links">
                        <NavLink className="nav-item" to="/patients">Patients</NavLink>
                        <NavLink className="nav-item" to="/doctors">Doctors</NavLink>
                        <NavLink className="nav-item" to="/appointments">Appointments</NavLink>
                        <NavLink className="nav-item" to="/billing">Billing</NavLink>
                    </div>

                    <div className="nav-actions">
                        <button className="emergency-btn" onClick={handleSOSClick}>
                            Emergency SOS
                        </button>
                    </div>
                </div>
            </nav>

            {/* Emergency Overlay/Modal */}
            {isEmergencyActive && (
                <div className="emergency-overlay">
                    <div className="emergency-modal">
                        {!isSent ? (
                            <>
                                <h3>🚨 Emergency Protocol</h3>
                                <p>Describe the emergency situation immediately:</p>
                                <form onSubmit={handleSubmitEmergency}>
                                    <textarea 
                                        autoFocus
                                        placeholder="E.g. Cardiac arrest in Room 302, Ambulance required at North Gate..."
                                        value={emergencyText}
                                        onChange={(e) => setEmergencyText(e.target.value)}
                                        required
                                    />
                                    <div className="modal-btns">
                                        <button type="button" className="btn-cancel" onClick={() => setIsEmergencyActive(false)}>Cancel</button>
                                        <button type="submit" className="btn-send">Broadast Alert</button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <div className="success-msg">
                                <span className="check-icon">✅</span>
                                <h3>SOS SENT!</h3>
                                <p>Emergency teams and security have been notified.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}