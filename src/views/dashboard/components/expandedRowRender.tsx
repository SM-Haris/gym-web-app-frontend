import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { DatePicker, DatePickerProps, Flex } from "antd";
import Typography from "antd/es/typography/Typography";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

const disabled7DaysDate: DatePickerProps["disabledDate"] = (
  current,
  { from }
) => {
  if (from) {
    return Math.abs(current.diff(from, "months")) >= 1;
  }

  return false;
};

function getDatesBetween(startDate: string, endDate: string): string[] {
  const dates: string[] = [];
  const [startYear, startMonth, startDay] = startDate.split("-").map(Number);
  const [endYear, endMonth, endDay] = endDate.split("-").map(Number);

  let currentDate = new Date(startYear, startMonth - 1, startDay); // Months are 0-indexed

  while (currentDate <= new Date(endYear, endMonth - 1, endDay)) {
    const year = currentDate.getFullYear().toString().padStart(4, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    dates.push(`${year}-${month}-${day}`);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

const getDefaultDates = (isDayJs: boolean) => {
  const today = dayjs();
  const sevenDaysAgo = dayjs().subtract(7, "days");

  if (isDayJs){
    return [today.toISOString(), sevenDaysAgo.toISOString()] ;
  }

  return [today, sevenDaysAgo];
};

const RowRender: React.FC = () => {
  const [chartsDateRange, setChartsDateRange] = useState<string[]>([]);
  const setChartRange: RangePickerProps["onChange"] = (date, dateString) => {
    const dateBetween = getDatesBetween(dateString[0], dateString[1]);
    setChartsDateRange(dateBetween);
  };

  useEffect(() => {
    setChartRange(null,getDefaultDates(true) as [string,string])
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
    <>
      <ReactECharts option={option} style={{ height: 400 }} />
      <Flex vertical={false} gap={20} align="center">
        <Typography>Pick date range</Typography>
        <RangePicker
          disabledDate={disabled7DaysDate}
          onChange={setChartRange}
          defaultValue={getDefaultDates(false) as [Dayjs,Dayjs]}
        />
      </Flex>
    </>
  );
};

export default RowRender;
