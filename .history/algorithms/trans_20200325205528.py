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
    height = round(height_in_cm - 120, 0)
    if height > 100:
        height = 100
    return height

def get_weight(weight):
    weight_in_kg = round(float(weight) * 0.3048, 1)
    weight = weight_in_kg / 1.5 + 6
    return weight

# 转化成1到100内的值
def transform(name, height, weight, pos, stl, reb, ast, fouls, dunk, efgp):
    d_drib = {"PG": 85,"SG":80, "SF":75,"PF":75,"C":70}
    steal = stl
    drib = d_drib[pos]
    reb = reb
    pas = ast
    phy = 0
    jump = 0
    run = 0.2*get_height(height) + 0.3*get_weight(weight) + 0.5*drib
    shoot = efgp
    name = name
    result = [name, steal, drib, reb, pas, phy, jump, run, shoot]
    return result

if __name__ == "__main__":
    trans = transform(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5], sys.argv[6], sys.argv[7], sys.argv[8], sys.argv[9], sys.argv[10]);
    print(trans)