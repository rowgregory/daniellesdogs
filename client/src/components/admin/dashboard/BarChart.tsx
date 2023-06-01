import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import { Text } from '../../elements';
import { useQuery } from '@apollo/client';
import { GET_SALES_BY_MONTH } from '../../../queries/getSalesByMonth';
import { Spinner } from 'react-bootstrap';
import { useEffect } from 'react';

const Container = styled.div`
  background: #2d363c;
  border-radius: 12px;
  padding: 16px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100vw - 25px);
  canvas {
    height: 230px !important;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    width: calc(100vw - 448px);
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    width: calc(100vw - 700px);
  }
`;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    y: {
      grid: {
        display: false,
        drawBorder: false,
        color: '',
      },
      ticks: {
        color: '#5a626d',
      },
    },
    x: {
      grid: {
        drawBorder: false,
        color: '',
      },
      ticks: {
        color: '#5a626d',
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const BarChart = () => {
  const { loading, data, refetch } = useQuery(GET_SALES_BY_MONTH);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const labels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const noSales = data?.getSalesByMonth?.datasets.every(
    (salesThisMonth: number) => salesThisMonth === 0
  );

  return (
    <Container>
      {loading ? (
        <div className='d-flex align-items-center justify-content-center w-100 h-100'>
          <Spinner animation='border' size='sm' />
        </div>
      ) : noSales ? (
        <Text
          textAlign={['center']}
          width={['100%']}
          color={['#faf9f9']}
          fontFamily='Roboto'
        >
          No Sales Yet
        </Text>
      ) : (
        <>
          <Text
            fontSize={['16px']}
            fontFamily='Roboto'
            color={['#faf9f9']}
            margin={['0 0 16px 0']}
            alignSelf={['flex-start']}
          >
            Product Sales
          </Text>
          <Bar
            options={options}
            data={{
              labels,
              datasets: [
                {
                  data: data?.getSalesByMonth?.datasets,
                  backgroundColor: '#5a67ff',
                },
              ],
            }}
          />
        </>
      )}
    </Container>
  );
};

export default BarChart;
