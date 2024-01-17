/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react";
import "../styles/ClearanceManage.scss";
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
import { PrimaryButton } from "@fluentui/react";
import {
  ClearanceContextData,
  useClearanceContext,
} from "../context/ClearanceContext";
import { ClearanceWizardKey } from "../../../shared/constants/constants";
import { WorkersManage } from "../../workers/components/WorkersManage";
import { SettlementManage } from "../../settlements/components/SettlementManage";
import { Mode } from "../../../shared/constants/types";
import { useParams } from "react-router-dom";
import { ClearanceDetails } from "./ClearanceDetails";

export interface Props {
  mode: Mode;
}

export const ClearanceManage: FC<Props> = (props: Props) => {
  const { t } = useTranslation(["clearances", "common"]);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [goNextDisabled, setGoNextDisabled] = useState<boolean>(false);
  const [tabsDisabled, setTabsDisabled] = useState<boolean>(true);
  const { mode } = props;
  const { id } = useParams();

  const ContractTab = ClearanceWizardKey.Contract;
  const WorkItemsTab = ClearanceWizardKey.WorkItems;
  const WorkersTab = ClearanceWizardKey.Workers;
  const ClearanceTab = ClearanceWizardKey.Clearance;

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
          icon: "contract",
        },
        {
          itemKey: WorkItemsTab,
          label: t(WorkItemsTab),
          icon: "settle",
          disabled: tabsDisabled,
        },
        {
          itemKey: WorkersTab,
          label: t(WorkersTab),
          icon: "worker",
          disabled: tabsDisabled,
        },
        {
          itemKey: ClearanceTab,
          label: t(ClearanceTab),
          icon: "clearance",
          disabled: tabsDisabled,
        },
      ],
      selectedTabKey: ContractTab,
      showTabState: true,
      canGoBack: false,
      canGoNext: true,
    };
  };
  const wizard = useWizard(getWizardState());
  const clearanceContext = useClearanceContext();

  const changeNextTabDisability = () => {
    if (wizard?.state.selectedTabKey === ContractTab) {
      wizard.changeTabDisability(ClearanceWizardKey.WorkItems, goNextDisabled);
    } else if (wizard?.state.selectedTabKey === WorkItemsTab) {
      wizard.changeTabDisability(ClearanceWizardKey.Workers, goNextDisabled);
    } else if (wizard?.state.selectedTabKey === WorkersTab) {
      wizard.changeTabDisability(ClearanceWizardKey.Clearance, goNextDisabled);
    }
    wizard.nextTab();
  };

  const changeState = (key: string, isValid: boolean) => {
    wizard.ChangeTabState(key, isValid ? "completed" : "error");
  };

  const validateContract = (clearanceContext: ClearanceContextData) => {
    return false;
  };
  const validateWorkers = (clearanceContext: ClearanceContextData) => {
    return false;
  };
  const validateWorkItems = (clearanceContext: ClearanceContextData) => {
    return false;
  };

  useEffect(() => {
    if (wizard?.state.selectedTabKey) {
      const invalidContract = validateContract(clearanceContext);
      const invalidWorkers = validateWorkers(clearanceContext);
      const invalidWorkItems = validateWorkItems(clearanceContext);

      if (wizard?.state.selectedTabKey === ContractTab) {
        setGoNextDisabled(invalidContract);
      } else if (wizard?.state.selectedTabKey === WorkItemsTab) {
        setGoNextDisabled(invalidWorkItems);
        changeState(ContractTab, !invalidContract);
      } else if (wizard?.state.selectedTabKey === WorkersTab) {
        setGoNextDisabled(invalidWorkers);
        changeState(ContractTab, !invalidContract);
        changeState(WorkItemsTab, !invalidWorkItems);
      } else if (wizard?.state.selectedTabKey === ClearanceTab) {
        changeState(ContractTab, !invalidContract);
        changeState(WorkItemsTab, !invalidWorkItems);
        changeState(WorkersTab, !invalidWorkers);
      }
    }
  }, [wizard?.state.selectedTabKey]);

  return (
    <LayoutContent>
      <div className="clearanceManage">
        <Wizard state={wizard}>
          <WizardPivotHeader />
          <WizardPivotPanel panelKey={ContractTab}>
            <ContractManage
              mode={mode}
              onValidate={(valid: boolean) => onValidate(valid)}
            />
          </WizardPivotPanel>
          <WizardPivotPanel panelKey={WorkItemsTab}>
            <SettlementManage mode={mode} />
          </WizardPivotPanel>
          <WizardPivotPanel panelKey={WorkersTab}>
            <WorkersManage mode={mode} />
          </WizardPivotPanel>
          <WizardPivotPanel panelKey={ClearanceTab}>
            <ClearanceDetails mode={mode} />
          </WizardPivotPanel>
        </Wizard>
        <div className="footer">
          <div className="navigation">
            <PrimaryButton
              className="actionButton editAction"
              iconProps={{ iconName: "Save" }}
              text={t("common:save")}
            />
            {wizard?.state.selectedTabKey === ClearanceTab ? (
              <PrimaryButton
                className="actionButton newAction"
                iconProps={{ iconName: "Save" }}
                text={t("common:send")}
              />
            ) : (
              <PrimaryButton
                className="actionButton newAction"
                iconProps={{ iconName: "Save" }}
                text={t("common:saveAndContinue")}
                onClick={() => {
                  setTabsDisabled(false);
                  changeNextTabDisability();
                }}
              />
            )}
          </div>
        </div>
      </div>
    </LayoutContent>
  );
};
