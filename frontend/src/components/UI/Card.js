import { Fragment } from 'react';
import classes from './Card.module.css';

const Card = props => {
  
  return <Fragment className={classes.card}>{props.children}</Fragment>
};

export default Card;