import { FC } from "react";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";
import { EmployeesGrid } from "./EmployeesGrid";
import { useParams } from "react-router-dom";

export const EmploymentList: FC = () => {
  return (
    <LayoutContent>
      <div className="panel">
        <EmployeesGrid
          items={[]}
          onChanged={() => {
            return false;
          }}
          onNbItemPerPageChanged={() => {
            return false;
          }}
        />
      </div>
    </LayoutContent>
  );
};
