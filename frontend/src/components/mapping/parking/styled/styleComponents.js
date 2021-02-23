/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { Map } from 'react-leaflet';
import styled from 'styled-components';

const MyMap = styled(Map)`
  &.leaflet-container {
    width: 100%;
    height: 70vh;
  }
`;

export {
    MyMap
};