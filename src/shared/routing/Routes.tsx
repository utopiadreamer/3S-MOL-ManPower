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
import { WorkerDetails } from "../../business/workers/components/WorkerDetails";
import { CodesList } from "../../business/codes/components/CodesList";
import { RequestsList } from "../../business/requests/components/RequestsList";
import { CodesTypesList } from "../../business/codes/components/CodesTypesList";
import { CodeDetails } from "../../business/codes/components/CodeDetails";
import { CodeTypeDetails } from "../../business/codes/components/CodeTypeDetails";
import { UsersList } from "../../business/security/components/UsersList";
import { UserDetails } from "../../business/security/components/UserDetails";

export const MenuRoutes: FC = () => {
  return (
    <div className="h-100">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Dashboard />} />
          
          <Route path="workers" element={<WorkersList />} />
          <Route path="workers/record/:id" element={<WorkersList />} />
          <Route path="workers/:id" element={<WorkerDetails />} />

          <Route path="contracts" element={<ContractsList />} />
          <Route path="contracts/new" element={<ContractManage mode={Mode.New} />} />
          <Route path="contracts/:id" element={<ContractManage mode={Mode.View} />} />

          <Route path="establishments" element={<EstablishmentsList />} />
          <Route path="establishments/:type/:id" element={<EstablishmentDetails />} />

          <Route path="requests/mine" element={<RequestsList />} />
          <Route path="requests/mine/:mode" element={<ClearanceManage />} />
          <Route path="requests/mine/:mode/:id" element={<ClearanceManage />} />

          <Route path="requests/:mode" element={<ClearanceManage />} />
          <Route path="requests/search" element={<SettlementsList />} />
          <Route path="requests/search/:mode" element={<ClearanceManage />} />
          <Route path="requests/search/:mode/:id" element={<ClearanceManage />} />

          <Route path="codes" element={<CodesList />} />
          <Route path="codes/:id" element={<CodeDetails mode={Mode.View} />} />
          <Route path="codes/new" element={<CodeDetails mode={Mode.New}/>} />

          <Route path="codesTypes" element={<CodesTypesList />} />
          <Route path="codesTypes/:id" element={<CodeTypeDetails  mode={Mode.View} />} />
          <Route path="codesTypes/new" element={<CodeTypeDetails mode={Mode.New} />} />
          
          <Route path="security/users" element={<UsersList />} />
          <Route path="security/users/new" element={<UserDetails mode={Mode.New} />} />
          <Route path="security/users/:id" element={<UserDetails mode={Mode.View} />} />
        </Route>
      </Routes>      
      <Outlet />
    </div>
  );
};

export default Routes;
