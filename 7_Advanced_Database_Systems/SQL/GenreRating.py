from pyspark.sql import SparkSession

spark = SparkSession.builder.appName('query3_sql').getOrCreate()

ratings = spark.read.format('csv') \
	.options(header='false', inferSchema='true') \
	.load('hdfs://master:9000/movies/data/ratings.csv')

ratings.registerTempTable('ratings')

cleaned_ratings = \
	"SELECT _c1 AS Movie, _c2 AS Rating " + \
	"FROM ratings"

temp1 = spark.sql(cleaned_ratings)
temp1.registerTempTable('cleaned_ratings')

average_ratings = \
	"SELECT Movie, SUM(Rating)/COUNT(Rating) AS AvgRating, COUNT(Rating) AS Count " + \
	"FROM cleaned_ratings " + \
	"GROUP BY Movie"

temp2 = spark.sql(average_ratings)
temp2.registerTempTable('average_ratings')

genres = spark.read.format('csv') \
	.options(header='false', inferSchema='true') \
	.load('hdfs://master:9000/movies/data/movie_genres.csv')

genres.registerTempTable('genres')

cleaned_genres = \
	"SELECT _c0 as Movie, _c1 as Genre " + \
	"FROM genres"

temp3 = spark.sql(cleaned_genres)
temp3.registerTempTable('cleaned_genres')

ratings_genres = \
	"SELECT R.Movie AS Movie, R.AvgRating AS Rating, G.Genre AS Genre " + \
	"FROM average_ratings AS R, cleaned_genres AS G " + \
	"WHERE R.Movie == G.Movie"

temp4 = spark.sql(ratings_genres)
temp4.registerTempTable('ratings_genres')

sqlResult = \
	"SELECT Genre, AVG(Rating) as Average_Rating, Count(Rating) AS Total_Count " + \
	"FROM ratings_genres " + \
	"GROUP BY Genre ORDER BY Genre"

res = spark.sql(sqlResult).coalesce(1).write.json('hdfs://master:9000/movies/output/query3_sql.out')
