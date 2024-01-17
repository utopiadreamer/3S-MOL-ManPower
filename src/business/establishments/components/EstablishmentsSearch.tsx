import { FC, useState } from "react";
import { Dropdown } from "../../../shared/components/forms/CustomDropdown";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { EstablishmentType } from "../../../shared/constants/constants";
import { useTranslation } from "react-i18next";
import { IconButton } from "@fluentui/react";
import "../styles/EstablishmentsSearch.scss";
import { getEstablishments } from "../../../shared/mockups/Establishments";
import { EstablishmentDTO } from "../../../shared/models/EstablishmentDTO";

export interface Props {
  onSearch: (results?: EstablishmentDTO) => void;
}
export const EstablishmentsSearch: FC<Props> = (props: Props) => {
  const { onSearch } = props;
  const { t } = useTranslation(["establishments", "common"]);
  const [establishmentType, setEstablishmentType] = useState<string>(
    EstablishmentType.Person
  );
  const [selectedField, setSelectedField] = useState<string>("1");
  const [searchLabel, setSearchLabel] = useState<string>(t("id"));
  const [searchCriteria, setSearchCriteria] = useState<string>();

  const establishmentTypes = [
    {
      key: EstablishmentType.Person,
      text: t("person"),
      data: { icon: 'ReminderPerson' }
    },
    {
      key: EstablishmentType.Company,
      text: t("company"),
      data: { icon: 'CityNext2' }
    },
    {
      key: EstablishmentType.Government,
      text: t("government"),
      data: { icon: 'CityNext' }
    },
  ];

  const getFields = () => {
    if (establishmentType === EstablishmentType.Person) {
      return [
        {
          key: "1",
          text: t("id"),
        },
        {
          key: "2",
          text: t("name"),
        },
        {
          key: "3",
          text: t("nationalID"),
        },
        {
          key: "4",
          text: t("insuranceNumber"),
        },
      ];
    } else if (establishmentType === EstablishmentType.Company) {
      return [
        {
          key: "1",
          text: t("id"),
        },
        {
          key: "2",
          text: t("name"),
        },
        {
          key: "3",
          text: t("commRegistrationNo"),
        },
        {
          key: "4",
          text: t("taxNumber"),
        },
        {
          key: "5",
          text: t("insuranceNumber"),
        },
      ];
    } else if (establishmentType === EstablishmentType.Government) {
      return [
        {
          key: "1",
          text: t("id"),
        },
        {
          key: "2",
          text: t("name"),
        },
        {
          key: "3",
          text: t("institutionalCode"),
        },
        {
          key: "4",
          text: t("insuranceNumber"),
        },
      ];
    }
    return [];
  };

  const Search = () => {
    const results = getEstablishments("id", searchCriteria);
    if (results && results.length > 0) {
      onSearch(results[0]);
    } else onSearch(new EstablishmentDTO());
  };

  return (
    <div className="establishmentsSearch">
      <div className="searchCriteria">
        <Dropdown
          placeholder={t("establishmentType")}
          options={establishmentTypes}
          selectedKey={establishmentType}
          onChange={(_, option) => {
            setEstablishmentType(option?.key.toString() ?? "");
          }}
        />
        <Dropdown
          placeholder={t("searchCriteria")}
          options={getFields()}
          selectedKey={selectedField}
          onChange={(_, option) => {
            setSelectedField(option?.key.toString() ?? "");
            setSearchLabel(option?.text.toString() ?? "");
          }}
        />
        <div className="searchArea">
          <TextField
            className="searchText"
            placeholder={searchLabel}
            value={searchCriteria}
            onChange={(e, newValue) => setSearchCriteria(newValue)}
          />
          <IconButton
            className="searchButton"
            iconProps={{ iconName: "Search" }}
            onClick={() => {
              Search();
            }}
          ></IconButton>
        </div>
      </div>
    </div>
  );
};
