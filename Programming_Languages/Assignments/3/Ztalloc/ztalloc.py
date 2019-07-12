import sys
from collections import deque

import time

class Borders:
    """ Class of cases, containing lower border, higher border, path of numeric calculations followed to this state and number of state """
    def __init__(self, low_b, high_b, path, state):
        self.low_b = low_b; self.high_b = high_b; self.path = path; self.state = state

class HashMap:
    """ HashMap class used to eliminate revisits to already visited states - https://bit.ly/2G9BMzp """
    def __init__(self):
        self.size = 1000000
        self.map = [None] * self.size

    def getHash(self, key):
        hash = key
        return hash
    
    def addHash(self, key, value):
        key_hash = self.getHash(key)
        key_value = [key, value]

        if self.map[key_hash] is None:
            self.map[key_hash] = list([key_value])
            return True
        else:
            self.map[key_hash].append(key_value)
            return True
    
    def findHash(self, key, value):
        key_hash = self.getHash(key)

        if self.map[key_hash] is not None:
            for pair in self.map[key_hash]:
                if pair[1] == value:
                    return True
        return False

start_time = time.time()

array = []
queue = deque()

with open(sys.argv[1]) as fileobj:
    for line in fileobj:
        array.append(line.split())

N = int(array[0][0]) # Number of total cases
    
for i in range(1, N+1):

    h = HashMap()

    x = Borders(int(array[i][0]), int(array[i][1]), "", 0) # Append one case at a time
    queue.append(x)

    h.addHash(int(array[i][0]), int(array[i][1]))

    flag = 0 # Borders found flag
    temp_state = 0

    while queue and flag != 1:
        
        temp = queue.popleft() 

        if temp.low_b >= int(array[i][2]) and temp.high_b <= int(array[i][3]): # If the end borders are met, print the path of calculations

            flag = 1

            if temp.path == "": # Number already between wanted borders
                print("EMPTY")
            else:
                print(temp.path)

        if temp.state < 1000000:

            temp_1 = temp.low_b // 2 # Half calculation - "h"
            temp_2 = temp.high_b // 2 

            if h.findHash(temp_1, temp_2) is False: # Do not add to the queue already visited states

                temp_state += 1
                x = Borders(temp_1, temp_2, temp.path + "h", temp_state)
                h.addHash(temp_1, temp_2)
                queue.append(x)

            temp_1 = temp.low_b * 3 + 1 # Triple calculation - "t"
            temp_2 = temp.high_b * 3 + 1

            if (temp_1 <= 999999 and temp_2 <= 999999): # Machine can store only one number, not longer than 6 digits
                
                if h.findHash(temp_1, temp_2) is False: # Do not add to the queue already visited states

                    temp_state += 1
                    x = Borders(temp_1, temp_2, temp.path + "t", temp_state)
                    h.addHash(temp_1, temp_2)
                    queue.append(x)

    if flag == 1: # Dequeue any unwanted elements before proceeding to next case
        while queue:
            queue.popleft()

    if flag == 0:
        print ("IMPOSSIBLE")

    # del(h)

print(time.time() - start_time)