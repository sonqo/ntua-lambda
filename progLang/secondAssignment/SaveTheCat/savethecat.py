from collections import deque

# Class of cat(A) water(W) and elements
class itemSymbol:
    def __init__(self, line, column, symbol, time, pos):
        self.line = line
        self.column = column
        self.symbol = symbol
        self.time = time
        self.position = pos

N = 0
M = 0
flag = 0

# Line and columns calculation
with open("savethecat.txt") as fileobj:
    for line in fileobj:
        N += 1
        for ch in line:
            if flag is 0 and ch != '\n':
                M += 1
        flag = 1
fileobj.close()

# List Declaration and border creation of X's
array = [['X' for x in range(M+2)] for y in range(N+2)]

queue = deque()

# File reading and map padding
time = 0
with open("savethecat.txt") as fileobj:
    for i in range(1, N+1):
        string = fileobj.readline()
        for j in range (1, M+1):
            ch = string[j-1]
            array[i][j] = ch
            if ch is '+' or ch is '-':
                ch = itemSymbol(i, j, ch, time, "")
                queue.append(ch)