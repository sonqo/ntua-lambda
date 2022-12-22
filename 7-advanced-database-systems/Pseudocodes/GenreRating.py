Map_v1 (key, values):
# key : LineID from ratings.csv
# values: (UserID, MovieID, Rating, Timestamp)
    emit(MovieID, (1, Rating))

Reduce (key, values):
# key : MovieID
# value : list of respective values [(1, R1), (1, R2), ...], where R = rating
    sum = 0
    count = 0
    for pair in values:
        sum += pair[1]
        count += pair[0]
    avrgRating = sum/count
    emit(key, avrgRating)

Map_v2 (key, values):
# key : LineID from mapped ratings JOIN movie_genres
# values : (MovieID, (avrgRating, Genre))
    emit(Genre, (1, avrgRating))
