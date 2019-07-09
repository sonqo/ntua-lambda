import sys
from collections import deque

class Borders:
    def __init__(self, low_b, high_b, path, state):
        self.low_b = low_b
        self.high_b = high_b
        self.path = path
        self.state = state

x = Borders(1, 2, "", 0)

queue = deque()

queue.append(x)

flag = 0

temp_state = 1

while queue and flag != 1:
    
    temp = queue.popleft() 

    if temp.low_b <= 999999 and temp.high_b <= 999999:

        if temp.state < 1000000:

            if temp.low_b >= 892871 and temp.high_b <= 918276:

                flag = 1
                print(temp.low_b, temp.high_b, temp.path, temp.state)

            if temp.low_b != 0 and temp.high_b != 0:

                temp_1 = temp.low_b // 2 
                temp_2 = temp.high_b // 2 

                temp_state += 1

                x = Borders(temp_1, temp_2, temp.path + "h", temp_state)
                queue.append(x)

            temp_1 = temp.low_b * 3 + 1
            temp_2 = temp.high_b * 3 + 1

            if temp_1 <= 999999 and temp_2 <= 999999:
                
                temp_state += 1

                x = Borders(temp_1, temp_2, temp.path + "t", temp_state)
                queue.append(x)
        
        else:
            
            flag = 1
            print("IMP0SSIBLE")