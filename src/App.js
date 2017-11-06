
import React from 'react';
import styled from 'styled-components';
import { compose, withState, withHandlers } from 'recompose';
import { flatten, findIndex } from 'lodash';

import GameBoard from './GameBoard';

import { GameBoardSize, colorArray, defaultColor } from './GameConstants';


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const Container = styled.div`
`;

const Score = styled.div`
  color: black;
  height: 100px;`;

const Game = ({
  round,
  squareArray,
  toggleSquareColor,
  reRun
   }) => (
    <Container>
      <Score>Round:{round}<button onClick={reRun}>Re-Run</button></Score>
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
  const randomizeArray = shuffleArray(concatSquareArray);
  return randomizeArray;
}

function changeSquareArray(squareArray, setSquareArray, id) {
  const elementIndex = findIndex(squareArray, (element) => { return id === element.id; });
debugger; 
  const changedSquareObject = Object.assign(
    {},
    squareArray[elementIndex],
    { clicked: !squareArray[elementIndex].clicked }
  );
  squareArray[elementIndex] = changedSquareObject;
  setSquareArray(squareArray);
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
          changeSquareArray(props.squareArray, props.setSquareArray, id);
          setTimeout(() => {
            props.setRound(newRound); 
            props.setSelectedElementColor('');
            changeSquareArray(props.squareArray, props.setSquareArray, id);
            debugger; 
            changeSquareArray(props.squareArray, props.setSquareArray, props.selectedElementId);
            props.setSelectedElementId(0);
          }, 1000);
        }
      }
    },
    reRun: props => () =>{

      props.setRound(1); 
      props.setSquareArray(SquareArray(colorArray)); 
    }
  }),
);

export default enhance(Game);
