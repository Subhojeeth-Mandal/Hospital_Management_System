import { useState, useEffect } from "react";
import { patientAPI } from "../Api/Api.jsx";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ name: "", age: "", gender: "", contact: "", address: "" });
  const [errors, setErrors] = useState({});
  
  // States for the new Search System
  const [searchMobile, setSearchMobile] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => { loadPatients(); }, []);

  const loadPatients = async () => {
    try {
      const res = await patientAPI.getAll();
      setPatients(res.data);
    } catch (err) { console.error("Error loading patients", err); }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (form.age === '' || form.age === null)
        newErrors.age = "Age is required";
    else if (form.age < 0 || form.age > 100) 
        newErrors.age = "Age must be between 0 and 100";
    if (!form.gender) newErrors.gender = "Select gender";
    if (!/^[0-9]{10}$/.test(form.contact)) newErrors.contact = "10-digit number required";
    if (!form.address.trim()) newErrors.address = "Address required";

    // 1. Check if contact already exists in the local list
    const exists = patients.some(p => p.contact === form.contact);
    if (exists) {
        newErrors.contact = "A patient with this number already exists!";
        alert("CRITICAL: This mobile number is already registered in our system.");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
        await patientAPI.create(form);
        setForm({ name: "", age: "", gender: "", contact: "", address: "" });
        setErrors({});
        loadPatients();
        alert("Patient registered successfully!");
    } catch (err) { alert("Server Error: Could not save patient."); }
  };

  // 2. Search System Logic
  const handleSearch = () => {
    const found = patients.find(p => p.contact === searchMobile);
    if (found) {
        setSearchResult(found);
    } else {
        setSearchResult("NOT_FOUND");
    }
  };

  return (
    <div className="patient-page">
      <h2 className="patient-title">Patient Administration</h2>

      {/* MOBILE SEARCH SYSTEM */}
<div className="search-section">
  <h4>Quick Patient Lookup</h4>
  <div className="search-input-group">
    <input 
      type="text" 
      placeholder="Enter 10-digit mobile number..." 
      value={searchMobile}
      onChange={(e) => setSearchMobile(e.target.value)}
    />
    <button className="search-button" onClick={handleSearch}>Search</button>
  </div>

  {searchResult && searchResult !== "NOT_FOUND" && (
    <div className="result-card">
      <p><strong>Name:</strong> {searchResult.name} | <strong>ID:</strong> {searchResult.id}</p>
      <p><strong>Details:</strong> {searchResult.age} years old, {searchResult.gender}</p>
      <p><strong>Address:</strong> {searchResult.address}</p>
      <button className="clear-search-btn" onClick={() => setSearchResult(null)}>Clear Search</button>
    </div>
  )}

  {searchResult === "NOT_FOUND" && (
    <p className="not-found-text">No patient found with this mobile number.</p>
  )}
</div>
      <hr />

      {/* FORM */}
      <form className="patient-form" onSubmit={handleSubmit}>
        <div className="patient-grid">
          <div>
            <label>Full Name</label>
            <input className={errors.name ? "error" : ""} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter full name" />
            {errors.name && <span>{errors.name}</span>}
          </div>

          <div>
            <label>Age</label>
            <input type="number" className={errors.age ? "error" : ""} value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
            {errors.age && <span>{errors.age}</span>}
          </div>

          <div>
            <label>Gender</label>
            <div className="gender-group">
              <button type="button" className={form.gender === "Male" ? "active" : ""} onClick={() => setForm({ ...form, gender: "Male" })}>Male</button>
              <button type="button" className={form.gender === "Female" ? "active" : ""} onClick={() => setForm({ ...form, gender: "Female" })}>Female</button>
            </div>
            {errors.gender && <span>{errors.gender}</span>}
          </div>

          <div>
            <label>Contact (Mobile)</label>
            <input className={errors.contact ? "error" : ""} value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder="10 Digits" />
            {errors.contact && <span style={{color: 'red', fontWeight: 'bold'}}>{errors.contact}</span>}
          </div>

          <div className="full">
            <label>Address</label>
            <input className={errors.address ? "error" : ""} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            {errors.address && <span>{errors.address}</span>}
          </div>

          <div className="submit">
            <button style={{backgroundColor: '#28a745'}}>Register New Patient</button>
          </div>
        </div>
      </form>

      {/* TABLE */}
      <div className="patient-table">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Age</th><th>Gender</th><th>Contact</th><th>Address</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td><td>{p.name}</td><td>{p.age}</td><td>{p.gender}</td><td>{p.contact}</td><td>{p.address}</td>
                <td><button className="danger" onClick={() => {if(window.confirm("Delete this patient?")) patientAPI.delete(p.id).then(loadPatients)}}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}