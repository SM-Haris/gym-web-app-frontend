import { Col, DatePicker, Flex, Typography } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import {
  disabled7DaysDate,
  getDatesBetween,
  getDefaultDates,
} from "../../../utils";
import { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

const GymStats: React.FC = () => {
  const [chartsDateRange, setChartsDateRange] = useState<string[]>([]);
  const setChartRange: RangePickerProps["onChange"] = (date, dateString) => {
    const dateBetween = getDatesBetween(dateString[1], dateString[0]);
    setChartsDateRange(dateBetween);
  };

  useEffect(() => {
    setChartRange(null, getDefaultDates(true) as [string, string]);
  }, []);

  const option = {
    title: {
      text: "Members Chart",
    },
    tooltip: {
      trigger: "axis",
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: chartsDateRange,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Members Count",
        type: "line",
        areaStyle: { normal: {} },
        data: [10, 11, 15, 9, 13, 13, 13],
      },
      {
        name: "Members Present",
        type: "line",
        areaStyle: { normal: {} },
        data: [8, 8, 13, 9, 11, 10, 13],
      },
    ],
  };

  const option2 = {
    title: {
      text: "Revenue",
    },
    tooltip: {
      trigger: "axis",
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: chartsDateRange,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Capital Earned",
        type: "line",
        areaStyle: { normal: {} },
        data: [100, 110, 100, 150, 200, 200, 210],
      },
    ],
  };

  return (
    <>
      <Flex vertical={false}>
        <Col style={{width:'50%'}}>
          <ReactECharts option={option} style={{ height: 400 }} />
          <Flex vertical={false} gap={20} align="center" justify="center">
            <Typography>Pick date range</Typography>
            <RangePicker
              disabledDate={disabled7DaysDate}
              onChange={setChartRange}
              defaultValue={getDefaultDates(false) as [Dayjs, Dayjs]}
            />
          </Flex>
          </Col>
          <Col style={{width:'50%'}}>
          <ReactECharts option={option2} style={{ height: 400 }} />
          <Flex vertical={false} gap={20} align="center" justify="center"> 
            <Typography>Pick date range</Typography>
            <RangePicker
              disabledDate={disabled7DaysDate}
              onChange={setChartRange}
              defaultValue={getDefaultDates(false) as [Dayjs, Dayjs]}
            />
          </Flex>
          </Col>
      </Flex>
    </>
  );
};

export default GymStats;
