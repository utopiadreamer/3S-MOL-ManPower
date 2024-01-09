import * as React from "react";
import Area from "./Area";
import GroupedVerticalBar from "./GroupedVerticalBar";
import Donut from "./Donut";
import Line from "./Line";
import { LayoutContent } from "../../shared/components/layout/layoutContent/LayoutContent";

const Charts: React.FC = () => {
  return (
    <LayoutContent>
      <div className="row">
        <GroupedVerticalBar />
        <Donut />
      </div>
      <div className="row">
        <Line />
        <Area />
      </div>
    </LayoutContent>
  );
};

export default Charts;
