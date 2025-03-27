def f10(x, n):
    x10 = str()
    while x != 0:
        x10 += str(x % n)
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


def f3():
    for n in range(750, 1, -1):

        n_bin = f(n, 2)

        for i in range(3):
            if n_bin.count('0') == n_bin.count('1'):
                n_bin += n_bin[-1]
            elif n_bin.count('0') > n_bin.count('1'):
                n_bin += '1'
            else:
                n_bin += '0'

        R = int(n_bin, 2)

        if R % 2 == 0 and R % 4 != 0:
            return n


def f4():
    for n in range(100000, 1, -1):
        n_hex = f(n // 2, 16)

        if int(n_hex, 16) % 4 != 0:
            n_hex = ('F' + n_hex + 'A0')
        else:
            n_hex = ('15' + n_hex + 'C')

        R = int(n_hex, 16)

        if R < 65536:
            return n


def f5():
    res = []

    for n in range(1, 1000):

        n_3 = f10(n, 3)

        if int(n_3, 3) % 3 == 0:
            n_3 += n_3[-2:]
        else:
            n_3 += f10(sum(map(int, list(n_3))), 3)

        R = int(n_3, 3)

        if R % 2 == 0 and R > 220:
            res.append(R)

    print(min(res))


def f6():
    res = []
    
    for n in range(10000, 1, -1):
        n_bin = f(n, 2)[1:]
    
        if n_bin.count('1') % 2 == 0:
            n_bin = '10' + n_bin
        else:
            n_bin = '1' + n_bin + '0'
    
        R = int(n_bin, 2)
    
        if R < 450:
            res.append(R)
    
    print(max(res))


def f7():
    for n in range(1, 10000):
        s = ''
        x = n

        while x:
            s = "{:04b}".format(x % 10) + s
            x //= 10

        si = ""

        for c in s:
            if c == '0':
                si += '1'
            else:
                si += '0'

        R = int(si, 2)

        if R == 151:
            return print(n)

print(f7())
