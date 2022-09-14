import React from 'react';
import styled from 'styled-components';

const InsideContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SMIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  transition: 300ms;
  cursor: pointer;
  border-radius: 15px;
  :hover {
    background: ${({ theme }) => theme.colors.tertiary};
    color: #aaa;
  }
`;

const SMData = () => [
  {
    popTag: 'Instagram',
    className: 'fa-brands fa-instagram fa-lg px-2',
    color: '#aaa',
    linkKey: 'https://www.instagram.com/danielles__dogs/?hl=en',
  },
  {
    popTag: 'Facebook',
    className: 'fa-brands fa-facebook-f fa-lg px-2',
    color: '#aaa',
    linkKey: 'https://www.facebook.com/DaniellesDogs',
  },
];

const SocialMediaNavbar = () => {
  return (
    <>
      <InsideContainer>
        {SMData().map((obj: any, i: number) => (
          <SMIconContainer
            key={i}
            onClick={() => window.open(obj.linkKey, '_blank')}
          >
            <i className={obj.className} style={{ color: obj.color }}></i>
          </SMIconContainer>
        ))}
      </InsideContainer>
    </>
  );
};

export default SocialMediaNavbar;
