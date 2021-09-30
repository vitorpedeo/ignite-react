import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2021-10-01T00:00:00.000Z',
      '2021-10-02T00:00:00.000Z',
      '2021-10-03T00:00:00.000Z',
      '2021-10-04T00:00:00.000Z',
      '2021-10-05T00:00:00.000Z',
      '2021-10-06T00:00:00.000Z',
      '2021-10-07T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [
  {
    name: 'series1',
    data: [31, 120, 10, 28, 51, 18, 109],
  },
];

export default function Dashboard() {
  return (
    <Flex height="100vh" flexDirection="column">
      <Header />

      <Flex
        marginY="6"
        marginX="auto"
        paddingX="6"
        width="100%"
        maxWidth={1480}
      >
        <Sidebar />

        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems="flex-start"
        >
          <Box
            padding="8"
            paddingBottom="4"
            borderRadius={8}
            background="gray.800"
          >
            <Text marginBottom="4" fontSize="lg">
              Inscritos da semana
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
          <Box
            padding="8"
            paddingBottom="4"
            borderRadius={8}
            background="gray.800"
          >
            <Text marginBottom="4" fontSize="lg">
              Taxa de abertura
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
