import React from 'react';

const Leaderboard = ({ users }) => {
  const getRankClass = (rank) => {
    if (rank === 1) return 'rank-1';
    if (rank === 2) return 'rank-2';
    if (rank === 3) return 'rank-3';
    return '';
  };

  const getRankEmoji = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '🏅';
  };

  return (
    <div>
      <h2>🏆 Leaderboard</h2>
      <div className="leaderboard">
        {users.length === 0 ? (
          <div className="loading">No users found</div>
        ) : (
          users.map((user) => (
            <div 
              key={user._id} 
              className={`leaderboard-item ${getRankClass(user.rank)}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div className={`rank-badge ${getRankClass(user.rank)}`}>
                  {getRankEmoji(user.rank)}
                </div>
                <div className="user-info">
                  <h3>{user.name}</h3>
                  <div style={{ fontSize: '14px', color: '#6c757d' }}>
                    Rank #{user.rank}
                  </div>
                </div>
              </div>
              <div className="user-points">
                {user.totalPoints} pts
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
