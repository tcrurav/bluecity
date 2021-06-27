import React from 'react';
import { useMediaQuery } from 'react-responsive';

export function DisclaimerLinkText(props) {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  return (
    <>
      {isMobile ?
        <>
          <span>Política de Privacidad | Aviso Legal</span>
          <br />
          <span>Política de Cookies</span>
        </>
        :
        <span>Política de Privacidad | Aviso Legal | Política de Cookies</span>
      }
    </>
  );
}
