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
import { Action, Mode } from "../../../shared/constants/types";
import { ClearanceDetails } from "./ClearanceDetails";
import { ConfirmAction } from "../../../shared/components/business/ConfirmAction";
import { useParams } from "react-router-dom";
import { Section, SectionSize } from "../../../shared/components/forms/Section";

export const ClearanceManage: FC = () => {
  const { t } = useTranslation(["clearances", "common"]);
  const [goNextDisabled, setGoNextDisabled] = useState<boolean>(false);
  const [tabsDisabled, setTabsDisabled] = useState<boolean>(true);
  const [showRejectDialog, setShowRejectDialog] = useState<boolean>(false);
  const [showReturnDialog, setShowReturnDialog] = useState<boolean>(false);
  const params = useParams();
  const mode = params.mode as Mode;
  const [currentMode, setCurrentMode] = useState<Mode>(mode ?? "");

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

  useEffect(() => {
    if (mode === Mode.View) {
      setTabsDisabled(false);
      wizard.changeTabDisability(ClearanceWizardKey.WorkItems, false);
      wizard.changeTabDisability(ClearanceWizardKey.Workers, false);
      wizard.changeTabDisability(ClearanceWizardKey.Clearance, false);
    }
    setCurrentMode(mode);
  }, [mode]);

  return (
    <LayoutContent>
      <div className="clearanceManage">
        <Section
          size={SectionSize.h1}
          title={t(mode === Mode.New ? "newRequest" : "requestInfo")}
          iconName="ActivateOrders"
          className="requestTitle"
        />
        <Wizard state={wizard}>
          <WizardPivotHeader />
          <WizardPivotPanel panelKey={ContractTab}>
            <div className="contractPanel">
              <ContractManage
                mode={currentMode}
                onValidate={(valid: boolean) => onValidate(valid)}
              />
            </div>
          </WizardPivotPanel>
          <WizardPivotPanel panelKey={WorkItemsTab}>
            <SettlementManage mode={currentMode} />
          </WizardPivotPanel>
          <WizardPivotPanel panelKey={WorkersTab}>
            <WorkersManage mode={currentMode} />
          </WizardPivotPanel>
          <WizardPivotPanel panelKey={ClearanceTab}>
            <ClearanceDetails mode={currentMode} />
          </WizardPivotPanel>
        </Wizard>
        {currentMode !== Mode.View && (
          <div className="footer">
            <div className="navigation">
              <div>
                {currentMode === Mode.Edit && (
                  <>
                    <PrimaryButton
                      className="actionButton subAction"
                      iconProps={{ iconName: "Cancel" }}
                      text={t("common:reject")}
                      onClick={() => {
                        setShowRejectDialog(true);
                      }}
                    />
                    <PrimaryButton
                      className="actionButton primeAction"
                      iconProps={{ iconName: "ReturnToSession" }}
                      text={t("common:return")}
                      onClick={() => {
                        setShowReturnDialog(true);
                      }}
                    />
                  </>
                )}
              </div>
              <div>
                {wizard?.state.selectedTabKey !== ClearanceTab && (
                  <PrimaryButton
                    className="actionButton subAction"
                    iconProps={{ iconName: "Save" }}
                    text={t("common:save")}
                  />
                )}
                {wizard?.state.selectedTabKey === ClearanceTab ? (
                  <PrimaryButton
                    className="actionButton primeAction"
                    iconProps={{ iconName: "Save" }}
                    text={t("common:send")}
                  />
                ) : (
                  <PrimaryButton
                    className="actionButton primeAction"
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
        )}
      </div>
      {showRejectDialog && (
        <ConfirmAction
          action={Action.Reject}
          hidden={!showRejectDialog}
          onCancel={() => {
            setShowRejectDialog(false);
          }}
          name={t("type")}
          type={t("type")}
          onConfirm={() => {
            setShowRejectDialog(false);
          }}
        />
      )}
      {showReturnDialog && (
        <ConfirmAction
          action={Action.Return}
          hidden={!showReturnDialog}
          onCancel={() => {
            setShowReturnDialog(false);
          }}
          name={t("type")}
          type={t("type")}
          onConfirm={() => {
            setShowReturnDialog(false);
          }}
        />
      )}
    </LayoutContent>
  );
};
