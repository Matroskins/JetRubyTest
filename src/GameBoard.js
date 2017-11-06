import React from 'react';
import styled from 'styled-components';
import  {chunk } from 'lodash';

import SquareRow from './SquareRow';

const Container = styled.div``;


const GameBoard = ({ squareArray, defaultColor, width, toggleSquareColor }) => {
  const squareArrayTable = chunk(squareArray, width);
  return (
    <Container>
      {squareArrayTable.map(squareRow => <SquareRow
        squareRow={squareRow}
        defaultColor={defaultColor}
        toggleSquareColor={toggleSquareColor}
        key={squareRow[0].id.toString()} />)}
    </Container>);
};

export default GameBoard;

