import Container from 'react-bootstrap/Container';
import styled from 'styled-components';

export const MyContainer = styled(Container)`
  height: 100vh;
  padding-top: 75px;
  &:after { 
    content:''; 
    float:left;
    margin-bottom: 2em;
  }
`;