# coding:utf-8

# PF是 power forward=大前锋
# PG是 point guard=控球后卫
# C是center 是中锋
# SG是 shooting guard 得分后卫
# SF是 small forward=小前锋

import sys

# 转化成1到100内的值
def transform(player_stats):
    d_drib = {"PG": 85,"SG":80, "SF":75,"PF":75,"C":70}
    steal = player_stats['stl']
    drib = d_drib[player_stats['pos']]
    reb = player_stats['reb']
    pas = player_stats['ast']
    phy = 0.1*player_stats['fouls'] + 0.3*player_stats['height'] + 0.4*player_stats['weight'] + 0.2*drib
    jump = 0.5*player_stats['dunk'] + 0.5*player_stats['reb']
    run = 0.2*player_stats['height'] + 0.3*player_stats['weight'] + 0.5*drib
    shoot = player_stats['efgp']
    result = [steal, drib, reb, pas, phy, jump, run, shoot]
    return result

if __name__ == "__main__":
    # a = {
    #     "height": 190,
    #     "weight": 86,
    #     "pos": "PG",
    #     "stl": 12,
    #     "reb": 12,
    #     "ast": 12,
    #     "fouls": 12,
    #     "dunk": 12,
    #     "efgp": 12.3
    # }
    trans = transform(sys.argv[1]);
    print(trans)