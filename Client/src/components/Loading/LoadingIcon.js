import React from 'react';
import Icon from '../UI/Icon/Icon';
import { LOGO } from '../../constants/icon';
import styles from './LoadingIcon.module.css'

const LoadingIcon = () => {
  return (
  <div className={styles.loading}>
      <Icon width="96px" height="96px" fill="#099bf5" d={LOGO} />
  </div>
  );
};

export default LoadingIcon;
