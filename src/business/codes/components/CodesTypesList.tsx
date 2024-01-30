import { FC, useEffect, useState } from "react";
import { CodesTypesGrid } from "./CodesTypesGrid";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";
import { getCodesTypes } from "../../../shared/mockups/CodesTypes";
import { Section, SectionSize } from "../../../shared/components/forms/Section";
import { useTranslation } from "react-i18next";
import { CodeTypeDTO } from "../../../shared/models/CodeTypeDTO";

export const CodesTypesList: FC = () => {
  const [codes, setCodesTypes] = useState<CodeTypeDTO[]>([]);
  const { t } = useTranslation(["codes"]);

  useEffect(() => {
    const codesTypes = getCodesTypes();
    setCodesTypes(codesTypes);
  }, []);

  return (
    <LayoutContent>
      <div className="panel">
        <Section
          size={SectionSize.h2}
          iconName="CustomListMirrored"
          title={t("codesTypes")}
        />
        <CodesTypesGrid
          items={codes}
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
