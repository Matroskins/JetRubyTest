
import styled from 'styled-components';

export default styled.div`
  background-color: ${props => (props.square.clicked ? props.square.color : props.defaultColor)};
  width: 105px;
  height: 100px;`;