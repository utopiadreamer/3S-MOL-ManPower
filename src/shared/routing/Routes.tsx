import { FC } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { EstablishmentsList } from "../../business/establishments/components/EstablishmentsList";
import { SettlementManage } from "../../business/settlements/components/SettlementManage";
import { Dashboard } from "../../business/dashboard/components/Dashboard";
import { EmploymentList } from "../../business/employment/components/EmploymentList";
import { SettlementSearch } from "../../business/settlements/components/SettlementSearch";

export const MenuRoutes: FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Dashboard />} />
          <Route path="employment" element={<EmploymentList />} />

          <Route path="establishments/:type" element={<EstablishmentsList />} />

          <Route path="settlements" element={<SettlementSearch />} />
          <Route path="settlements/new" element={<SettlementManage />} />
        </Route>
      </Routes>      
      <Outlet />
    </div>
  );
};

export default Routes;
