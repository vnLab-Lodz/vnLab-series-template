const visit = require("unist-util-visit")
const toString = require("mdast-util-to-string")

// myślę, że spokojnie możemy to uprościć na potrzeby internetowe. Do nowego wiersza przenosimy:
// 1. spójniki i przyimki a, i, o, u, w, z, A, I, O, U, W, Z
const spojniki = new RegExp(" [aiouwzAIOUWZ] ", "g")
// 2. skrótowce jak p., o., św., dr, prof., np., tj., pt., pn., sz. i tak dalej (czyli skrótowce, które odnoszą się wprost do następującego słowa, prof. Jakiś Tam, pt. "Archiwum jako projekt", sz. p. Jakaś Tam i tak dalej)
const skrotowce = new RegExp(" (p.|o.|św.|dr.|prof.|np.|tj.|pt.|pn.|sz.) ", "g")

// przenosimy do nowego wiersza razem ze słowem poprzedzającym:
// 1. jednostki miar i skrótowce typu r., w., m, kg, h, l i tak dalej
const miary = new RegExp(" (r.|w.|m|kg|h|l) ", "g")
// 2. wolnostojące cyfry (1, 2, 3, 4, 5, 6, 7, 8, 9, 0, I, V, X, L, C, D, M)
const cyfry = new RegExp(" [1234567890IVXLCDM] ", "g")
// 3. częste znaki specjalne jak @, #, &
const specjalne = new RegExp(" [@#&] ", "g")

// utrzymujemy na końcu wiersza lub przenosimy do nowego wiersza wraz ze słowem poprzedzającym (jeśli nie da się utrzymać):
// dywizy, półpauzy itp. (-, –) (z wyjątkiem list punktowanych, ale rozumiem, że te są inaczej kodowane)
const dywizy = new RegExp(" (\u2014|\u2013|-) ", "g")

function replaceRegex(node, regex, replacement) {
  const matches = Array.from(node.value.matchAll(regex), m => m[0])
  const uniqueMatches = [...new Set(matches)]

  for (const match of uniqueMatches) {
    const regex = new RegExp(`${match}`, "g")
    const newVal = replacement(match)

    node.value = node.value.replace(regex, newVal)
  }
}

module.exports = ({ markdownAST }, pluginOptions = {}) => {
  visit(markdownAST, `text`, node => {
    if (typeof node.value === "string") {
      replaceRegex(node, spojniki, m => `${m.slice(0, -1)}\u00a0`)
      replaceRegex(node, skrotowce, m => `${m.slice(0, -1)}\u00a0`)
      replaceRegex(node, miary, m => `\u00a0${m.slice(1, -1)}\u00a0`)
      replaceRegex(node, cyfry, m => `\u00a0${m.slice(1, -1)}\u00a0`)
      replaceRegex(node, specjalne, m => `\u00a0${m.slice(1, -1)}\u00a0`)
      replaceRegex(node, dywizy, m => `\u00a0${m.slice(1, -1)} `)
    }
  })

  return markdownAST
}
