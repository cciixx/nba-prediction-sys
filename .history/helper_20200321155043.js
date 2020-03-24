var rosterStat = {};
var rStatName = [
    "name",
    "birth_date",
    "height",
    "weight",
    "pos",
    "gp",
    "pts",
    "reb",
    "ast",
    "fgp",
    "trgp",
    "ftfgp"
];

.then(roster => {
      
    for (let i = 0; i < roster.length; i++) {
      var suf = "(TW)";
      var player_name;
      if (roster[i].includes(suf)) {
        player_name = roster[i].replace(suf, "").trimEnd();
      } else {
        player_name = roster[i];
      }
      req.db
        .from("player_stats")
        .select(
          "name",
          "birth_date",
          "height",
          "weight",
          "position",
          "game_played",
          "points",
          "total_rebounds",
          "assists",
          "field_goal_percentage",
          "three_point_percentage",
          "free_throw_percentage"
        )
        .where({ name: player_name })
        .then(rows => {
          console.log(rows[0]);
        });
    }
  })

  