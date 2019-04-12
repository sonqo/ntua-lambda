import sys
from collections import deque

# Class of cat(A) water(W) elements
class itemSymbol:
    def __init__(self, line, column, symbol, time, pos):
        self.line = line
        self.column = column
        self.symbol = symbol
        self.time = time
        self.position = pos

array = []
queue = deque()

# Map padding
with open(sys.argv[1]) as fileobj:
    for line in fileobj:
        # Line reading and border of X's
        array.append(['X'] + list(line.rstrip()) + ['X'])
fileobj.close()

# Lines(N) and columns(M) calculation
N = len(array)
M = len(array[1]) - 2

# Border creation of X's
array.insert(0, ['X' for i in range (M+2)])
array.append('X' for i in range (M+2))

# Printing map
for i in range(0, N+2):
        print(*array[i], sep = ' ')
print("\n")

# Enqueing water and cat elements
time = 1
for i in range (1, N+1):
    for j in range (1, M+1):
        ch = array[i][j]
        if ch is 'W' or ch is 'A':
            ch = itemSymbol(i, j, ch, time, "")
            queue.append(ch)

element = queue.popleft()