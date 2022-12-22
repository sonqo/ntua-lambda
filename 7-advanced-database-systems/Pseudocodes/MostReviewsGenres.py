Map_v1 (key, values):
# key : LineID from ratings.csv
# values : (UserID, MovieID, Rating, Timestamp)
    emit(MovieID, (UserID, Rating)) # ratings

Map_v2 (key, values):
# key : MovieID
# value : values from ratings JOIN genres (MovieID, ((UserID, Rating), Genre))
    emit((Genre, UserID), 1) # ratings_genres

Reduce_v1 (key, values):
# key : (Genre, UserID)
# values : list of occurences [1, 1, ...]
    emit(key, sum(values)) # ratings_genres

Map_v3 (key values):
# key : (Genre, UserID)
# values : total number of occurencies, where UserID rated a Genred movie
    emit(Genre, (UserID, timesRated)) # temp_genre_reviewers

Reduce_v2 (key, values):
# key : Genre
# values : list of respective values [(U1, TR1), (U2, TR2), ...]
    max = (U1, TR1)
    for pair in values:
        if pair[1] > max[1]:
            max = (par[0], pair[1])
    emit(key, max) # temp_genre_reviewers

Map_v4 (key, values):
# key : (Genre, UserID)
# values : timesRated
    emit((Genre, timesRated), UserID) # temp_ratings_genre

Map_v5 (key, values):
# key : Genre
# value : (User, maxTimesRated)
    emit((Genre, maxTimesRated), UserID)

Map_v6 (key, values):
# key : Genre
# values : (UserID, maxTimesRated)
    emit(Genre, (maxTimesRated, UserID)) # genre_reviewers

Map_v7 (key, values):
# key : MovieID
# values: Genre
    emit(values, key) # genres

Map_v8 (key, values):
# key : MovieID from genres JOIN genre_reviewers
# values: (MovieID, (maxTimesRated, UserID))
    emit(MovieID, (Genre, maxTimesRated, UserID))

Map_v9 (key, values):
# key : MovieID from Map_v8 JOIN movies
# values : ((Genre, maxTimesRated, UserID), (MovieID, Title, Popularity))
    emit(UserID, MovieID), (Genre, maxTimesRated, Genre, Title, Pop)

Map_v10 (key, values):
# key : (UserID, MovieID) from Map_v9 JOIN ratings
# values : ((Genre, maxTimesRated, Genre, Title, Popularity), (Rating))
    emit(Genre, maxTimesRated, UseID, Title, Popularity, Rating) # collection

Map_v11 (key, values):
# key : LineID from Map_v10
# values : (Genre, maxTimesRated, UseID, Title, Popularity, Rating)
    emit((Genre, maxTimesRated, Rating), (UserID, Title, Popularity)) # temp_collection

Map_v12 (key, values):
# key : LineID from Map_v10
# values : (Genre, maxTimesRated, UseID, Title, Popularity, Rating)
    emit((Genre, maxTimesRated), values)

Reduce_v3 (key, values):
# key : (Genre, maxTimesRated)
# values : list of values [(Genre1, maxTimesRated1, UseID1, Title1, Popularity1, Rating1), ...]
    max = Rating1
    for pair in values:
        if pair[Rating] > max:
            max = pair[Rating]
    emit((Genre, maxTimesRated), (Genre, maxTimesRated, UseID, Title, Popularity, maxRating))

Map_v13 (key, values):
# key : (Genre, maxTimesRated)
# values : (Genre, maxTimesRated, UseID, Title, Popularity, maxRating)
    emit((Genre, maxTimesRated, maxRating), maxRating)

Map_v14 (key, values):
# key : (Genre, maxTimesRated, maxRating) from Map_v13 JOIN temp_collection
# values : (maxRating, (UserID, Title, Popularity))
    emit((Genre, maxTimesRated, maxRating), (UserID, Title, Popularity))

Reduce_v4 (key, values):
# key : (Genre, maxTimesRated, maxRating)
# values : list of respective values [(UserID1, Title1, Popularity1), ...]
    max = Popularity1
    for pair in values:
        if pair[Populairty] > max:
            max = pair[Popularity1]
    emit(Genre, Genre, UserID), (maxTitle, maxPopularity, maxRating) # max_rating