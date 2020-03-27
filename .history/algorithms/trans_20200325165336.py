# coding:utf-8

# PF是 power forward=大前锋
# PG是 point guard=控球后卫
# C是center 是中锋
# SG是 shooting guard 得分后卫
# SF是 small forward=小前锋

import sys

def get_height(height):
    feet, inches = height.split('-')
    height_in_inches = int(feet) * 12 + int(inches)
    height_in_cm = round(height_in_inches * 2.54, 1)
    height = height_in_cm - 120
    if height > 100:
        height = 100
    return height

def get_weight(weight):
    weight_in_kg = round(float(weight) * 0.3048, 1)
    weight = weight_in_kg / 1.5 + 6
    return weight

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
    name = player_stats['name']
    result = [name, steal, drib, reb, pas, phy, jump, run, shoot]
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