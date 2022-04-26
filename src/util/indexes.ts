export function getChapterFromIndex(index: number) {
  const chapter = index.toFixed(2).split(".")[1]

  if (typeof chapter === "undefined") return "00"

  return chapter
}

export function getChapterNumberFromIndex(index: number) {
  const chapter = index.toString().split(".")[1]

  if (typeof chapter === "undefined") return 0

  return Number(chapter)
}

export function getPartFromIndex(index: number) {
  return Math.floor(index)
}
