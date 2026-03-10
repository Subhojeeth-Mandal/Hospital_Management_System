import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Patients from './Pages/Patients';
import Doctors from './Pages/Doctors'; // Import added
import Appointments from './Pages/Appointments';
import Billing from './Pages/Billing';
import banner from "./assets/Banner.png"

function App() {
  return (
    <Router>
      <div className="app-viewport">
        {/* Ambient background elements */}
        <div className="ambient-glow"></div>
        
        <Navbar />
        
        <main className="content-container">
          <Routes>
            <Route path="/patients" element={<Patients />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/" element={
              <div className="hero-grid">
                <section className="hero-text">
                  <span className="status-badge">System Live: v2.4</span>
                  <h1 className="title-gradient">MedFlow<span>Max</span></h1>
                  <p className="description">
                    The next-gen clinical operating system. Streamline patient care 
                    with real-time data synchronization and intelligent scheduling.
                  </p>
                  <div className="cta-group">
                    <Link to="/appointments" className="btn-primary">Schedule Now</Link>
                    <Link to="/patients" className="btn-secondary">View Records</Link>
                  </div>
                </section>

                <section className="hero-visual">
                  <div className="banner-wrapper">
                    <img src={banner} alt="MedFlow Dashboard" className="floating-banner" />
                    <div className="stat-overlay">
                      <div className="mini-card">
                        <span className="dot pulse"></span>
                        <strong>12</strong> Pending Ops
                      </div>
                    </div>
                  </div>
                </section>
                
                {/* Interactive Quick-Access Cards */}
                <section className="quick-access">
                    <Link to="/appointments">
                      <div className="info-card featured">
                        <div className="icon">📅</div>
                        <h4>Today's Schedule</h4>
                        <p>14 Appointments remaining</p>
                      </div>
                    </Link>
                    <Link to="/doctors">
                      <div className="info-card featured">
                        <div className="icon">🩺</div>
                        <h4>On-Call Doctors</h4>
                        <p>8 Specialized units active</p>
                      </div>
                    </Link>
                    <Link to="/billing">
                      <div className="info-card featured">
                        <div className="icon">💳</div>
                        <h4>Recent Billing</h4>
                        <p>3 Pending invoices</p>
                      </div>
                    </Link>
                </section>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;