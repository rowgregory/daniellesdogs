import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Logo } from './svg/Logo';
import SocialMediaNavbar from '../components/SocialMediaNavbar';
import { Text } from './elements';

const quickLinks = () => {
  return [
    {
      linkKey: 'Services',
      linkPath: '/services',
    },
    {
      linkKey: 'Gallery',
      linkPath: '/gallery',
    },
    {
      linkKey: 'Shop',
      linkPath: '/shop',
    },
    {
      linkKey: 'New Client Form',
      linkPath: '/new-client-form',
    },
    {
      linkKey: 'Contact Us',
      linkPath: '/contact-us',
    },
  ];
};

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10rem 1rem 1rem;
  background: ${({ theme }) => theme.colors.primary};
`;

const TopFooter = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1300px;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints[4]};
  margin: 0 6rem;
  display: flex;
  align-items: start;
  padding: 2rem 0 0;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    padding: 4.5rem 0;
    align-items: center;
    flex-direction: row;
    svg {
      margin-right: 2rem;
    }
  }
`;

const LinkWrapper = styled.div`
  width: 100%;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    display: grid;
    grid-template-columns: auto auto auto;
  }
`;
const LinkSection = styled.div`
  margin-bottom: 1.25rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    margin-bottom: 0;
  }
`;

const LinkCategory = styled.div`
  color: #aaa;
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const StyledLink = styled(Link)`
  font-size: 0.75rem;
  transition: 300ms;
  color: #aaa;
  font-weight: bold;
  text-decoration: none;
  letter-spacing: 0.06153846154em;
  line-height: 1.9230769231;
  :hover {
    filter: brightness(0.8);
    text-decoration: none;
  }
`;

const StyledExternalLink = styled.div`
  font-size: 0.75rem;
  transition: 300ms;
  cursor: pointer;
  color: #aaa;
  font-weight: bold;
  :hover {
    filter: brightness(0.8);
    text-decoration: none;
  }
  letter-spacing: 0.06153846154em;
  line-height: 1.9230769231;
`;

const StyledText = styled.div`
  font-size: 0.75rem;
  letter-spacing: 0.06153846154em;
  line-height: 1.9230769231;
  color: #aaa;
  font-weight: bold;
`;

const BottomFooter = styled.div`
  display: flex;
  max-width: ${({ theme }) => theme.breakpoints[4]};
  width: 100%;
  align-items: start;
  justify-content: space-between;
  flex-direction: column;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex-direction: row;
    align-items: center;
  }
`;

const Signature = styled.div`
  font-size: 0.75rem;
  transition: 300ms;
  cursor: pointer;
  color: #aaa;
  font-weight: bold;
  :hover {
    filter: brightness(0.8);
    text-decoration: none;
  }
  letter-spacing: 0.06153846154em;
  line-height: 1.9230769231;
  font-weight: bold;
`;

const LegalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    flex-direction: row;
  }
`;

const Footer = () => {
  const location = useLocation();

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          background: `linear-gradient(rgb(246, 246, 246) 0%, rgba(246, 246, 246, 0) 80%`,
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: '50%',
          zIndex: 10,
          width: '100%',
        }}
      ></div>
      {!location.pathname.includes('/admin') && (
        <StyledFooter>
          <TopFooter>
            <Logo fill='#aaa' />
            <LinkWrapper>
              <LinkSection>
                <LinkCategory>Our Address</LinkCategory>
                <StyledText>Address</StyledText>
                <StyledText>City, State, Zip Postal Code</StyledText>
              </LinkSection>
              <LinkSection>
                <LinkCategory>Quick Links</LinkCategory>
                <div className='d-flex flex-column'>
                  {quickLinks().map((l, i) => (
                    <StyledLink key={i} to={{ pathname: l.linkPath }}>
                      {l.linkKey}
                    </StyledLink>
                  ))}
                </div>
              </LinkSection>
              <LinkSection>
                <LinkCategory>Legal</LinkCategory>
                <StyledText>
                  &copy; {new Date().getFullYear()} Danielle's Dog's
                </StyledText>
                <StyledText>All Rights Reserved.</StyledText>
                <LegalWrapper>
                  <StyledExternalLink
                    onClick={() =>
                      window.open(
                        'https://www.privacypolicies.com/live/c37902bc-11cd-430e-a925-2b82ce905c88',
                        '_blank'
                      )
                    }
                  >
                    Privacy Policy
                  </StyledExternalLink>
                  <Text>&nbsp;/&nbsp;</Text>
                  <StyledExternalLink
                    onClick={() =>
                      window.open('https://oag.ca.gov/privacy/ccpa', '_blank')
                    }
                  >
                    California Consumer Privacy Act
                  </StyledExternalLink>
                  <Text>&nbsp;/&nbsp;</Text>
                  <StyledExternalLink
                    onClick={() =>
                      window.open(
                        'https://www.termsandconditionsgenerator.com/live.php?token=K9R7fXZjABJKZhIWlXr43oY6qca6jjVn',
                        '_blank'
                      )
                    }
                  >
                    Terns & Conditions
                  </StyledExternalLink>
                </LegalWrapper>
              </LinkSection>
            </LinkWrapper>
          </TopFooter>
          <BottomFooter>
            <SocialMediaNavbar />
            <StyledExternalLink onClick={() => window.scrollTo({ top: 0 })}>
              Top
            </StyledExternalLink>
            <Signature>Developed by Gregory Row</Signature>
          </BottomFooter>
        </StyledFooter>
      )}
    </div>
  );
};

export default Footer;
