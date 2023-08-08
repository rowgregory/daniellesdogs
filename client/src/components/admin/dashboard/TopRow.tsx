import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { GET_ORDERS_CLIENTS_GALLERYIMAGES_CONTACTFORM_TOTALS } from '../../../queries/getOrdersClientsGalleryImagesContactFormsTotals';
import { Spinner } from 'react-bootstrap';
import { Link } from '../../elements';
import { useEffect } from 'react';

const SquareContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: 32px;
  gap: 16px;
  width: 100%;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Square = styled(Link)<{ bg: string }>`
  background: ${({ bg }) => (bg ? bg : '')};
  height: 175px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: 100%;
`;

const Hexagon = styled.div<{ iconbg: string }>`
  position: relative;
  overflow: hidden;
  background: transparent;
  width: 52.28px;
  height: 52.28px;
  transform: rotate(-30deg) skewX(30deg) scaleY(0.866);

  :before {
    position: absolute;
    right: 6.7%;
    bottom: 0;
    left: 6.7%;
    top: 0;
    transform: scaleY(1.155) skewX(-30deg) rotate(30deg);
    background: ${({ iconbg }) => iconbg};
    content: '';
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 46px;
`;
const TotalText = styled.div`
  font-size: 14px;
  color: #fff;
  font-family: Roboto;
  text-align: center;
  margin-top: 8px;
`;
const TotalAmount = styled.div`
  font-size: 16px;
  color: #fff;
  font-family: Roboto;
  text-align: center;
  margin-top: 8px;
  font-weight: 600;
`;

export const topRowData = (amount: any) => {
  return [
    // {
    //   textKey: 'Total Orders',
    //   icon: <i className='fas fa-home'></i>,
    //   iconBg: '#5a68fe',
    //   background: '#4a486f',
    //   total: amount?.orderCount,
    //   linkKey: '/admin/orders',
    // },
    {
      textKey: 'Total Clients',
      icon: <i className='fas fa-users-cog'></i>,
      iconBg: '#ee2c57',
      background: '#885260',
      total: amount?.newClientFormCount,
      linkKey: '/admin/new-client-forms',
    },
    // {
    //   textKey: 'Gallery Images',
    //   icon: <i className='fas fa-camera-retro'></i>,
    //   iconBg: '#1c8be3',
    //   background: '#547085',
    //   total: amount?.galleryImageCount,
    //   linkKey: '/admin/gallery-images',
    // },
    // {
    //   textKey: 'Contact Forms',
    //   icon: <i className='fas fa-rocket'></i>,
    //   iconBg: '#fda525',
    //   background: '#9d8661',
    //   total: amount?.contactFormCount,
    //   linkKey: '/admin/contact-forms',
    // },
  ];
};

const TopRow = () => {
  const { loading, data, refetch } = useQuery(
    GET_ORDERS_CLIENTS_GALLERYIMAGES_CONTACTFORM_TOTALS
  );
  const amount = data?.getOrdersClientsGalleryImagesContactFormsTotals;

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <SquareContainer>
      {topRowData(amount).map((obj: any, i: number) => (
        <Square to={obj?.linkKey} key={i} bg={obj.background}>
          <Hexagon iconbg={obj.iconBg} />
          <IconContainer>{obj.icon}</IconContainer>
          <TotalText>{obj.textKey}</TotalText>
          <TotalAmount>
            {loading ? <Spinner animation='border' size='sm' /> : obj.total}
          </TotalAmount>
        </Square>
      ))}
    </SquareContainer>
  );
};

export default TopRow;
