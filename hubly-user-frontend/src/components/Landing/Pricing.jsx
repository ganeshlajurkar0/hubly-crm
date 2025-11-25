import React from 'react';
import styles from './Pricing.module.css';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      description: 'Best for local businesses needing to improve their online reputation.',
      price: 199,
      period: 'monthly',
      features: [
        'Unlimited Users',
        'GRR Messaging',
        'Reputation Management',
        'GRR Call Tracking',
        '24/7 Award Winning Support'
      ]
    },
    {
      name: 'Grow',
      description: 'Best for all businesses that want to take full control of their marketing automation and track their leads, click to close.',
      price: 399,
      period: 'monthly',
      features: [
        'Pipeline Management',
        'Marketing Automation Campaigns',
        'Live Call Transfer',
        'GRR Messaging',
        'Embeddable Form Builder',
        'Reputation Management',
        '24/7 Award Winning Support'
      ]
    }
  ];

  return (
    <section className={styles.pricing}>
      <div className={styles.container}>
        <h2>We have plans for everyone!</h2>
        <p className={styles.description}>
          We started with a strong foundation, then along built all of the add-ons and marketing tools ALL businesses need under one platform.
        </p>
        
        <div className={styles.pricingCards}>
          {plans.map((plan, index) => (
            <div key={index} className={styles.pricingCard}>
              <h3 className={styles.planName}>{plan.name}</h3>
              <p className={styles.planDescription}>{plan.description}</p>
              <div className={styles.price}>
                ${plan.price}
                <span>/{plan.period}</span>
              </div>
              <ul className={styles.featuresList}>
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <a href="#" className={styles.btnPlan}>
                SIGN UP FOR {plan.name.toUpperCase()}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;