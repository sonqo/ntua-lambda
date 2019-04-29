import sys
from collections import deque

class itemSymbol: # Class of cat(A) water(W) elements
    def __init__(self, line, column, symbol, time, position):
        self.line = line; self.column = column; self.symbol = symbol; self.time = time; self.position = position

def validNeighbors(line, column, symbol):
# A function that returns the valid neighbors of an element given

    neighbors = [] # Neighbors are being returned in a list of coordinates (line, column)

    for ln in (line-1, line+1):
        if map[ln][column] != 'X' and map[ln][column] != 'W':
            if symbol == 'A':
                if map[ln][column] != 'A':
                    neighbors.append([ln, column])
                    leastPossPad(ln, column)
            else:
                neighbors.append([ln, column])
    for cl in (column-1, column+1):
        if map[line][cl] != 'X' and map[line][cl] != 'W':
            if symbol == 'A':
                if map[line][cl] != 'A':
                    neighbors.append([line, cl])
                    leastPossPad(line, cl)
            else:
                neighbors.append([line, cl])

    return neighbors

def leastPossPad(line, column):
# A function that returns the upper and righter possible position of Arjumand possible at each specific time

    global leastl; global leastc

    if line < leastl: # Prioritazing line over column in the best possible position
        leastl = line; leastc = column
    elif line == leastl:
        if column < leastc:
            leastl = line; leastc = column

map = []
queue = deque()

# Map padding
with open(sys.argv[1]) as fileobj:
    for line in fileobj:
        # Line reading and border of X's added to each line
        map.append(['X'] + list(line.rstrip()) + ['X'])
fileobj.close()

# Lines(N) and columns(M) calculation
N = len(map)
M = len(map[0]) - 2

# Border creation of X's added to first and last line of map
map.insert(0, ['X' for i in range (M+2)])
map.insert(N+1, ['X' for i in range (M+2)])

time = 0
# Enqueing water and cat elements
for i in range (1, N+1):
    for j in range (1, M+1):
        ch = map[i][j]
        if ch is 'W' or ch is 'A':
            if ch is 'A':
                leastl = i; leastc = j # Starting pad of Arjumand
            ch = itemSymbol(i, j, ch, time, "")
            queue.append(ch)

# Initialization of time variables
arjumand = 0
global_time = 0

element = queue[0]

while queue: # Floodfilling W's and A elements

    while element.time == global_time:

        temp_element = validNeighbors(element.line, element.column, element.symbol)

        for item in temp_element:
            temp_line = item[0]; temp_column = item[1]
            if element.symbol == 'W':
                if map[temp_line][temp_column] == 'A':
                    if global_time > arjumand: # Keeping coordinates of best possible time
                        arjumand = global_time
                        lpath = temp_line; cpath = temp_column
                    elif global_time == arjumand: # Minimizing string sequence
                        if temp_line <= lpath:
                            if temp_column <= cpath:
                                lpath = temp_line; cpath = temp_column
            ch = itemSymbol(temp_line, temp_column, element.symbol, time+1, "")
            map[temp_line][temp_column] = element.symbol
            path[temp_line][temp_column] = ch.position
            queue.append(ch)

        if queue: # If queue is not empty go to next element, else break time - loop
            element = queue.popleft()
            time = element.time
        else:
            global_time = -1
    global_time += 1

if (arjumand == 0):
    print("infinity")
else:
    print(arjumand)

