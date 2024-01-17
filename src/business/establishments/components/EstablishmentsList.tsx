import { FC, useEffect, useState } from "react";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";
import { EstablishmentsGrid } from "./EstablishmentsGrid";
import { useParams } from "react-router-dom";
import { getEstablishments } from "../../../shared/mockups/Establishments";
import { EstablishmentDTO } from "../../../shared/models/EstablishmentDTO";

export const EstablishmentsList: FC = () => {
  const params = useParams();
  const [establishments, setEstablishments] = useState<EstablishmentDTO[]>([]);

  useEffect(() => {
    const est = getEstablishments();
    const list = est.filter((i) => i.Type === params.type);
    setEstablishments(list);
  }, [params.type]);

  return (
    <LayoutContent>
      <div className="panel">
        <EstablishmentsGrid
          type={params.type}
          items={establishments}
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
