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
  const [searchCriteria, setSearchCriteria] = useState<EstablishmentDTO>();

  const [estType, setEstType] = useState<string>("persons");

  const Search = () => {
    const est = getEstablishments();
    const list = est.filter((i) => i.Type === estType);
    setEstablishments(list);
  };

  const Clear = () => {
    const empty = new EstablishmentDTO();
    setSearchCriteria(empty);
  };

  const setSearchCriteriaField = (name: string, value?: string) => {
    setSearchCriteria((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <LayoutContent>
      <div className="establishmentsList">
        <Section
          className="pageHeader"
          iconName="Bank"
          title={t("establishments")}
          size={SectionSize.h1}
        />
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
                    value={searchCriteria?.ID}
                    onChange={(e, newValue) =>
                      setSearchCriteriaField("ID", newValue)
                    }
                  />
                  <TextField
                    label={t("name")}
                    value={searchCriteria?.Name}
                    onChange={(e, newValue) =>
                      setSearchCriteriaField("Name", newValue)
                    }
                  />
                  <TextField
                    label={t("nationalID")}
                    value={searchCriteria?.NationalID}
                    onChange={(e, newValue) =>
                      setSearchCriteriaField("NationalID", newValue)
                    }
                  />
                  <TextField
                    label={t("insuranceNumber")}
                    value={searchCriteria?.InsuranceNumber}
                    onChange={(e, newValue) =>
                      setSearchCriteriaField("InsuranceNumber", newValue)
                    }
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
                    value={searchCriteria?.ID}
                    onChange={(e, newValue) =>
                      setSearchCriteriaField("ID", newValue)
                    }
                  />
                  <TextField
                    label={t("name")}
                    value={searchCriteria?.Name}
                    onChange={(e, newValue) =>
                      setSearchCriteriaField("Name", newValue)
                    }
                  />
                  <TextField
                    label={t("commRegistrationNo")}
                    value={searchCriteria?.CommRegistrationNo}
                    onChange={(e, newValue) =>
                      setSearchCriteriaField("CommRegistrationNo", newValue)
                    }
                  />
                  <TextField
                    label={t("taxNumber")}
                    value={searchCriteria?.TaxNumber}
                    onChange={(e, newValue) =>
                      setSearchCriteriaField("TaxNumber", newValue)
                    }
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
                    value={searchCriteria?.ID}
                    onChange={(e, newValue) =>
                      setSearchCriteriaField("ID", newValue)
                    }
                  />
                  <TextField
                    label={t("name")}
                    value={searchCriteria?.Name}
                    onChange={(e, newValue) =>
                      setSearchCriteriaField("Name", newValue)
                    }
                  />
                  <TextField
                    label={t("insuranceNumber")}
                    value={searchCriteria?.InsuranceNumber}
                    onChange={(e, newValue) =>
                      setSearchCriteriaField("InsuranceNumber", newValue)
                    }
                  />
                  <TextField
                    label={t("institutionalCode")}
                    value={searchCriteria?.InstitutionalCode}
                    onChange={(e, newValue) =>
                      setSearchCriteriaField("InstitutionalCode", newValue)
                    }
                  />
                </div>
              </PivotItem>
            </Pivot>
            <SearchBar onSearch={() => Search()} onClear={() => Clear()} />
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
