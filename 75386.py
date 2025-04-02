from itertools import *


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


print(f(208, 2))

# for n in range(1, 1000):
#     n4 = f(n, 4)
#     if n % 2 != 0:
#         r = '2' + n4 + '11'
#     else:
#         r = '13' + n4 + '02'
#     R = int(r, 4)
#     if R > 1000:
#         print(R)
#         break
#




# k = 0
# for n in range(1, 10000):
#     if n % 3 == 0:
#         n /= 3
#     else: n -= 1
#     if n % 7 == 0:
#         n /= 7
#     else: n -= 1
#     if n % 11 == 0:
#         n /= 11
#     else: n -= 1
#     if n == 6:
#         k += 1
# print(k)


