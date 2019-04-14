from collections import deque
import sys

def floodFill(element):
    """ A function that floodfills the area around an element given."""
    line = element.line; column = element.column; symbol = element.symbol; time = element.time; position = element.position

    global arjumand; global global_time; global lpath; global cpath; global leastl; global leastc

    neigh_line = (line-1, line+1); neigh_column = (column-1, column+1)

    if symbol is 'A':
        for item in neigh_line:
            if array[item][column] is not 'X' and array[item][column] is not 'A' and array[item][column] is not 'W':
                array[item][column] = 'A'
                if item is line-1:
                    ch = itemSymbol(item, column, 'A', time + 1, position + 'U')
                    if column < leastc or item < leastl:
                        leastl = item; leastc = column
                else:
                    ch = itemSymbol(item, column, 'A', time + 1, position + "D")
                queue.append(ch)
        for item in neigh_column:
            if array[line][item] is not 'X' and array[line][item] is not 'A' and array[line][item] is not 'W':
                array[line][item] = 'A'
                if item is column-1:
                    ch = itemSymbol(line, item, 'A', time + 1, position + 'L')
                    if line <= leastl:
                        if item < leastc:
                            leastl = line; leastc = item
                else:
                    ch = itemSymbol(line, item, 'A', time + 1, position + 'R')
                queue.append(ch)

    if symbol is 'W':
        for item in neigh_line:
            if array[item][column] is not 'X' and array[item][column] is not 'W':
                if array[item][column] is 'A':
                    if global_time-1 is arjumand:
                        if item < lpath:
                            lpath = item
                    elif global_time > arjumand:
                        arjumand = global_time-1
                        lpath = item; cpath = column
                array[item][column] = 'W'
                ch = itemSymbol(item, column, 'W', time+1, "")
                queue.append(ch)
        for item in neigh_column:
            if array[line][item] is not 'X' and array[line][item] is not 'W':
                if array[line][item] is 'A':
                    if global_time - 1 is arjumand:
                        if item < cpath:
                            cpath = item
                    elif global_time > arjumand:
                        arjumand = global_time - 1
                        lpath = line; cpath = item
                array[line][item] = 'W'
                ch = itemSymbol(line, item, 'W', time+1, "")
                queue.append(ch)

# Class of cat(A) water(W) elements
class itemSymbol:
    def __init__(self, line, column, symbol, time, position):
        self.line = line; self.column = column; self.symbol = symbol; self.time = time; self.position = position

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
            if ch is 'A':
                start_line = i; start_column = j; leastl = i; leastc = j
            ch = itemSymbol(i, j, ch, time, "")
            queue.append(ch)

element = queue.popleft()
time = element.time;

# Latest possible time for Arjumand to be saved
arjumand = 0; global_time = 0
# Path of Arjumand
lpath = N; cpath = M
leastl = start_line; leastc = start_column

# Floodfilling A's and W's
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
    print(global_time)

    for i in range(0, N + 2):
        print(*array[i], sep = ' ')
    print("\n")

if arjumand is 0:
    print("infinity")
else:
    print(arjumand)