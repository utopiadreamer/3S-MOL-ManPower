import { FC } from "react";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";
import { EstablishmentsGrid } from "./EstablishmentsGrid";
import { useParams } from "react-router-dom";

export const EstablishmentsList: FC = () => {
  const params = useParams();
  return (
    <LayoutContent>
      <div className="panel">
        
      <EstablishmentsGrid
        type={params.type}
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
