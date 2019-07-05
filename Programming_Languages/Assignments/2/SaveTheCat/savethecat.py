import sys
from collections import deque

class ItemSymbol: # Class of cat(A) water(W) elements
    """ Class of elements found on map, which keeps time of element expansion and it's respective path. """
    def __init__(self, line, column, symbol, time, position):
        self.line = line; self.column = column; self.symbol = symbol; self.time = time; self.position = position

def validNeighbors(line, column, symbol):
    """ A function that receives line and column of an element and returns all valid neighbors. In addition,
    it classifies neighbors during the second act of the algorithm, when the pathfinding of Arjumand is necessary. """

    neighbors = [] # Neighbors are being returned in a list of coordinates (line, column)

    if symbol != 'P':
        for ln in (line-1, line+1):
            if map[ln][column] != 'X' and map[ln][column] != symbol:
                if symbol == 'A':
                    if map[ln][column] != 'W':
                        neighbors.append([ln, column])
                        leastPossPad(ln, column)
                else:
                    neighbors.append([ln, column])
        for cl in (column-1, column+1):
            if map[line][cl] != 'X' and map[line][cl] != symbol:
                if symbol == 'A':
                    if map[line][cl] != 'W':
                        neighbors.append([line, cl])
                        leastPossPad(line, cl)
                else:
                    neighbors.append([line, cl])
    elif symbol: # Always expand pads with the order D - L - R - U => Always finding the best path
        if map[line+1][column] != 'X' and map[line+1][column] != 'P':
            neighbors.append([line+1, column])
        if map[line][column-1] != 'X' and map[line][column-1] != 'P':
            neighbors.append([line, column-1])
        if map[line][column+1] != 'X' and map[line][column+1] != 'P':
            neighbors.append([line, column+1])
        if map[line-1][column] != 'X' and map[line-1][column] != 'P':
            neighbors.append([line-1, column])

    return neighbors

def leastPossPad(line, column):
    """ A function that calculates the best possible pad of Arjumand when she is not in danger. """

    global leastl; global leastc

    if line < leastl: # Prioritazing line over column in the least possible position
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
                start_line = i; start_column = j
            ch = ItemSymbol(i, j, ch, time, "")
            queue.append(ch)

arjumand = 0; # Longest possible time for Arjumand to be saved
global_time = 0 # Global time of expansion

empty = False # Queue flag
element = queue[0] # Getting first element without popping it - covers the zero flood case ;)

while not empty: # Floodfilling W's and A elements

    while element.time == global_time:

        temp_element = validNeighbors(element.line, element.column, element.symbol)

        for item in temp_element:
            temp_line = item[0]; temp_column = item[1]
            if element.symbol == 'W':
                if map[temp_line][temp_column] == 'A':
                    if global_time == arjumand: # Keeping coordinates of best possible time
                        if temp_line < lpath:
                            lpath = temp_line; cpath = temp_column
                        elif temp_line == lpath:
                            if temp_column < cpath:
                                lpath = temp_line; cpath = temp_column
                    elif global_time > arjumand: # Minimizing string sequence
                        arjumand = global_time
                        lpath = temp_line; cpath = temp_column
            ch = ItemSymbol(temp_line, temp_column, element.symbol, time+1, "")
            map[temp_line][temp_column] = element.symbol
            queue.append(ch)
        if queue: # If queue is not empty go to next element, else break time - loop
            element = queue.popleft()
            time = element.time
        else:
            empty = True
            global_time = -1
    global_time += 1

ch = ItemSymbol(start_line, start_column, 'P', 0, "") # Initializing Arjumand for path finding
map[start_line][start_column] = 'P'
queue.append(ch)

flag = 0 # Path is found
path = "" # Moves Arjumand ought to follow when in danger
road = "" # Moves Arjumand ought to follow in order to reach least possible coordinates (line > column)
global_time = 0

empty = False
element = queue[0]

while not empty and flag != 1:

    while element.time == global_time:

        temp_element = validNeighbors(element.line, element.column, element.symbol)

        for item in temp_element:
            temp_line = item[0]; temp_column = item[1]
            if temp_line > element.line: # Prioritazing: D - L - R - U
                pos = element.position + "D"
            if temp_column < element.column:
                pos = element.position + "L"
            if temp_column > element.column:
                pos = element.position + "R"
            if temp_line < element.line:
                pos = element.position + "U"
            ch = ItemSymbol(temp_line, temp_column, element.symbol, time+1, pos)
            map[temp_line][temp_column] = element.symbol
            queue.append(ch)
            if arjumand != 0:
                if temp_line == lpath and temp_column == cpath: # Keep path when found
                    path = pos
                    flag = 1 # Stop searching when path has been found
            else:
                if temp_line == leastl and temp_column == leastc: # Keep road when found
                    road = pos
                    flag = 1 # Stop searching when path has been found
        if queue:
            element = queue.popleft()
            time = element.time
        else:
            empty = True
            global_time = -1
    global_time += 1

if arjumand == 0: # Printing when Arjumand is not in danger
    print("infinity")
    if road == "":
        print("stay")
    else:
        print(road)

else: # Printing when Arjumand ought to be saved
    print(arjumand)
    if path == "":
        print("stay")
    else:
        print(path) 
        