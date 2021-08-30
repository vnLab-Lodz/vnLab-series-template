export function getChapterFromIndex(index: number) {
  const chapter = index.toString().split(".")[1]

  if (typeof chapter === "undefined") return "00"

  return Number(chapter) >= 10 ? chapter : `0${chapter}`
}

export function getPartFromIndex(index: number) {
  return Math.floor(index)
}
