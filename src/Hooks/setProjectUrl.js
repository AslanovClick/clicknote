import { encrypt } from "./codingString";

export function setProjectUrl(urlParams) {
  return `/project/p${encrypt('crypto')(urlParams)}`;
}