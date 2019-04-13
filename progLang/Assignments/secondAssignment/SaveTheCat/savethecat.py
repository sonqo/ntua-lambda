import sys
from collections import deque

def floodFill(element):
    """ A function that floodfills the area around the element given. It also enqueues in case of (W) or (A)."""

    # Getting coordinations, symbol and time
    line = element.line; column = element.column; symbol = element.symbol; position = element.position; time = element.time

    # Getting neighbor elements
    itemWest = array[line][column - 1]; itemEast = array[line][column + 1]
    itemNorth = array[line - 1][column]; itemSouth = array[line + 1][column]

    if symbol is 'W':
        if itemWest is not 'X' and itemWest is not 'W':
            if itemWest is 'A':
                arjumand = 1
            array[line][column-1] = symbol
            item = itemSymbol(line, column-1, symbol, time+1, position + 'L')
            queue.append(item)
        if itemEast is not 'X' and itemEast is not 'W':
            if itemEast is 'A':
                arjumand = 1
            array[line][column+1] = symbol
            item = itemSymbol(line, column+1, symbol, time+1, position + 'R')
            queue.append(item)
        if itemNorth is not 'X' and itemNorth is not 'W':
            if itemNorth is 'A':
                arjumand = 1
            array[line-1][column] = symbol
            item = itemSymbol(line-1, column, symbol, time+1, position + 'U')
            queue.append(item)
        if itemSouth is not 'X' and itemSouth is not 'W':
            if itemSouth is 'A':
                arjumand = 1
            array[line+1][column] = symbol
            item = itemSymbol(line+1, column, symbol, time+1, position + 'D')
            queue.append(item)

# Class of cat(A) water(W) elements
class itemSymbol:
    def __init__(self, line, column, symbol, time, position):
        self.line = line
        self.column = column
        self.symbol = symbol
        self.time = time
        self.position = position

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
M = len(array[0]) - 2

# Border creation of X's
array.insert(0, ['X' for i in range (M+2)])
array.insert(N+1, ['X' for i in range (M+2)])

# Enqueing water and cat elements
time = 1
for i in range (1, N+1):
    for j in range (1, M+1):
        ch = array[i][j]
        if ch is 'W' or ch is 'A':
            ch = itemSymbol(i, j, ch, time, "")
            queue.append(ch)

element = queue.popleft()
time = element.time; global_time = 0
arjumand = 0

while queue:
    print("Time: " + str(global_time))
    while global_time is time:
        floodFill(element)
        if queue:
            element = queue.popleft()
            time = element.time
        else:
            global_time = -1
    global_time += 1
    for i in range(0, N + 2):
        print(*array[i], sep=' ')
    print("\n")

if arjumand is 0:
    print("infinity")
else:
    print(arjumand)