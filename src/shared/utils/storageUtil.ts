export class StorageUtil {
    public static saveState<T = object>(
        STORAGE_KEY: string,
        storeState: T
    ): boolean {
        if (!localStorage) {
            return false;
        }

        try {
            const serializedState = JSON.stringify(storeState);
            localStorage.setItem(STORAGE_KEY, serializedState);
            return true;
        } catch (error) {
            throw new Error('store serialization failed');
        }
    }

    public static loadState<T = object>(
        STORAGE_KEY: string
    ): T | undefined | string {
        if (!localStorage) {
            return undefined;
        }

        try {
            const serializedState = localStorage.getItem(STORAGE_KEY);
            if (serializedState === null || serializedState === undefined) {
                return undefined;
            }
            return JSON.parse(serializedState);
        } catch (error) {
            throw new Error('store deserialization failed');
        }
    }
}
