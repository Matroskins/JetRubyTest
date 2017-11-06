import React from 'react';
import { compose, withHandlers } from 'recompose';

import Square from './Square';

const SquareClick = ({ onClick, square, defaultColor }) => <Square
  square={square}
  defaultColor={defaultColor}
  onClick={onClick} />


const enhance = compose(
  withHandlers({
    onClick: props => () => {
      props.toggleSquareColor(props.square.id, props.square.color);
    },
  })
);

export default enhance(SquareClick);