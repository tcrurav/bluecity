/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const MyColCustom = styled(Button)({
    border: '1px solid black',
    borderRadius: '4px',
    fontSize: '2em',
    color: 'white',
    backgroundColor: (props) => props.bg,
    transition: 'box-shadow 350ms ease-in-out',
    '& :hover': {
        color: 'black'
    },
    marginBottom: '1vh',
    marginRight: '1vh'
});

const ColorMarker = styled(Box) ({
    color: (props) => props.color
});

export {
    MyColCustom,
    ColorMarker,
};