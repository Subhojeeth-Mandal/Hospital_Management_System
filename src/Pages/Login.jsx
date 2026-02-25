import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you use react-router

export default function Login() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulated Admin Credentials (Replace with API call)
        const ADMIN_USER = "admin@medflowmax.com";
        const ADMIN_PASS = "admin123";

        if (credentials.username === ADMIN_USER && credentials.password === ADMIN_PASS) {
            // Success: Save token/session and redirect
            localStorage.setItem('isAdmin', 'true');
            setTimeout(() => {
                setLoading(false);
                navigate('/dashboard'); // Redirect to your main app
            }, 1000);
        } else {
            setLoading(false);
            setError('Invalid credentials. Access Denied.');
        }
    };

    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="card shadow-lg border-0" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px' }}>
                <div className="card-body p-5">
                    {/* Brand Header */}
                    <div className="text-center mb-4">
                        <div className="bg-primary text-white d-inline-block px-3 py-2 rounded-circle mb-2">
                            <i className="bi bi-hospital fs-1"></i> 🏥
                        </div>
                        <h2 className="fw-bold text-dark">MedFlowMax</h2>
                        <p className="text-muted">Hospital Admin Portal</p>
                    </div>

                    {error && <div className="alert alert-danger py-2 text-center small">{error}</div>}

                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Admin Email</label>
                            <input 
                                type="email" 
                                className="form-control form-control-lg bg-light border-0" 
                                placeholder="name@medflowmax.com"
                                value={credentials.username}
                                onChange={e => setCredentials({...credentials, username: e.target.value})}
                                required 
                            />
                        </div>

                        <div className="mb-4">
                            <div className="d-flex justify-content-between">
                                <label className="form-label fw-semibold">Password</label>
                                <small className="text-primary" style={{cursor: 'pointer'}} onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? 'Hide' : 'Show'}
                                </small>
                            </div>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                className="form-control form-control-lg bg-light border-0" 
                                placeholder="••••••••"
                                value={credentials.password}
                                onChange={e => setCredentials({...credentials, password: e.target.value})}
                                required 
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary btn-lg w-100 fw-bold shadow-sm"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="spinner-border spinner-border-sm me-2"></span>
                            ) : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <small className="text-muted">
                            Internal System • Restricted Access Only
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
}