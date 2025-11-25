import React from 'react';
import styles from './TrustedBy.module.css';
import trustedByImage from '../../assets/Group 2147223751.svg';

const TrustedBy = () => {
  return (
    <section className={styles.trustedBy}>
      <div className={styles.container}>
        <p className={styles.subtitle}>Trusted by leading companies</p>
        <div className={styles.logos}>
          <img 
            src={trustedByImage} 
            alt="Trusted by leading companies"
            className={styles.logoImage}
          />
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;