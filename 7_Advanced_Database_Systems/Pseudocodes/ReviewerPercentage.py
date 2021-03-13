Map (key, values):
# key : LineID from ratings.csv
# value : (UserID, MovieID, Rating, Timestamp)
    emit(UserID, (1, Rating))

Reduce (key, values):
# key : UserID
# value : list of respective values [(1, R1), (1, R2), ...], where R = rating
    sum = 0
    count = 0
    for pair in values:
        sum += pair[1]
        count += pair[0]
    emit(key, sum/count)
