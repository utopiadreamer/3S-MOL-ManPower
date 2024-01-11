import React, { createContext, useContext, useState } from 'react';
import { ContractDTO, EmploymentDTO, EstablishmentDTO, ExtractDTO, WorkItemDTO } from './DTOs';


export interface SettlementContextData {
    contract: ContractDTO;
    assignEstablishment: EstablishmentDTO;
    execEstablishment: EstablishmentDTO;
    workItems: WorkItemDTO;
    employment: EmploymentDTO;
    extract: ExtractDTO;

    updateContract: Function;
    updateAssignEstablishment: Function;
    updateExecEstablishment: Function;
    updateWorkItems: Function;
    updateEmployment: Function;
    updateExtract: Function;
}

const SettlementContext = createContext<SettlementContextData>({
    contract: new ContractDTO(),
    assignEstablishment: new EstablishmentDTO(),
    execEstablishment: new EstablishmentDTO(),
    workItems: new WorkItemDTO(),
    employment: new EmploymentDTO(),
    extract: new ExtractDTO(),

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
    updateEmployment: () => {
        /* */
    },
    updateExtract: () => {
        /* */
    }
});

export const useSettlementContext = () => {
    return useContext(SettlementContext);
};

interface Props {
    children: JSX.Element;
}

export const SettlementContextProvider: React.FC<Props> = (props: Props) => {
    const [contract, setContract] = useState<ContractDTO>(new ContractDTO());
    const [assignEstablishment, setAssignEstablishment] = useState<EstablishmentDTO>(new EstablishmentDTO());
    const [execEstablishment, setExecEstablishment] = useState<EstablishmentDTO>(new EstablishmentDTO());
    const [workItems, setWorkItems] = useState<WorkItemDTO>(new WorkItemDTO());
    const [employment, setEmployment] = useState<EmploymentDTO>(new EmploymentDTO());
    const [extract, setExtract] = useState<ExtractDTO>(new ExtractDTO());

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

    const updateEmployment = (
        details: EmploymentDTO,
    ) => {
        setEmployment(details);
    };

    const updateExtract = (
        details: ExtractDTO,
    ) => {
        setExtract(details);
    };
    const {children} = props;
    return (
        <SettlementContext.Provider
            value={{
                contract,
                assignEstablishment,
                execEstablishment,
                workItems,
                employment,
                extract,
                updateContract,
                updateAssignEstablishment,
                updateExecEstablishment,
                updateWorkItems,
                updateEmployment,
                updateExtract                
            }}
        >
            {children}
        </SettlementContext.Provider>
    );
};
