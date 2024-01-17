import React, { createContext, useContext, useState } from 'react';
import { ContractDTO } from '../../../shared/models/ContractDTO';
import { ClearanceDTO } from '../../../shared/models/ClearanceDTO';
import { EstablishmentDTO } from '../../../shared/models/EstablishmentDTO';
import { WorkItemDTO } from '../../../shared/models/WorkItemDTO';
import { WorkersRecordDTO } from '../../../shared/models/WorkersRecordDTO';


export interface ClearanceContextData {
    contract: ContractDTO;
    assignEstablishment: EstablishmentDTO;
    execEstablishment: EstablishmentDTO;
    workItems: WorkItemDTO;
    workersRecord: WorkersRecordDTO;
    clearance: ClearanceDTO;

    updateContract: Function;
    updateAssignEstablishment: Function;
    updateExecEstablishment: Function;
    updateWorkItems: Function;
    updateWorkersRecord: Function;
    updateClearance: Function;
}

const ClearanceContext = createContext<ClearanceContextData>({
    contract: new ContractDTO(),
    assignEstablishment: new EstablishmentDTO(),
    execEstablishment: new EstablishmentDTO(),
    workItems: new WorkItemDTO(),
    workersRecord: new WorkersRecordDTO(),
    clearance: new ClearanceDTO(),

    updateContract: () => {
        /* */
    },
    updateAssignEstablishment: () => {
        /* */
    },
    updateExecEstablishment: () => {
        /* */
    },
    updateWorkItems: () => {
        /* */
    },
    updateWorkersRecord: () => {
        /* */
    },
    updateClearance: () => {
        /* */
    }
});

export const useClearanceContext = () => {
    return useContext(ClearanceContext);
};

interface Props {
    children: JSX.Element;
}

export const ClearanceContextProvider: React.FC<Props> = (props: Props) => {
    const [contract, setContract] = useState<ContractDTO>(new ContractDTO());
    const [assignEstablishment, setAssignEstablishment] = useState<EstablishmentDTO>(new EstablishmentDTO());
    const [execEstablishment, setExecEstablishment] = useState<EstablishmentDTO>(new EstablishmentDTO());
    const [workItems, setWorkItems] = useState<WorkItemDTO>(new WorkItemDTO());
    const [workersRecord, setWorkers] = useState<WorkersRecordDTO>(new WorkersRecordDTO());
    const [clearance, setClearance] = useState<ClearanceDTO>(new ClearanceDTO());

    const updateContract = (
        details: ContractDTO
    ) => {
        setContract(details);
    };

    const updateAssignEstablishment = (
        details: EstablishmentDTO,
    ) => {
        setAssignEstablishment(details);
    };
    
    const updateExecEstablishment = (
        details: EstablishmentDTO,
    ) => {
        setExecEstablishment(details);
    };

    const updateWorkItems = (
        details: WorkItemDTO,
    ) => {
        setWorkItems(details);
    };

    const updateWorkersRecord = (
        details: WorkersRecordDTO,
    ) => {
        setWorkers(details);
    };

    const updateClearance = (
        details: ClearanceDTO,
    ) => {
        setClearance(details);
    };
    const {children} = props;
    return (
        <ClearanceContext.Provider
            value={{
                contract,
                assignEstablishment,
                execEstablishment,
                workItems,
                workersRecord,
                clearance,
                updateContract,
                updateAssignEstablishment,
                updateExecEstablishment,
                updateWorkItems,
                updateWorkersRecord,
                updateClearance                
            }}
        >
            {children}
        </ClearanceContext.Provider>
    );
};
