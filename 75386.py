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




count = 0
for i in product('01234567', repeat = 6):
    s = ''.join(i)
    if s[0] != '3' and s.count('1') == 3 and int(s, 8) % 2 == 0:
        count += 1
print('7387:', count)

alf = 'АБОРСУЭ'

k = 0
n = 0
for i in product(alf, repeat = 5):
    s = ''.join(i)
    n += 1
    if any(f'Р{m}Р' in s for m in 'АБОСЭ') and n % 2 == 0 and s.count('Р') >= 2 and 'У' not in s:
        k += 1

print(k)


count1 = 0
for i in product('01234567', repeat=6):
    s = ''.join(i)
    a = True
    for j in s:
        if j != '4' and s.count(j) > 1:
            a = False
            break
    if s.count('4') == 2 and '44' not in s and a == True:
        b = True
        idx1 = s.find('4')
        idx2 = s.rfind('4')
        for j in range(idx1 + 1, idx2):
            if int(s[j]) < 5:
                b = False
                break
        if b:
            count1 += 1

print('7444:', count1)




        # k = 0
        # for i in product('01234', repeat = 5):
        #     s = ''.join(i)
        #     if s[0] == '4' and '00' not in s:
        #         print(int(s, 5))

        # print((int('30102', 4)) - int('10203', 4) + 1)

        # for i in range(1, 256):
        #     n8 = f(i, 2)
        #     n8 = '0' * (8 - len(n8)) + n8
        #     n8 = n8[:2] + n8[6:]
        #     r = int(n8, 2)
        #     if r == 10 and i > 130:
        #         print(i)

        # def fn(n):
        #     n2 = bin(n)[2:]
        #     n2 = n2[0] + ''.join('1' if x == '0' else '0' for x in n2[1:])
        #     return n + int(n2, 2)
        #
        #
        # ans = []
        # for n in range(1, 1000):
        #     r = fn(n)
        #     if r <= 123:
        #         ans.append(r)
        # print(max(ans))
