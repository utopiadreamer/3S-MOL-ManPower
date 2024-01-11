import { useReducer } from 'react';
import { TabState, WizardTab } from './WizardPivotHeader';

export interface WizardState{
    wizardName?: string;
    translationNamespace: string;
    tabs: WizardTab[];
    selectedTabKey: string;
    showTabState: boolean;
    canGoBack: boolean;
    canGoNext: boolean;
};

export type SelectTabWizardAction = {type: 'SelectTab'; payload: {key: string}};
export type NextTabWizardAction = {type: 'NextTab'};
export type PreviousTabWizardAction = {type: 'PreviousTab'};
export type ChangeTabStateWizardAction = {type: 'ChangeTabState'; payload: {key: string; newState: TabState}};
export type RefreshTabWizardAction = {type: 'Refresh'};
export type ChangeTabVisibilityWizardAction = {type: 'ChangeTabVisibility'; payload: { key: string; hidden: boolean }};
export type ResetWizardAction = {type: 'Reset';payload: { newState: WizardState }};

export type WizardActions = SelectTabWizardAction|
                            NextTabWizardAction|
                            PreviousTabWizardAction|
                            ChangeTabStateWizardAction|
                            ChangeTabVisibilityWizardAction|
                            ResetWizardAction|
                            RefreshTabWizardAction;
export type WizardReducer = (
    state: WizardState,
    action: WizardActions
) => WizardState;

function minTabIndex(tabs: WizardTab[]){
    let counter = 0;
    while(tabs[counter].disabled || tabs[counter].hidden){
        counter += 1;
    }
    return (counter);
}
function maxTabIndex(tabs: WizardTab[]){
    let counter = tabs.length-1;
    while(tabs[counter].disabled || tabs[counter].hidden){
        counter -= 1;
    }
    return (counter);
}
function searchNextTab(tabs: WizardTab[], index: number, direction: number){

    let newIndex = index;
    do{
        newIndex += direction;
        if (newIndex < 0 || newIndex > tabs.length)
            return (undefined);
        if (newIndex < tabs.length && !tabs[newIndex].disabled && !tabs[newIndex].hidden){
            return (newIndex);
        }
    }while(newIndex < tabs.length && (tabs[newIndex].disabled || tabs[newIndex].hidden));
    return (newIndex);
}
function wizardReducer(state: WizardState, action: WizardActions): WizardState{
    switch (action.type){
        case 'ChangeTabState':{
            const newTabs = [...state.tabs];
            const index= state.tabs.findIndex(t=>t.itemKey === action.payload.key);
            if (state.tabs[index].disabled){
                return (state); 
            }
            newTabs[index] = {...state.tabs[index], itemState: action.payload.newState};
            return {...state,tabs:newTabs};
        }
        case 'SelectTab':{
            const index = state.tabs.findIndex(t=>t.itemKey === action.payload.key);
            if (state.tabs[index].disabled){
                return (state); 
            }
            return {...state, selectedTabKey: action.payload.key, canGoBack : index > minTabIndex(state.tabs), canGoNext: index < maxTabIndex(state.tabs)};
        }
        case 'NextTab':{
            const index = state.tabs.findIndex(t=>t.itemKey === state.selectedTabKey);
            const newIndex = searchNextTab(state.tabs,index,1);
            if (newIndex !== undefined && newIndex < state.tabs.length){
                return {...state,selectedTabKey: state.tabs[newIndex].itemKey, canGoBack : newIndex > minTabIndex(state.tabs), canGoNext: newIndex < maxTabIndex(state.tabs)};
            }       
        }
        break;
        case 'PreviousTab': {
            const index = state.tabs.findIndex(t=>t.itemKey === state.selectedTabKey);
            const newIndex = searchNextTab(state.tabs,index,-1);
            if (newIndex !== undefined && newIndex >= 0){
                return {...state,selectedTabKey: state.tabs[newIndex].itemKey,canGoBack : newIndex > minTabIndex(state.tabs), canGoNext: newIndex < maxTabIndex(state.tabs)};
            }       
        }
        break;
        case 'Reset':
            return {
                ...action.payload.newState
            };
        case 'ChangeTabVisibility': {
            const newTabs = [...state.tabs];
            const index = state.tabs.findIndex(
                (t) => t.itemKey === action.payload.key
            );
            if (state.tabs[index].disabled) {
                return state;
            }
            newTabs[index] = {
                ...state.tabs[index],
                hidden: action.payload.hidden
            };
            return { ...state, tabs: newTabs };
        }
        default:
    }
    return (state);
};
export interface WizardStateAndLogic{
    state: WizardState;
    selectTab: (key: string) => void;
    nextTab: () => void;
    previousTab: () => void;
    ChangeTabState: (key: string,tabState: TabState) => void;
    changeTabVisibility: (key: string, hidden: boolean) => void;
    reset: (newState: WizardState) => void;
}
export function useWizard(intialState: WizardState): WizardStateAndLogic{

    const [state,dispatch] = useReducer<WizardReducer>(wizardReducer,intialState);

    return ({
        state,
        selectTab: (key: string) => dispatch({type:'SelectTab',payload:{ key}}),
        nextTab: () => dispatch({type:'NextTab'}),
        previousTab: () => dispatch({type:'PreviousTab'}),
        ChangeTabState:  (key: string, tabState: TabState) => dispatch({type:'ChangeTabState',payload:{ key, newState: tabState}}),
        changeTabVisibility:  (key: string, hidden: boolean) => dispatch({type: 'ChangeTabVisibility',payload: { key, hidden }}),
        reset: (newState: WizardState) => dispatch({type: 'Reset',payload: {  newState }})
    });
};
