import qs from 'qs'

export function filter(filter) {
  return qs.stringify(filter)
}
