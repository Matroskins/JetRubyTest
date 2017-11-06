
import React from 'react';
import styled from 'styled-components';
import { compose, withState, withHandlers } from 'recompose';
import { flatten } from 'lodash';

import GameBoard from './GameBoard';

import { GameBoardSize, colorArray, defaultColor } from './GameConstants';

const Container = styled.div`
`;

const Score = styled.div`
color: black;
height: 100px;`;

const Game = ({
  round,
  squareArray,
  toggleSquareColor
   }) => (
    <Container>
      <Score>Round:{round}</Score>
      <GameBoard
        squareArray={squareArray}
        defaultColor={defaultColor}
        width={GameBoardSize.width}
        toggleSquareColor={toggleSquareColor} />
    </Container>
  );


function SquareArray(colorArrayArg) {
  let id = 1;
  function Square(color) {
    const twoSquareArray = [];
    for (let i = 0; i < 2; i += 1) {
      twoSquareArray.push({
        id,
        color,
        clicked: false
      });
      id += 1;
    }
    return twoSquareArray;
  }
  const squareArray = colorArrayArg.map(color => {
    return Square(color);
  })

  const concatSquareArray = flatten(squareArray);
  return concatSquareArray;
}

function changeSquareArray(squareArray, setSquareArray, id) {
  const elementIndex = squareArray.findIndex((element) => { return id === element.id; });
  const changedSquareObject = Object.assign(
    {},
    squareArray[elementIndex],
    { clicked: !squareArray[elementIndex].clicked }
  );
  squareArray[elementIndex] = changedSquareObject;

  return setSquareArray;
}

const enhance = compose(
  withState('squareArray', 'setSquareArray', () => SquareArray(colorArray)),
  withState('selectedElementId', 'setSelectedElementId', 0),
  withState('selectedElementColor', 'setSelectedElementColor', ''),
  withState('round', 'setRound', 1),
  withHandlers({
    toggleSquareColor: props => (id, color) => {
      if (props.selectedElementId === 0) {
        props.setSelectedElementId(id);
        props.setSelectedElementColor(color);
        changeSquareArray(props.squareArray, props.setSquareArray, id);
      }
      else {
        if (color === props.selectedElementColor) {
          const newRound =props.round + 1; 
          props.setRound(newRound); 
          props.setSelectedElementId(0);
          props.setSelectedElementColor('');

          changeSquareArray(props.squareArray, props.setSquareArray, id);
        }
        else {
          const newRound =props.round + 1; 
          props.setRound(newRound); 
          props.setSelectedElementColor('');
          changeSquareArray(props.squareArray, props.setSquareArray, props.selectedElementId);
          props.setSelectedElementId(0);
        }
      }
    },
  }),
);

export default enhance(Game);
