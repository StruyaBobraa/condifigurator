from itertools import *
from ipaddress import *


def f10(x, n):
    x10 = []
    while x != 0:
        x10.append(x % n)
        x //= n
    return x10[::-1]


def f(x, n):
    xn = ''
    alp = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    while x != 0:
        if x % n >= 10:
            xn = alp[x % n - 10] + xn
        else:
            xn = str(x % n) + xn
        x //= n
    return xn





# A = [255, 254, 252, 248, 240, 224, 192, 128]
# for i in A:
#     net = ip_network(f'117.157.2.8/255.255.{i}.0', 0)
#     if all(bin(int(ip))[2:][:-15].count('1') >= bin(int(ip))[18:].count('1') for ip in net):
#         print(i)
