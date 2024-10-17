import { mergeWith } from 'lodash'

export default function mergeData<T>(unsafeData: T, defaultData: T) {
  return mergeWith({}, defaultData, unsafeData, (objValue, srcValue) => {
    return srcValue === null ? objValue : srcValue
  })
}
