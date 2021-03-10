from pyspark.sql import SparkSession

spark = SparkSession.builder.appName('query5_sql').getOrCreate()

ratings = spark.read.format('csv') \
	.options(header='false', inferSchmea='true') \
	.load('hdfs://master:9000/movies/data/ratings.csv')

ratings.registerTempTable('ratings')

genres = spark.read.format('csv') \
	.options(header='false', inferSchmea='true') \
	.load('hdfs://master:9000/movies/data/movie_genres.csv')

genres.registerTempTable('genres')

ratings_genres = \
		"SELECT R._c1 AS Movies, G._c1 AS Genre, R._c0 AS User, R._c2 AS Rating " + \
		"FROM ratings AS R, genres as G " + \
		"WHERE R._c1 == G._c0"

temp1 = spark.sql(ratings_genres)
temp1.registerTempTable('ratings_genres')

genres_reviewers = \
	"SELECT Genre, User, Reviews " + \
	"FROM " + \
	"(SELECT Genre, User, COUNT(Genre) AS Reviews, " + \
		"RANK() OVER (PARTITION BY Genre ORDER BY COUNT(*) DESC) Ranking " + \
	"FROM ratings_genres GROUP BY Genre, User) Table WHERE " + \
	"Ranking = 1 ORDER BY Genre"

temp2 = spark.sql(genres_reviewers)
temp2.registerTempTable('genres_reviewers')

movies = spark.read.format('csv') \
	.options(header='false', inferSchmea='true') \
	.load('hdfs://master:9000/movies/data/movies.csv')

movies.registerTempTable('movies')

collection = \
	"SELECT A.Genre, A.User, A.Reviews, M._c1 AS Movie, M._c7 AS Popularity, R._c2 AS Rating " + \
	"FROM genres_reviewers AS A, movies AS M, ratings AS R, genres AS G " + \
	"WHERE A.User == R._c0 AND G._c1 == A.Genre AND G._c0 == M._c0 AND R._c1 == M._c0"

temp3 = spark.sql(collection)
temp3.registerTempTable('collection')

min_rating = \
	"SELECT Genre, User, Reviews, Movie, CAST(Popularity AS FLOAT) AS Popularity, Rating " + \
	"FROM collection WHERE (Genre, User, Rating) IN (" + \
	"SELECT Genre, User, MIN(Rating) AS Rating " + \
	"FROM collection GROUP BY Genre, User)"

temp4 = spark.sql(min_rating)
temp4.registerTempTable('min_rating')

fav_min_rating = \
	"SELECT Genre, User, Reviews, Movie, Popularity, Rating FROM min_rating " + \
	"WHERE (Genre, User, Popularity) IN (" + \
	"SELECT Genre, User, MAX(Popularity) AS Popularity FROM min_rating GROUP BY Genre, User)"

temp5 = spark.sql(fav_min_rating)
temp5.registerTempTable('fav_min')

max_rating = \
	"SELECT Genre, User, Reviews, Movie, CAST(Popularity AS FLOAT) AS Popularity, Rating " + \
	"FROM collection WHERE (Genre, User, Rating) IN (" + \
	"SELECT Genre, User, MAX(Rating) AS Rating " + \
	"FROM collection GROUP BY Genre, User)"

temp6 = spark.sql(max_rating)
temp6.registerTempTable('max_rating')

fav_max_rating = \
	"SELECT Genre, User, Reviews, Movie, Popularity, Rating FROM max_rating " + \
	"WHERE (Genre, User, Popularity) IN (" + \
	"SELECT Genre, User, MAX(Popularity) AS Popularity FROM max_rating GROUP BY Genre, User)"

temp7 = spark.sql(fav_max_rating)
temp7.registerTempTable('fav_max')

sqlResult = \
	"SELECT A.Genre AS Genre, A.User AS User, A.Reviews AS Reviews, B.Movie AS Max_Movie, B.Popularity AS Max_Popularity, B.Rating AS Max_Rating, " + \
	"A.Movie AS Min_Movie, A.Popularity AS Min_Popularity, A.Rating AS Min_Rating " + \
	"FROM fav_min AS A, fav_max AS B " + \
	"WHERE A.Genre = B.Genre AND A.User = B.User ORDER BY A.Genre"

res = spark.sql(sqlResult).coalesce(1).write.json('hdfs://master:9000/movies/output/query5_sql.out')
