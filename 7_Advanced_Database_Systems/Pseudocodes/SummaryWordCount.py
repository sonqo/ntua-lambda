Map_v1 (key, values):
# key : LineID from movies.csv
# values : (MovieID, Title, Summary, Date, Duration, ProdCosts, Gross, Pop)
    if YEAR(Date) >= 2000
        emit(MovieID, (Summary, YEAR(Date)))

Map_v2 (key, values):
# key : LineID from movie_genres.csv
# values : (MovieID, Genre)
    if Genre == 'Drama':
        emit(MovieID, Genre)

Map_v3 (key, values):
# key : LineID from mapped movies JOIN mapped genres
# values : (MovieID, ((Summary, Year), Genre))
    if Summary:
        emit(Year, (1, len(Summary.split(' '))))
    else:
        emit(Year, (1, 0))

Reduce_v1 (key, values):
# key : Year
# values : list of respective values [(1, L1), (1, L2), ...], where L = length of summary
    sum = 0
    count = 0
    for pair in values:
        sum += pair[1]
        count += pair[0]
    avrgLength = sum/count
    emit(key, avrgLength)

Map_v4 (key, values):
# key : Year
# values : avrgLength
    if key BETWEEN YEARGROUP:
        emit(key, values)
