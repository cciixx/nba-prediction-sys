# coding:utf-8

# PF是 power forward=大前锋
# PG是 point guard=控球后卫
# C是center 是中锋
# SG是 shooting guard 得分后卫
# SF是 small forward=小前锋


# 转化成1到100内的值
def transform(height, weight, pos, stl, reb, ast, fouls, dunk, efgp):
    d_drib = {"PG": 85,"SG":80, "SF":75,"PF":75,"C":70}
    steal = stl
    drib = d_drib[pos]
    reb = reb
    pas = ast
    phy = 0.1*fouls + 0.3*height + 0.4*weight + 0.2*pos
    jump = 0.5*dunk + 0.5*reb
    run = 0.2*height + 0.3*weight + 0.5*pos
    shoot = efgp
    result = [steal, drib, reb, pas, phy, jump, run, shoot]
    return result




