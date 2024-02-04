import { FC, useState } from "react";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";
import { EstablishmentsGrid } from "./EstablishmentsGrid";
import { getEstablishments } from "../../../shared/mockups/Establishments";
import { EstablishmentDTO } from "../../../shared/models/EstablishmentDTO";
import { Pivot, PivotItem } from "@fluentui/react";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { useTranslation } from "react-i18next";
import { Section, SectionSize } from "../../../shared/components/forms/Section";
import { SearchBar } from "../../../shared/components/forms/SearchBar";

export const EstablishmentsList: FC = () => {
  const { t } = useTranslation(["establishments", "common"]);
  const [establishments, setEstablishments] = useState<EstablishmentDTO[]>([]);
  const [nationalID, setNationalID] = useState<string>();
  const [commRegistrationNo, setCommRegistrationNo] = useState<string>();
  const [taxNumber, setTaxNumber] = useState<string>();
  const [insuranceNumber, setInsuranceNumber] = useState<string>();
  const [institutionalCode, setInstitutionalCode] = useState<string>();
  const [id, setID] = useState<string>();
  const [name, setName] = useState<string>();
  const [estType, setEstType] = useState<string>("persons");

  const Search = () => {
    const est = getEstablishments();
    const list = est.filter((i) => i.Type === estType);
    setEstablishments(list);
  };

  return (
    <LayoutContent>
      <div className="establishmentsList">
        <div className="section">
          <div className="content">
            <Pivot
              selectedKey={estType}
              onLinkClick={(item) => {
                setEstType(item?.props.itemKey ?? "");
                setEstablishments([]);
              }}
            >
              <PivotItem
                headerText={t("persons")}
                itemIcon="ReminderPerson"
                itemKey="persons"
              >
                <div className="row">
                  <TextField
                    label={t("id")}
                    value={id}
                    onChange={(e, newValue) => setID(newValue)}
                  />
                  <TextField
                    label={t("name")}
                    value={name}
                    onChange={(e, newValue) => setName(newValue)}
                  />
                  <TextField
                    label={t("nationalID")}
                    value={nationalID}
                    onChange={(e, newValue) => setNationalID(newValue)}
                  />
                  <TextField
                    label={t("insuranceNumber")}
                    value={insuranceNumber}
                    onChange={(e, newValue) => setInsuranceNumber(newValue)}
                  />
                </div>
              </PivotItem>
              <PivotItem
                headerText={t("companies")}
                itemIcon="CityNext2"
                itemKey="companies"
              >
                <div className="row">
                  <TextField
                    label={t("id")}
                    value={id}
                    onChange={(e, newValue) => setID(newValue)}
                  />
                  <TextField
                    label={t("name")}
                    value={name}
                    onChange={(e, newValue) => setName(newValue)}
                  />
                  <TextField
                    label={t("commRegistrationNo")}
                    value={commRegistrationNo}
                    onChange={(e, newValue) => setCommRegistrationNo(newValue)}
                  />
                  <TextField
                    label={t("taxNumber")}
                    value={taxNumber}
                    onChange={(e, newValue) => setTaxNumber(newValue)}
                  />
                </div>
              </PivotItem>
              <PivotItem
                headerText={t("governments")}
                itemIcon="CityNext"
                itemKey="governments"
              >
                <div className="row">
                  <TextField
                    label={t("id")}
                    value={id}
                    onChange={(e, newValue) => setID(newValue)}
                  />
                  <TextField
                    label={t("name")}
                    value={name}
                    onChange={(e, newValue) => setName(newValue)}
                  />
                  <TextField
                    label={t("insuranceNumber")}
                    value={insuranceNumber}
                    onChange={(e, newValue) => setInsuranceNumber(newValue)}
                  />
                  <TextField
                    label={t("institutionalCode")}
                    value={institutionalCode ?? ""}
                    onChange={(e, newValue) => setInstitutionalCode(newValue)}
                  />
                </div>
              </PivotItem>
            </Pivot>
            <SearchBar onSearch={() => Search()} onClear={() => {}} />
          </div>
        </div>
        <div className="panel">
          <Section
            size={SectionSize.h2}
            iconName="SearchAndApps"
            title={t("common:searchResults")}
          />
          <EstablishmentsGrid
            type={estType}
            items={establishments}
            onChanged={() => {
              return false;
            }}
            onNbItemPerPageChanged={() => {
              return false;
            }}
          />
        </div>
      </div>
    </LayoutContent>
  );
};
