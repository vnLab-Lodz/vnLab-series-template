import { isUndefined } from "~util"

export function getChapterFromIndex(index: number) {
  const chapter = index.toString().split(".")[1]

  if (isUndefined(chapter)) return "00"

  return Number(chapter) >= 10 ? chapter : `0${chapter}`
}

export function getPartFromIndex(index: number) {
  return Math.floor(index)
}
