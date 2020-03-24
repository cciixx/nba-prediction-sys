# coding:utf-8

import pandas as pd
import numpy as np
from sklearn.externals import joblib
import json
import csv
import sys

# input : 主场队伍，客场队伍 // output： 主场胜率 客场胜率
def main(team_home, team_visitor):
    team_elos = {}
    team_stats = {}
    with open('./algorithms/team_elos.json', 'r') as f1, open('./algorithms/team_stats.csv', 'r') as f2:
        team_elos = json.load(f1)
        team_stats = pd.read_csv(f2)
    f1.close()
    f2.close()
    team_stats = team_stats.set_index('Team', inplace=False, drop=True)

    # print(team_elos)
    
    # print(team_stats)

    model = joblib.load('./algorithms/model1.pkl')
    features = []

     # team 1，主场队伍
    features.append(team_elos[team_home] + 100)
    for key, value in team_stats.loc[team_home].iteritems():
        features.append(value)

   # team 2，客场队伍
    features.append(team_elos[team_visitor])
    for key, value in team_stats.loc[team_visitor].iteritems():
        features.append(value)

    features = np.nan_to_num(features)
    pred = model.predict_proba([features])
    return pred[0][0], pred[0][1]

if __name__ == "__main__":
    result = main(sys.argv[1], sys.argv[2])
    homeWp = str(round(result[0]*100, 1))
    awayWp = str(round(result[1]*100, 1))
    predict = {"homeWp": homeWp, "awayWp": awayWp}
    print(predict)
# s