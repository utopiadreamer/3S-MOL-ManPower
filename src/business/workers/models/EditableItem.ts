export interface IEditableItem<T> {
    item: T;
    editedItem: T;
    isEdited?: boolean;
}

export class EditableItem<T> implements IEditableItem<T> {
    item!: T;

    editedItem!: T;

    isEdited?: boolean;
    
    ischanged!:boolean;

    constructor(item: T, editedItem: T, isEdited: boolean) {
        this.item = item;
        this.editedItem = editedItem;
        this.isEdited = isEdited;
    }
}