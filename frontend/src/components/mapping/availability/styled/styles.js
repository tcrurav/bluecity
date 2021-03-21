/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { Col } from 'react-bootstrap';
import Button from '@material-ui/core/Button'
import styled from 'styled-components';

const MyColCustom = styled(Button)` 
    border: 1px solid black;
    border-radius: 4px;
    font-size: 2em;
    color: white;
    background-color: ${(props) => props.bg};
    transition: box-shadow 350ms ease-in-out;
    &:hover {
        color: black;
    }
    margin-bottom: 1vh;
    margin-right: 1vh;
`;

const ColorMarker = styled.span` 
    color: ${(props) => props.color};
`;

export {
    MyColCustom,
    ColorMarker,
};