import { useState } from 'react';
import { billAPI } from '../Api/Api.jsx';

export default function Billing() {
  const [searchId, setSearchId] = useState('');
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newBill, setNewBill] = useState({
    patientId: '',
    amount: '',
    status: 'UNPAID',
    billingDate: new Date().toISOString().split('T')[0]
  });

  const handleSearch = async () => {
    if (!searchId) return alert('Please enter Patient ID');

    try {
      const res = await billAPI.getByPatient(searchId);
      // Check if response is empty or if the bills list is empty
      if (!res.data || res.data.length === 0) {
        alert(`No patient details or billing records found for ID: ${searchId}`);
        setBills([]); // Clear the table if no data is found
      } else {
        setBills(res.data);
      }
    } catch (err) {
      // Handles 404 errors or network issues
      alert('No records found for this Patient ID.');
      setBills([]);
    }
  };

  const handleCreateBill = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await billAPI.create(newBill);
      alert('Bill Generated Successfully!');
      setNewBill({
        patientId: '',
        amount: '',
        status: 'UNPAID',
        billingDate: new Date().toISOString().split('T')[0]
      });
      if (searchId === newBill.patientId) handleSearch();
    } catch (err) {
      alert(err.response?.data?.message || 'Error generating bill');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="billing-page">
      <h2 className="billing-title">Billing Management</h2>

      {/* CREATE BILL */}
      <form className="billing-form" onSubmit={handleCreateBill}>
        <h3>Create New Bill</h3>

        <div className="billing-grid">
          <div>
            <label>Patient ID</label>
            <input
              type="number"
              value={newBill.patientId}
              onChange={(e) =>
                setNewBill({ ...newBill, patientId: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label>Amount ($)</label>
            <input
              type="number"
              value={newBill.amount}
              onChange={(e) =>
                setNewBill({ ...newBill, amount: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label>Billing Date</label>
            <input type="date" value={newBill.billingDate} disabled />
          </div>

          <div>
            <label>Status</label>
            <select
              value={newBill.status}
              onChange={(e) =>
                setNewBill({ ...newBill, status: e.target.value })
              }
            >
              <option value="UNPAID">UNPAID</option>
              <option value="PAID">PAID</option>
            </select>
          </div>

          <div className="submit">
            <button disabled={loading}>
              {loading ? 'Processing...' : 'Generate Bill'}
            </button>
          </div>
        </div>
      </form>

      {/* SEARCH */}
      <div className="billing-search">
        <h3>Patient Invoice History</h3>

        <div className="search-box">
          <input
            type="number"
            placeholder="Enter Patient ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {bills.length > 0 ? (
          <div className="billing-table">
            <table>
              <thead>
                <tr>
                  <th>Bill #</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((b) => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.billingDate}</td>
                    <td>₹{b.amount}</td>
                    <td>
                      <span className={`status ${b.status.toLowerCase()}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="empty">Search a patient to view invoices</p>
        )}
      </div>
    </div>
  );
}
