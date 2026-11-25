import {decrypt} from '@/Hooks/codingString'
export function getProjectUrl(parseUrl) {
  return decrypt('crypto')(parseUrl)
} 