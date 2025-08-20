import React from 'react';

const ClaimHistory = ({ history }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div>
      <h2>📊 Claim History</h2>
      <div className="history-list">
        {history.length === 0 ? (
          <div className="loading">No claim history yet</div>
        ) : (
          history.map((entry) => (
            <div key={entry._id} className="history-item">
              <div>
                <strong>{entry.userName}</strong> claimed <strong>{entry.pointsClaimed}</strong> points
                <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '5px' }}>
                  Total after claim: {entry.totalPointsAfterClaim} points
                </div>
              </div>
              <div className="history-time">
                {formatDate(entry.claimedAt)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClaimHistory;
