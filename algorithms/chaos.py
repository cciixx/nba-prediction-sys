# coding:utf-8
import csv


# 得到18-19表格
header= ['WTeam','LTeam','WLoc']
with open('games_result.csv', 'r') as f1, open('data18-19/2018-2019_result.csv', 'w', newline='') as f2:
    ff = csv.writer(f2)
    ff.writerow(header)

    reader = csv.reader(f1)
    for read_row in reader:
        row = []
        print(read_row)
        visitor = read_row[2]
        v_pts = read_row[3]
        home = read_row[4]
        h_pts = read_row[5]
        if (v_pts > h_pts):
            win = 'V'
            winTeam =visitor
            loseTeam = home
        else:
            win = 'H'
            winTeam = home
            loseTeam = visitor
        row.append(winTeam)
        row.append(loseTeam)
        row.append(win)
        ff.writerow(row)
    f1.close()
    f2.close()
