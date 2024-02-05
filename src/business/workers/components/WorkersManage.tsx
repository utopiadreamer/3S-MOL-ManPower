import { FC, useEffect, useState } from 'react';

import { WorkersGrid } from './WorkersGrid';
import { TextField } from '../../../shared/components/forms/CustomTextField';
import { useTranslation } from 'react-i18next';
import { WorkersRecordDTO } from '../../../shared/models/WorkersRecordDTO';
import { Mode } from '../../../shared/constants/types';
import { GeneralUtil } from '../../../shared/utils/generalUtil';
import { ValidationType } from '../../../shared/constants/types';
import { ValidationUtil } from '../../../shared/utils/validationUtil';
import { WorkerDTO } from '../../../shared/models/WorkerDTO';
import FilePicker from '../../../shared/components/forms/FilePicker';
import '../styles/WorkersManage.scss';
import { CommandBar } from '@fluentui/react';
import { Section, SectionSize } from '../../../shared/components/forms/Section';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import { getWorkers } from '../../../shared/mockups/Workers';

export interface Props {
  mode: Mode;
}

export const WorkersManage: FC<Props> = (props: Props) => {
  const { t } = useTranslation(['workers', 'common']);
  const [details, setDetails] = useState<WorkersRecordDTO>();
  const [isEditable, setEditable] = useState<boolean>(false);
  const [disableAdd, setDisableAdd] = useState<boolean>(true);
  const [newWorkerMode, setNewWorkerMode] = useState<Mode>(Mode.View);
  const [workers, setWorkers] = useState<WorkerDTO[]>([]);
  const { mode } = props;
  const { id } = useParams();

  useEffect(() => {
    if (mode === Mode.View) {
      const list = getWorkers();
      setWorkers(list);
    }
  }, [mode]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setDetails((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateWorkersData = (workersData: WorkerDTO[]): boolean => {
    return workersData.every((worker) => {
      const validations = [
        { type: ValidationType.Required, value: worker.Name, message: '' },

        {
          type: ValidationType.Required,
          value: worker.NationalID,
          message: '',
        },
        {
          type: ValidationType.NationalID,
          value: worker.NationalID,
          message: '',
        },
        {
          type: ValidationType.Required,
          value: worker.Occupation,
          message: '',
        },
        { type: ValidationType.Required, value: worker.PhoneNo, message: '' },
        { type: ValidationType.MobileNo, value: worker.PhoneNo, message: '' },
      ];

      const isValid = validations.every((validation) => {
        const result = ValidationUtil.validate(
          validation.type,
          validation.value,
          validation.message,
          t,
        );
        return !result;
      });
      return isValid;
    });
  };

  const processImportedFile = (data: WorkerDTO[]) => {
    const mapConfig = {
      Name: GeneralUtil.normalizeString(t('workerName')),
      NationalID: GeneralUtil.normalizeString(t('nationalID')),
      Occupation: GeneralUtil.normalizeString(t('occupation')),
      Address: GeneralUtil.normalizeString(t('address')),
      PhoneNo: GeneralUtil.normalizeString(t('phoneNo')),
    };

    const workersData: WorkerDTO[] = GeneralUtil.mapJsonDataToObj<WorkerDTO>(
      data,
      mapConfig,
    );

    workersData.forEach((worker, index) => {
      worker.ID = index.toString();
      worker.PhoneNo =
        GeneralUtil.normalizeMobileString(worker.PhoneNo.toString()) ?? '';
    });
    if (validateWorkersData(workersData)) setWorkers(workersData);
  };

  useEffect(() => {
    if (newWorkerMode) {
      setNewWorkerMode(newWorkerMode);
    }
  }, [newWorkerMode]);

  const getActions = () => {
    const saveAction = {
      key: 'save',
      className: clsx('actionButton', 'primeAction'),
      text: t('common:save'),
      iconProps: { iconName: 'Save' },
      onClick: () => {
        setEditable(false);
        setDisableAdd(false);
      },
    };
    const arr = [
      {
        key: 'edit',
        className: clsx('actionButton', isEditable ? 'subAction' : 'subAction'),
        text: t(isEditable ? 'common:cancel' : 'common:edit'),
        iconProps: { iconName: isEditable ? 'Cancel' : 'Edit' },
        onClick: () => {
          setDisableAdd(!disableAdd);
          setEditable(!isEditable);
          setNewWorkerMode(Mode.Edit);
        },
      },
    ];
    if (isEditable) arr.splice(0, 0, saveAction);
    return arr;
  };

  return (
    <div className="workersManage">
      <div className="body">
        <div className="section">
          <div className="content">
            <div className="actionsHeader">
              <Section
                size={SectionSize.h2}
                title={t('workersRecordInfo')}
                iconName="ReminderPerson"
              />
              {id !== undefined && mode === Mode.Edit && (
                <CommandBar items={[]} farItems={getActions()} />
              )}
            </div>
            <div className="row g-112">
              <TextField
                label={t('settleNo')}
                name="RecordNo"
                value={details?.SettlementNo ?? ''}
                readOnly
              />
              <TextField
                label={t('recordNumber')}
                name="RecordNo"
                value={details?.RecordNo ?? ''}
                readOnly
              />
              <TextField
                label={t('notes')}
                name="Notes"
                value={details?.Notes ?? ''}
                onChange={handleInputChange}
                readOnly={!isEditable && mode === Mode.View}
              />
            </div>
          </div>
        </div>
        <div className="section">
          <div className="content">
            <div className="actionsHeader">
              <Section
                size={SectionSize.h2}
                title={t('workersInfo')}
                iconName="ReminderPerson"
              />
              {mode !== Mode.View && (
                <div className="import">
                  {/* <PrimaryButton
                  className="actionButton subAction"
                  iconProps={{ iconName: "Add" }}
                  text={t("addWorker")}
                  onClick={() => {
                    addNewWorker();
                  }}
                /> */}
                  <FilePicker
                    name="ImportWorkersSheet"
                    label={t('importWorkersSheet')}
                    iconName='Download'
                    handleImportedFile={(data: any[]) => {
                      processImportedFile(data);
                    }}
                  />
                </div>
              )}
            </div>
            <div className="row g-1">
              <WorkersGrid
                mode={mode}
                items={workers}
                onChanged={() => {
                  return false;
                }}
                onNbItemPerPageChanged={() => {
                  return false;
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
