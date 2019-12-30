export const api = {
  URL_LEAGUE_FROM_SEASON:
    "https://api-football-v1.p.rapidapi.com/v2/leagues/season/",
  URL_LEAGUE_DETAIL:
    "https://api-football-v1.p.rapidapi.com/v2/leagues/league/891", //{season}
  URL_FIXURES_BY_ID:
    "https://api-football-v1.p.rapidapi.com/v2/fixtures/id/",
  URL_FIXURES_BY_LEAGUE:
    "https://api-football-v1.p.rapidapi.com/v2/fixtures/league/891/", //{season}
  URL_CURRENT_ROUND_FOR_A_LEAGUE:
    "https://api-football-v1.p.rapidapi.com/v2/fixtures/rounds/891/current",
  URL_AVAIBLE_SEASONS_FOR_LEAGUE_BY_SEASON:
    "https://api-football-v1.p.rapidapi.com/v2/leagues/seasonsAvailable/", //available seasons for a league filtered by season | {league_id} + {season}
  URL_ALL_SEASON:
    "https://api-football-v1.p.rapidapi.com/v2/fixtures/rounds/",
  URL_STANDINGS:
    "https://api-football-v1.p.rapidapi.com/v2/leagueTable/", //{season}
  URL_TEAM_BY_ID:
    "https://api-football-v1.p.rapidapi.com/v2/teams/team/", //{team_id}
  URL_TEAM_STATISTICS:
    "https://api-football-v1.p.rapidapi.com/v2/statistics/", //{league_id} + {team_id}
  SERIE_A:
    891,
  TIMEZONE:
    "Europe/London",
  KEY:
    "49b88873e7msh4db13303a649fb3p1dae0fjsn97b8a4c52e82",
};
