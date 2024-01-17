import { FC } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { EstablishmentsList } from "../../business/establishments/components/EstablishmentsList";
import { Dashboard } from "../../business/dashboard/components/Dashboard";
import { WorkersList } from "../../business/workers/components/WorkersList";
import { EstablishmentDetails } from "../../business/establishments/components/EstablishmentDetails";
import { ContractsList } from "../../business/contracts/components/ContractsList";
import { ContractManage } from "../../business/contracts/components/ContractManage";
import { SettlementsList } from "../../business/settlements/components/SettlementsList";
import { ClearanceManage } from "../../business/clearances/components/ClearanceManage";
import { Mode } from "../constants/types";

export const MenuRoutes: FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Dashboard />} />
          <Route path="workers" element={<WorkersList />} />

          <Route path="contracts" element={<ContractsList />} />
          <Route path="contracts/new" element={<ContractManage mode={Mode.New} />} />
          <Route path="contracts/:id" element={<ContractManage mode={Mode.View} />} />

          <Route path="establishments/:type" element={<EstablishmentsList />} />
          <Route path="establishments/:type/:id" element={<EstablishmentDetails />} />

          <Route path="settlements/search" element={<SettlementsList />} />
          <Route path="settlements/new" element={<ClearanceManage mode={Mode.New} />} />
          <Route path="settlements/:id" element={<ClearanceManage mode={Mode.View} />} />
        </Route>
      </Routes>      
      <Outlet />
    </div>
  );
};

export default Routes;
