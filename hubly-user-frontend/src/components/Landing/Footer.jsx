import React from 'react';
import styles from './Footer.module.css';
import logo from '../../assets/logo.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <img src={logo} alt="Hubly Logo" className={styles.logo} />
        </div>

        <div className={styles.content}>
          <div className={styles.column}>
            <h3>Product</h3>
            <ul>
              <li><a href="#universal-checkout">Universal checkout</a></li>
              <li><a href="#payment-workflows">Payment workflows</a></li>
              <li><a href="#observability">Observability</a></li>
              <li><a href="#uplift-ai">UpliftAI</a></li>
              <li><a href="#apps-integrations">Apps & integrations</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3>Why Primer</h3>
            <ul>
              <li><a href="#expand-markets">Expand to new markets</a></li>
              <li><a href="#boost-payment">Boost payment success</a></li>
              <li><a href="#improve-conversion">Improve conversion rates</a></li>
              <li><a href="#reduce-fraud">Reduce payments fraud</a></li>
              <li><a href="#recover-revenue">Recover revenue</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3>Developers</h3>
            <ul>
              <li><a href="#primer-docs">Primer Docs</a></li>
              <li><a href="#api-reference">API Reference</a></li>
              <li><a href="#payment-methods">Payment methods guide</a></li>
              <li><a href="#service-status">Service status</a></li>
              <li><a href="#community">Community</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3>Resources</h3>
            <ul>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#success-stories">Success stories</a></li>
              <li><a href="#news-room">News room</a></li>
              <li><a href="#terms">Terms</a></li>
              <li><a href="#privacy">Privacy</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3>Company</h3>
            <ul>
              <li><a href="#careers">Careers</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.social}>
          <a href="#email" className={styles.socialIcon}>✉</a>
          <a href="#linkedin" className={styles.socialIcon}>in</a>
          <a href="#twitter" className={styles.socialIcon}>𝕏</a>
          <a href="#youtube" className={styles.socialIcon}>▶</a>
          <a href="#slack" className={styles.socialIcon}>⌘</a>
          <a href="#discord" className={styles.socialIcon}>#</a>
          <a href="#instagram" className={styles.socialIcon}>◉</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;