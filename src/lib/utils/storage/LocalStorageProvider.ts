import { IStorageProvider } from './IStorageProvider';
import { StorageObject } from './StorageObject';

class LocalStorageProvider implements IStorageProvider {
    set<T>(key: string, value: T) {
        if (typeof window !== 'undefined') {
            const storageItem = new StorageObject(value);

            localStorage.setItem(key, storageItem.toStorageItem());
        }
    }

    get<T>(key: string): StorageObject<T> {
        if (typeof window !== 'undefined') {
            const rawValue = localStorage.getItem(key);
            
            return StorageObject.fromStorageItem<T>(rawValue);
        }

        return new StorageObject<T>();
    }

    remove(key: string) {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(key);
        }
    }

    clear() {
        if (typeof window !== 'undefined') {
            localStorage.clear();
        }
    }
}

export default new LocalStorageProvider();
