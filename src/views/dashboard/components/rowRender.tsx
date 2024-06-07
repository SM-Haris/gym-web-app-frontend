import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { DatePicker, Flex } from "antd";
import Typography from "antd/es/typography/Typography";
import { RangePickerProps } from "antd/es/date-picker";
import { Dayjs } from "dayjs";
import {
  disabled7DaysDate,
  getDatesBetween,
  getDefaultDates,
} from "../../../utils";
import MarkAttendanceColumnRender, { MarkAttendanceColumnProps } from "./markAttendanceForm";

const { RangePicker } = DatePicker;

const RowRender: React.FC<MarkAttendanceColumnProps> = ({record,renderType}) => {
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
      text: "Attendance Chart",
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
        name: "Hours Logged",
        type: "line",
        areaStyle: { normal: {} },
        data: [0.5, 1, 1, 1.5, 2, 0, 1],
      },
    ],
  };

  return (
    <Flex vertical={true} gap={20}>
      {chartsDateRange.length > 0 ? (
        <ReactECharts option={option} style={{ height: 400 }} />
      ) : null}
      <Flex vertical={false} gap={20} align="center">
        <Typography>Pick date range</Typography>
        <RangePicker
          disabledDate={disabled7DaysDate}
          onChange={setChartRange}
          defaultValue={getDefaultDates(false) as [Dayjs, Dayjs]}
        />
      </Flex>
      <Typography>Mark Attendance for a specific date:</Typography>
      <Flex gap={10} align="center">
        <MarkAttendanceColumnRender record={record} renderType={renderType}/>
      </Flex>
    </Flex>
  );
};

export default RowRender;
