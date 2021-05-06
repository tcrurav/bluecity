/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { Map } from 'react-leaflet';
import styled from 'styled-components';

// const MyMap = styled(Map)`
//   &.leaflet-container {
//     width: auto;
//     height: 70vh;
//   }
// `;

const MyMap = styled(Map)`
  &.leaflet-container {
    width: auto;
    height: 55vh;
    maxHeight: 55vh;
  }
`;

export {
    MyMap
};