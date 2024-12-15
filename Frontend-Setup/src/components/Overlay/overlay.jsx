import React from 'react';
import styles from './overlay.module.css'; // Import the CSS module

const Overlay = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.blur}></div>
    </div>
  );
};

export default Overlay;
