import * as localforage from 'localforage'

export async function getStorageItem(key: string): Promise<any> {
  try {
    const serializedData = await localforage.getItem<string>(key)
    if (serializedData === null) {
      return undefined
    }

    return JSON.parse(serializedData)
  } catch (_) {
    return undefined
  }
}

export async function setStorageItem(key: string, value: any): Promise<void> {
  try {
    const serializedData = JSON.stringify(value)
    await localforage.setItem<string>(key, serializedData)
  } catch (err) {
    console.warn(err)
  }
}

export async function removeStorageItem(key: string): Promise<void> {
  try {
    await localforage.removeItem(key)
  } catch (err) {
    console.warn(err)
  }
}
