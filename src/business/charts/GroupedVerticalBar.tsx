import * as React from "react";
import {
  DataVizPalette,
  GroupedVerticalBarChart,
  getColorFromToken,
} from "@fluentui/react-charting";

const GroupedVerticalBar: React.FC = () => {
  const state = {
    width: 700,
    height: 400,
  };
  const data = [
    {
      name: "الربع الاول",
      series: [
        {
          key: "series1",
          data: 66,
          xAxisCalloutData: "2020/04/30",
          color: getColorFromToken(DataVizPalette.color5),
          legend: "منح دورية",
        },
        {
          key: "series2",
          data: 13,
          xAxisCalloutData: "2020/04/30",
          color: getColorFromToken(DataVizPalette.color6),
          legend: "خدمات طبية",
        },
        {
          key: "series3",
          data: 35,
          xAxisCalloutData: "2020/04/30",
          color: getColorFromToken(DataVizPalette.color7),
          legend: "خدمات اجتماعية",
        },
      ],
    },
    {
      name: "الربع الثاني",
      series: [
        {
          key: "series1",
          data: 15,
          xAxisCalloutData: "2020/04/30",
          color: getColorFromToken(DataVizPalette.color5),
          legend: "منح دورية",
        },
        {
          key: "series2",
          data: 50,
          xAxisCalloutData: "2020/04/30",
          color: getColorFromToken(DataVizPalette.color6),
          legend: "خدمات طبية",
        },
        {
          key: "series3",
          data: 35,
          xAxisCalloutData: "2020/04/30",
          color: getColorFromToken(DataVizPalette.color7),
          legend: "خدمات اجتماعية",
        },
      ],
    },
    {
      name: "الربع الثالث",
      series: [
        {
          key: "series1",
          data: 55,
          xAxisCalloutData: "2020/04/30",
          color: getColorFromToken(DataVizPalette.color5),
          legend: "منح دورية",
        },
        {
          key: "series2",
          data: 75,
          xAxisCalloutData: "2020/04/30",
          color: getColorFromToken(DataVizPalette.color6),
          legend: "خدمات طبية",
        },
        {
          key: "series3",
          data: 20,
          xAxisCalloutData: "2020/04/30",
          color: getColorFromToken(DataVizPalette.color7),
          legend: "خدمات اجتماعية",
        },
      ],
    },
    {
      name: "الربع الرابع",
      series: [
        {
          key: "series1",
          data: 65,
          xAxisCalloutData: "2020/04/30",
          color: getColorFromToken(DataVizPalette.color5),
          legend: "منح دورية",
        },
        {
          key: "series2",
          data: 70,
          xAxisCalloutData: "2020/04/30",
          color: getColorFromToken(DataVizPalette.color6),
          legend: "خدمات طبية",
        },
        {
          key: "series3",
          data: 15,
          xAxisCalloutData: "2020/04/30",
          color: getColorFromToken(DataVizPalette.color7),
          legend: "خدمات اجتماعية",
        },
      ],
    },
  ];

  const rootStyle = { width: `${state.width}px`, height: `${state.height}px` };

  return (
    <div style={rootStyle}>
      <GroupedVerticalBarChart
        chartTitle="Grouped Vertical Bar chart styled example"
        data={data}
        width={state.width}
        height={state.height}
        showYAxisGridLines
        yAxisTickCount={5}
        barwidth={43}
        enableReflow={true}
      />
    </div>
  );
};

export default GroupedVerticalBar;
