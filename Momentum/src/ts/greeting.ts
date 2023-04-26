import { getLocalStorageInputValue, setLocalStorageInputValue } from "./localStorage";

const nameElem = document.querySelector(".name");

if (nameElem instanceof HTMLInputElement) {
  // Set local storage before reloaded and closed page
  window.addEventListener("beforeunload", () => {
    setLocalStorageInputValue(nameElem,"name")
  }
    );

  // Get local storage before loaded page
  window.addEventListener("load", () => {
    getLocalStorageInputValue(nameElem,"name")
  });
  }


export function getTimeOfDay(hours: number): string {
  if (hours < 6) {
    return `night`;
  } else if (hours >= 12 && hours < 18) {
    return `afternoon`;
  } else if (hours >= 18) {
    return `evening`;
  } else return `morning`;
}
export function greetingTimeOfDay(timeOfDay: string) {
  const greetingElem = document.querySelector(".greeting");
  if (greetingElem != undefined) {
    greetingElem.textContent = `Good ${timeOfDay}`;
  }
}