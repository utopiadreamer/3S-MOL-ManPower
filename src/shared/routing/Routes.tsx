import { FC } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Charts from "../../business/charts/Charts";
import Donut from "../../business/charts/Donut";
import Area from "../../business/charts/Area";
import { Layout } from "../components/layout/Layout";
import { EstablishmentDetails } from "../../business/establishments/components/EstablishmentDetails";
import { EstablishmentsList } from "../../business/establishments/components/EstablishmentsList";
import { EstablishmentManage } from "../../business/establishments/components/EstablishmentManage";

export const MenuRoutes: FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="charts" element={<Charts />} />
          <Route path="donut" element={<Donut />} />
          <Route path="area" element={<Area />} />
          <Route path="establishments" element={<EstablishmentsList />} />
          <Route path="establishments/new" element={<EstablishmentManage />} />
          <Route path="establishments/:id" element={<EstablishmentDetails />} />
        </Route>
      </Routes>      
      <Outlet />
    </div>
  );
};

export default Routes;
