import React from 'react';
import styled from 'styled-components';

import Square from './Square';
import SquareClick from './SquareClick';

const Container = styled.div`
  display:flex;
  justify-content: space-around;
  margin-top:10px;`;

function getSquare(square, defaultColor, toggleSquareColor) {
  if (square.clicked) {
    return <Square
      square={square}
      defaultColor={defaultColor}
      key={square.id.toString()} />;
  }
  else {
    return <SquareClick
      square={square}
      defaultColor={defaultColor}
      toggleSquareColor={toggleSquareColor}
      key={square.id.toString()} />;
  }
}

const SquareRow = ({ squareRow, defaultColor, toggleSquareColor }) => (
  <Container>
    {squareRow.map(square => getSquare(square, defaultColor, toggleSquareColor)
    )}
  </Container>
);

export default SquareRow;