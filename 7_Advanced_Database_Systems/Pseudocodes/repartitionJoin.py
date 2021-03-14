Map (key, values):
# key : LineID from ratings.csv or reduced_movie_genres.csv
# values : (UserID, MovieID, Rating, Timestamp) or (MovieID, Genre) respectively
    if len(values) == 2:
        return (key, (0, values))
    else:
        return(values[1], (1, key, values[0], values[2], values[3]))

Reduce (key, values):
# key : MovieID
# values : list of respective records [(0, (Genre1)), (1, (UserID1, Rating1, Timestamp1)), ...]
    Br = []
    Bl = []
    res = []
    for item in values:
        if item[0] == 0:
            Br.append(item[1])
        else:
            Bl.append(item[1])
    for x in Br:
        for y in Bl:
            res.append((x, y))
    return res
