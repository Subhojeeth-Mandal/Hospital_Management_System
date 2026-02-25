import { useState, useEffect } from "react";
import { doctorAPI } from "../Api/Api.jsx";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    contact: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const res = await doctorAPI.getAll();
      setDoctors(res.data);
    } catch (err) {
      console.error("Error loading doctors", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await doctorAPI.create(form);
      setForm({ name: "", specialization: "", contact: "" });
      loadDoctors();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="doctor-page">
      <h2 className="doctor-title">Medical Staff</h2>

      {/* Add Doctor */}
      <form className="doctor-form" onSubmit={handleSubmit}>
        <h3>Register New Doctor</h3>

        <div className="doctor-grid">
          <div>
            <label>Full Name</label>
            <input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="Dr. Smith"
              required
            />
          </div>

          <div>
            <label>Specialization</label>
            <input
              value={form.specialization}
              onChange={(e) =>
                setForm({ ...form, specialization: e.target.value })
              }
              placeholder="Cardiologist"
              required
            />
          </div>

          <div>
            <label>Contact Number</label>
            <input
              value={form.contact}
              onChange={(e) =>
                setForm({ ...form, contact: e.target.value })
              }
              placeholder="+91 9876543210"
              required
            />
          </div>

          <div className="submit">
            <button disabled={loading}>
              {loading ? "Adding..." : "Add Doctor"}
            </button>
          </div>
        </div>
      </form>

      {/* Doctors Cards */}
      <div className="doctor-grid-cards">
        {doctors.map((doc) => (
          <div className="doctor-card" key={doc.id}>
            <span className="doctor-id">ID {doc.id}</span>
            <h4>{doc.name}</h4>
            <p className="specialization">{doc.specialization}</p>
            <p className="contact">{doc.contact}</p>
          </div>
        ))}
      </div>

      {doctors.length === 0 && (
        <p className="empty">No doctors found in the system.</p>
      )}
    </div>
  );
}
