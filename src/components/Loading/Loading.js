import React from 'react';
import Icon from '../UI/Icon/Icon';
import { LOGO } from '../../utils/icon';
import classes from './Loading.module.css'

const Loading = () => {
  return (
  <div className={classes.loading}>
      <Icon width="96px" height="96px" fill="#099bf5" d={LOGO} />
  </div>
  );
};

export default Loading;
