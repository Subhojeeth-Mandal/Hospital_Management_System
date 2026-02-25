import { useState, useEffect } from 'react';
import { appointmentAPI, patientAPI, doctorAPI } from '../Api/Api.jsx';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    patientId: '',
    doctorId: '',
    appointmentDate: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [appts, pts, docs] = await Promise.all([
      appointmentAPI.getAll(),
      patientAPI.getAll(),
      doctorAPI.getAll()
    ]);
    setAppointments(appts.data);
    setPatients(pts.data);
    setDoctors(docs.data);
  };

  const getPatientName = (id) =>
    patients.find(p => p.id === id)?.name || `ID: ${id}`;

  const getDoctorName = (id) =>
    doctors.find(d => d.id === id)?.name || `ID: ${id}`;

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      await appointmentAPI.create(form);
      alert("Appointment Scheduled!");
      loadData();
    } catch (err) {
      alert(err.response?.data?.error || "Error booking appointment");
    }
  };

  return (
    <div className="appointments-page">
      <h2 className="page-title">Schedule Appointment</h2>

      <form className="appointment-card" onSubmit={handleBooking}>
        <div className="appointment-grid">
          <div className="field">
            <label>Patient</label>
            <select
              required
              onChange={e =>
                setForm({ ...form, patientId: Number(e.target.value) })
              }
            >
              <option value="">Select Patient</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Doctor</label>
            <select
              required
              onChange={e =>
                setForm({ ...form, doctorId: Number(e.target.value) })
              }
            >
              <option value="">Select Doctor</option>
              {doctors.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className="field wide">
            <label>Date & Time</label>
            <input
              type="datetime-local"
              required
              onChange={e =>
                setForm({ ...form, appointmentDate: e.target.value })
              }
            />
          </div>

          <button className="primary-btn">Book Appointment</button>
        </div>
      </form>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map(a => (
              <tr key={a.id}>
                <td className="strong">{getPatientName(a.patientId)}</td>
                <td>Dr. {getDoctorName(a.doctorId)}</td>
                <td>{new Date(a.appointmentDate).toLocaleString()}</td>
                <td>
                  <span className={`status ${a.status.toLowerCase()}`}>
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {appointments.length === 0 && (
          <div className="empty-state">
            No appointments scheduled.
          </div>
        )}
      </div>
    </div>
  );
}
