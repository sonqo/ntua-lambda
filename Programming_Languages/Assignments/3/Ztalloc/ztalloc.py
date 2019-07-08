import sys
from collections import deque

class Borders:
    def __init__(self, low_b, high_b, path):
        self.low_b = low_b
        self.high_b = high_b
        self.path = path

x = Borders(0, 9, "")

queue = deque()

queue.append(x)

flag = 0

while flag != 1:
    
    temp = queue.popleft() 

    if temp.low_b <= 999999:
        if temp.high_b <= 999999:

            if temp.low_b >= 888999:
                if temp.high_b <= 999888:
                    flag = 1
                    print(temp.low_b, temp.high_b, temp.path, len(temp.path))

            temp_1 = temp.low_b // 2 
            temp_2 = temp.high_b // 2 

            x = Borders(temp_1, temp_2, temp.path + "h")
            queue.append(x)

            temp_1 = temp.low_b * 3 + 1
            temp_2 = temp.high_b * 3 + 1

            x = Borders(temp_1, temp_2, temp.path + "t")
            queue.append(x)

    