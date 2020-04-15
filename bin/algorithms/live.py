# coding:utf-8
import random
import time

point2 = ['两分命中', '球进了！！！']
point3 = ['FOR THREEEEE!!', '三分球命中']


class Player:
    def __init__(self, name, fg, fg3, ft, dunk, attend3, attempt, dunk_attend):
        self.name = name
        # 命中率
        self.fg = fg
        self.fg3 = fg3
        self.ft = ft
        self.dunk = dunk
        # 出手率
        self.attend3 = attend3  # 三分出手率
        self.attempt = attempt  # 个人出手率
        self.dunk_attend = dunk_attend
        self.score = 0

    def play(self, pass_times):
        shoot_or_pass = random.random()
        if shoot_or_pass >= self.attempt + pass_times*0.1:
            return 1
        else:
            shoot_or_dunk = random.random()
            print("%s 持球准备出手" % self.name)
            if shoot_or_dunk >= self.dunk_attend:
                result = self.shoot()
            else:
                result = self.duk()
            return result

    def shoot(self):
        choose = random.random()
        success = random.random()
        if choose >= self.attend3:
            print("%s中距离出手" % self.name)
            if success <= self.fg:
                # print("%s 两分命中" % self.name)
                print(random.choice(['穿针，漂亮！', '稳稳的，两分入袋', '两分命中']))
                self.score = self.score + 2
                return 2
            else:
                print(random.choice(['框都要被打歪了。。。', '差一点，，', '打铁狂魔']))
                return 0
        else:
            print("%s三分出手" % self.name)
            if success <= self.fg3:
                print(random.choice(['FOR THREEEEE!!', '三分球命中！', '压哨三分！！！！']))
                self.score = self.score + 3
                return 3
            else:
                print(random.choice(['哎呀，可惜了！', '没有。。。', 'AIR BALL',  '一个三不沾']))
                return 0

    def duk(self):
        success = random.random()
        print("%s尝试灌篮" % self.name)
        if success <= self.dunk:
            # print("%s 一记暴扣，两分入账" % self.name)
            print(random.choice(['一记暴扣！两分入账', '一记暴扣，谁都拦不住！']))
            self.score = self.score + 3
            return 2
        else:
            print("%s 惨遭血帽" % self.name)
            return 0


def get_player(pos):
    return Player


class Team:
    def __init__(self, name, tag="H"):
        self.tag = tag
        self.name = name
        self.score = 0
        # self.PG = get_player('PG')
        # self.SG = get_player('SG')
        # self.SF = get_player('SF')
        # self.PF = get_player('PF')
        # self.C = get_player('C')
        # 库里 汤普森 格林 鲁尼 一哥
        # 伊巴卡 洛瑞，丹尼-格林，伦纳德，西亚卡姆
        # name, fg, fg3, ft, dunk, attend3, attempt, dunk_attend
        if tag == 'H':
            self.PG = Player('库里', 0.476, 0.435, 0.906, 0.1, 0.48, 0.32, 0.01)
            self.SG = Player('汤普森', 0.459, 0.419, 0.848, 0.1, 0.437, 0.30, 0.01)
            self.SF = Player('格林', 0.435, 0.319, 0.710, 0.05, 0.373, 0.14, 0.01)
            self.PF = Player('伊戈达拉', 0.466, 0.334, 0.709, 0.3, 0.29, 0.2, 0.02)
            self.C = Player('鲁尼', 0.57, 0.15, 0.60, 0.01, 0.06, 0.1, 0.06)
        else:
            self.PG = Player('伊巴卡', 0.518, 0.361, 0.76, 0.1, 0.176, 0.174, 0.01)
            self.SG = Player('洛瑞', 0.423, 0.366, 0.809, 0.1, 0.455, 0.191, 0.01)
            self.SF = Player('丹尼-格林', 0.424, 0.402, 0.810, 0.626, 0.128, 0.14, 0.1)
            self.PF = Player('伦纳德', 0.491, 0.381, 0.854, 0.3, 0.286, 0.340, 0.02)
            self.C = Player('西亚卡姆', 0.504, 0.333, 0.766, 0.01, 0.255, 0.167, 0.06)

    def play(self):
        over = 0
        pass_times = 0
        last_who = ''
        while over == 0:
            who = random.choice([self.PG, self.SG, self.SF, self.PF, self.C])
            if last_who != who:
                print("球传到了%s的手里" % who.name)
            if random.random() < 0.2:
                print(random.choice(['妙传！', '传得好!']))
            pass_times = pass_times + 1
            result = who.play(pass_times)
            last_who = who
            if result != 1:
                self.score = self.score + result  # 算分
                over = 1
        return


def live_5V5(Hname, Vname):
    H = Team(Hname)
    V = Team(Vname, "V")

    time_left = 2880

    print("比赛开始")
    print("%s 拿到球权" % Hname)
    while time_left > 0:
        # time.sleep(1)
        H.play()
        time = random.randint(12, 24)
        time_left -= time
        # time.sleep(1)
        V.play()
        time = random.randint(12, 24)
        time_left -= time
        print("现在比分是%d-%d" % (H.score, V.score))

        if time_left in range(160, 180):
            print("时间还剩三分钟")
        if time_left in range(40, 60):
            print("还有一分钟不到的时间拉")

    print("GAME OVER")


def live_1V1(Player1, Player2):
    time_left = 300
    print("比赛开始")
    print("%s 拿到球权" % Player1)
    while time_left > 0 and Player1.score < 11 and Player2.score < 11:
        # time.sleep(1)
        Player1.play(0)
        time = random.randint(8, 20)
        time_left -= time

        if Player1.score >= 11 or Player2.score >= 11:
            print("最后的比分是%d-%d" % (Player1.score, Player2.score))
            return
        Player2.play(0)
        time = random.randint(8, 20)
        time_left -= time
        print("现在比分是%d-%d" % (Player1.score, Player2.score))

        if time_left in range(40, 60):
            print("还有一分钟不到的时间拉")
    print("GAME OVER")


if __name__ == '__main__':
    # Hname = "金州勇士队"
    # Vname = "多伦多猛龙队"
    # live_5V5(Hname, Vname)

    Player1 = Player('库里', 0.476, 0.435, 0.906, 0.1, 0.6, 1, 0.01)
    Player2 = Player('汤普森', 0.459, 0.419, 0.848, 0.1, 0.6, 1, 0.01)
    live_1V1(Player1, Player2)





