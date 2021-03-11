/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { Col } from 'react-bootstrap';
import styled from 'styled-components';

const MyColCustom = styled(Col)` 
    border: 1px solid black;
    font-size: 2em;
    color: white;
    background-color: ${(props) => props.bg};
    transition: box-shadow 350ms ease-in-out;
    &:hover {
        box-shadow: 5px 10px 18px #888888;
        color: black;
        font-size: 2.1em;
    }
`;

const ColorMarker = styled.span` 
    color: ${(props) => props.color};
`;

export {
    MyColCustom,
    ColorMarker,
};