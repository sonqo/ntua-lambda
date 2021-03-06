from pyspark.sql import SparkSession

def word_count(string):
	if (string):
		return len(string.split(" "))
	return 0

spark = SparkSession.builder.appName('query4_sql').getOrCreate()

spark.udf.register("word_count", word_count)

movies = spark.read.format('csv') \
	.options(header='false', inferSchema='true') \
	.load('hdfs://master:9000/movies/data/movies.csv')

movies.registerTempTable('movies')

cleaned_movies = \
	"SELECT _c0 AS Movie, _c2 AS Summary, YEAR(_c3) AS Date " + \
	"FROM movies " + \
	"WHERE YEAR(_c3) >= 2000"

temp1 = spark.sql(cleaned_movies)
temp1.registerTempTable('cleaned_movies')

genres = spark.read.format('csv') \
	.options(header='false', inferSchema='true') \
	.load('hdfs://master:9000/movies/data/movie_genres.csv')

genres.registerTempTable('genres')

cleaned_genres = \
	"SELECT _c0 as Movie, _c1 as Genre " + \
	"FROM genres " + \
	"WHERE _c1 == 'Drama'"

temp3 = spark.sql(cleaned_genres)
temp3.registerTempTable('cleaned_genres')

movies_genres = \
	"SELECT word_count(M.Summary) AS Word_Count, M.Date " + \
	"FROM cleaned_movies AS M, cleaned_genres AS G " + \
	"WHERE M.Movie == G.Movie"

temp4 = spark.sql(movies_genres)
temp4.registerTempTable('movies_genres')

sqlResult = \
	"SELECT ( " + \
	"CASE WHEN Date < 2005 THEN '2000-2004' WHEN Date Between 2005 AND 2009 THEN '2005-2009' " + \
	"WHEN Date BETWEEN 2010 AND 2014 THEN '2010-2014' WHEN Date > 2014 THEN '2015-2019' END" + \
	") AS Date_Group, AVG(Word_Count) AS Average_WC " + \
	"FROM movies_genres " + \
	"GROUP BY Date_Group"

res = spark.sql(sqlResult).coalesce(1).write.json('hdfs://master:9000/movies/output/query4_sql.out')
