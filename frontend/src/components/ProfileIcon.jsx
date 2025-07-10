import React from 'react';

const ProfileIcon = () => {
  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const firstLetter = user?.name?.charAt(0).toUpperCase() || '?';

  return (
    <div style={{
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#7e57c2',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '18px',
      cursor: 'pointer'
    }}>
      {firstLetter}
    </div>
  );
};

export default ProfileIcon;
