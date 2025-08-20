import React, { useState } from 'react';

const UserControls = ({ users, onClaimPoints }) => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [claimResult, setClaimResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClaimPoints = async () => {
    if (!selectedUserId) {
      alert('Please select a user first');
      return;
    }

    setLoading(true);
    try {
      const result = await onClaimPoints(selectedUserId);
      setClaimResult(result);
      // Clear the result after 3 seconds
      setTimeout(() => setClaimResult(null), 3000);
    } catch (error) {
      alert('Failed to claim points');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-controls">
      {/* Claim Points Section */}
      <div className="control-section">
        <h3>Claim Points</h3>
        <div className="claim-section">
          <select 
            value={selectedUserId} 
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="user-select"
          >
            <option value="">Select a user</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>
                {user.name}
                {/* - {user.totalPoints} points */}
              </option>
            ))}
          </select>
          
          <button 
            onClick={handleClaimPoints}
            disabled={!selectedUserId || loading}
            className="btn btn-claim"
          >
            {loading ? 'Claiming...' : 'Claim Points'}
          </button>
        </div>

        {/* Display claim result */}
        {claimResult && (
          <div className="claim-result">
            <p>🎉 {claimResult.user.name} claimed {claimResult.pointsClaimed} points!</p>
            <p>New total: {claimResult.user.totalPoints} points</p>
            <p>New rank: #{claimResult.user.rank}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserControls;