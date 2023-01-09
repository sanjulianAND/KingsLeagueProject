import * as cheerio from 'cheerio'

const URLs = {
  leaderBoardLink: 'https://kingsleague.pro/estadisticas/clasificacion/'
}

async function scrape (url) {
  const res = await fetch(url)
  const html = await res.text()
  return cheerio.load(html)
}
async function getLeaderBoard () {
  const $ = await scrape(URLs.leaderBoardLink)
  const $rows = $('table tbody tr')

  // Crea un array con key y value
  const LEADERBOARD_SELECTORS = {
    team: '.fs-table-text_3',
    wins: '.fs-table-text_4',
    defeats: '.fs-table-text_5',
    scoredGoals: '.fs-table-text_6',
    concededGoals: '.fs-table-text_7',
    yellowCards: '.fs-table-text_8',
    redCards: '.fs-table-text_9'
  }

  // Este código sirve para quitar los espacios, saltos de línea y carácteres especiales de un texto
  const cleanText = text => text
    .replace(/\t|\n|\s:/g, '')
    .replace(/.*:/g, ' ')
    .trim()

  const leaderBoardSelectorEntries = Object.entries(LEADERBOARD_SELECTORS)

  $rows.each((index, el) => {
    const leaderBoardEntries = leaderBoardSelectorEntries.map(([key, selector]) => {
      const rawValue = $(el).find(selector).text()
      const value = cleanText(rawValue)
      return [key, value]
    })
    console.log(Object.fromEntries(leaderBoardEntries))
  })
}

await getLeaderBoard()
