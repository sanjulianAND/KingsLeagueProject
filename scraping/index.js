import * as cheerio from 'cheerio'

const URLs = {
    leaderboardLink: "https://kingsleague.pro/estadisticas/clasificacion/"
}

async function scrape (url) {
    const res = await fetch (url)
    const html = await res.text()
    return cheerio.load(html)
}
async function getLeaderBorad(){
    const $ = scrape(URLs.leaderboardLink)

    $('table tbody tr').each((index, el) =>{
        //console.log($(el).text())
        const rawTeam = $(el).find(".fs-table-text_3").text()
        const rawVictories = $(el).find(".fs-table-text_4").text()
        const rawDefeats = $(el).find(".fs-table-text_5").text()
        const rawScoredGoals = $(el).find(".fs-table-text_6").text()
        const rawConcededGoals = $(el).find(".fs-table-text_7").text()
        const rawCardsYellow = $(el).find(".fs-table-text_8").text()
        const rawCardsRed = $(el).find(".fs-table-text_9").text()
    
        console.log({
            rawTeam,
            rawVictories
        })
    })
}



/*
const leaderboard =[{
    team: "Team 1",
    victories: 0,
    defeats: 0,
    goalsScored: 0, 
    goalsConceded: 0,
    cardsYellow: 0,
    cardsRed: 0,
}]*/