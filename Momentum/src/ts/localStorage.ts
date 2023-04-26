export function setLocalStorageInputValue(inputValue: HTMLInputElement,localStorageNameItem:string) {
  if (inputValue instanceof HTMLInputElement) {
    localStorage.setItem(localStorageNameItem, inputValue.value);
  }
}

export function getLocalStorageInputValue(inputValue: HTMLInputElement,localStorageNameItem:string) {
  if (inputValue instanceof HTMLInputElement) {
    const nameLocalStorage = localStorage.getItem(localStorageNameItem);
    inputValue.value = nameLocalStorage !== null ? nameLocalStorage : "";
  }
}
