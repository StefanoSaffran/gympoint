import React, { useState } from 'react';
import { MdMenu, MdClose } from 'react-icons/md';
import LinkWrapper from '~/helpers/LinkWrapper';

import { Container } from './styles';

export default function Menu() {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Container>
      <button type="button" onClick={handleMenu}>
        {showMenu ? <MdClose size={26} /> : <MdMenu size={26} />}
      </button>

      {showMenu ? (
        <div>
          <LinkWrapper to="/students">ALUNOS</LinkWrapper>
          <LinkWrapper to="/plans">PLANOS</LinkWrapper>
          <LinkWrapper to="/memberships">MATRÍCULAS</LinkWrapper>
          <LinkWrapper to="/helporders">PEDIDOS DE AUXÍLIO</LinkWrapper>
        </div>
      ) : null}
    </Container>
  );
}
