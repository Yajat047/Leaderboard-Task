import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserControls from './components/UserControls';
import AddUser from './components/AddUser';
import Leaderboard from './components/Leaderboard';
import ClaimHistory from './components/ClaimHistory';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

function App() {
  const [users, setUsers] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch users and rankings
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users');
    }
  };

  // Fetch claim history
  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/history`);
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  // Add new user
  const addUser = async (name) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, { name });
      await fetchUsers(); // Refresh the user list
      return response.data;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  };

  // Claim points for user
  const claimPoints = async (userId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/${userId}/claim`);
      await fetchUsers(); // Refresh the leaderboard
      await fetchHistory(); // Refresh the history
      return response.data;
    } catch (error) {
      console.error('Error claiming points:', error);
      throw error;
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      await Promise.all([fetchUsers(), fetchHistory()]);
      setLoading(false);
    };

    initializeData();
  }, []);

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* User Controls at the top - only claim points */}
      <UserControls 
        users={users} 
        onClaimPoints={claimPoints}
      />

      {/* Trophy Section */}
      <div className="trophy-section">
       
        <div className="trophy-icon">🏆</div>
        
        {/* Podium for top 3 */}
        {users.length >= 3 && (
          <div className="podium">
            {users.slice(0, 3).map((user, index) => (
              <div key={user._id} className={`podium-place ${
                index === 0 ? 'first' : index === 1 ? 'second' : 'third'
              }`}>
                <div className="podium-avatar">
                  {user.name.charAt(0).toUpperCase()}
                  <div className="podium-rank">{index + 1}</div>
                </div>
                <div className="podium-name">{user.name}</div>
                <div className="podium-points">
                  🏆 {user.totalPoints.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ranking List */}
      <div className="ranking-list">
        {users.slice(3).map((user, index) => (
          <div key={user._id} className="ranking-item">
            <div className="rank-number">{index + 4}</div>
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <div className="user-name">{user.name}</div>
            </div>
            <div className="user-points">
              🏆 {user.totalPoints.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* Add User Section - below leaderboard */}
      <AddUser onAddUser={addUser} />

      {/* Claim History */}
      <div className="history-section">
        <ClaimHistory history={history} />
      </div>
    </div>
  );
}

export default App;
