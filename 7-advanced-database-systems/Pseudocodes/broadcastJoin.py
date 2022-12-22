Map (key, values):
# key : MovieID from ratings.csv
# values : (UserID, Rating, Timestamp)
    if key in dictionary_bc:
        for item in dictionary_bc[key]:
            res.append((key, (values, item)))
    return res
