/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react";
import "../styles/SettlementManage.scss";
import { useTranslation } from "react-i18next";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";
import {
  Wizard,
  WizardPivotHeader,
  WizardPivotPanel,
  WizardState,
  useWizard,
} from "../../../shared/components/wizard";
import { ContractManage } from "../../contracts/components/ContractManage";
import { PrimaryButton, Spinner, SpinnerSize } from "@fluentui/react";
import {
  SettlementContextData,
  useSettlementContext,
} from "../context/SettlementContext";
import { SettlementWizardKey } from "../../../shared/constants/constants";
import { EmploymentManage } from "../../employment/components/EmploymentManage";

export const SettlementManage: FC = () => {
  const { t } = useTranslation(["settlements", "common"]);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [goNextDisabled, setGoNextDisabled] = useState<boolean>(false);
  const [tabsDisabled, setTabsDisabled] = useState<boolean>(true);
  const ContractTab = SettlementWizardKey.Contract;
  const WorkItemsTab = SettlementWizardKey.WorkItems;
  const EmploymentTab = SettlementWizardKey.Employment;
  const ExtractTab = SettlementWizardKey.Extract;

  const onValidate = (hasErrors: boolean) => {
    setGoNextDisabled(!hasErrors);
    setTabsDisabled(!hasErrors);
  };

  const getWizardState = (): WizardState => {
    return {
      translationNamespace: ContractTab,
      tabs: [
        {
          itemKey: ContractTab,
          label: t("contractRequest"),
        },
        {
          itemKey: WorkItemsTab,
          label: t(WorkItemsTab)
        },
        {
          itemKey: EmploymentTab,
          label: t(EmploymentTab)
        },
        {
          itemKey: ExtractTab,
          label: t(ExtractTab)
        },
      ],
      selectedTabKey: ContractTab,
      showTabState: true,
      canGoBack: false,
      canGoNext: true,
    };
  };
  const wizard = useWizard(getWizardState());
  const settlementContext = useSettlementContext();

  useEffect(() => {
  }, [goNextDisabled]);

  const changeState = (key: string, isValid: boolean) => {
    wizard.ChangeTabState(key, isValid ? "completed" : "error");
  };

  const validateContract = (settlementContext: SettlementContextData) => {
    return true;
  };
  const validateEmployment = (settlementContext: SettlementContextData) => {
    return true;
  };
  const validateWorkItems = (settlementContext: SettlementContextData) => {
    return true;
  };

  useEffect(() => {
    if (wizard?.state.selectedTabKey) {
      const invalidContract = validateContract(settlementContext);
      const invalidEmployment = validateEmployment(settlementContext);
      const invalidWorkItems = validateWorkItems(settlementContext);

      if (wizard?.state.selectedTabKey === ContractTab) {
        setGoNextDisabled(invalidContract);
      }  else if (wizard?.state.selectedTabKey === WorkItemsTab) {
        setGoNextDisabled(invalidWorkItems);
        changeState(ContractTab, !invalidContract);
      } else if (wizard?.state.selectedTabKey === EmploymentTab) {
        setGoNextDisabled(invalidEmployment);
        changeState(ContractTab, !invalidContract);
        changeState(WorkItemsTab, !invalidWorkItems);
      } else if (wizard?.state.selectedTabKey === ExtractTab) {
        changeState(ContractTab, !invalidContract);
        changeState(WorkItemsTab, !invalidWorkItems);
        changeState(EmploymentTab, !invalidEmployment);
      }
    }
  }, [wizard?.state.selectedTabKey]);

  return (
    <LayoutContent>
      <div className="settlementManage">
        <Wizard state={wizard}>
          <WizardPivotHeader />
          <WizardPivotPanel panelKey={ContractTab}>
            <ContractManage editMode />
          </WizardPivotPanel>
          <WizardPivotPanel panelKey={WorkItemsTab}></WizardPivotPanel>
          <WizardPivotPanel panelKey={EmploymentTab}><EmploymentManage /></WizardPivotPanel>
          <WizardPivotPanel panelKey={ExtractTab}></WizardPivotPanel>
        </Wizard>
        <div className="footer">
          <div className="navigation">
            <PrimaryButton
              iconProps={{ iconName: "Back" }}
              disabled={!wizard.state.canGoBack}
              text={t("previous")}
              onClick={() => wizard.previousTab()}
              className="closeButton"
            />
            {wizard.state.canGoNext ? (
              <PrimaryButton
                menuIconProps={{ iconName: "Forward" }}
                disabled={!wizard.state.canGoNext}
                text={t("continue")}
                onClick={() => wizard.nextTab()}
                className="continue"
              />
            ) : (
              <PrimaryButton
                menuIconProps={{
                  iconName: "Send",
                }}
                text={t("register")}
                className="continue norotate"
              >
                {isSaving && <Spinner size={SpinnerSize.small} />}
              </PrimaryButton>
            )}
          </div>
        </div>
      </div>
    </LayoutContent>
  );
};
