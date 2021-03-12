from pyspark.sql import SparkSession

spark = SparkSession.builder.appName('query1_sql').getOrCreate()

movies = spark.read.format('csv') \
	.options(header='false', inferSchema='true') \
	.load('hdfs://master:9000/movies/data/movies.csv')

movies.registerTempTable('movies')

cleaned_movies = \
	"SELECT _c1 AS Title, YEAR(_c3) AS Date, ((_c6-_c5)/_c5)*100 AS Profit " + \
	"FROM movies " + \
	"WHERE YEAR(_c3) >= 2000 AND _c5 != 0 AND _c6 != 0"

temp1 = spark.sql(cleaned_movies)
temp1.registerTempTable('cleaned_movies')

sqlResult = \
	"SELECT Date, Title, Profit " + \
	"FROM cleaned_movies " + \
	"WHERE (Date, Profit) IN " + \
		"(SELECT Date, MAX(Profit) FROM  cleaned_movies GROUP BY Date) "+ \
	"ORDER BY Date"

res = spark.sql(sqlResult).coalesce(1).write.json('hdfs://master:9000/movies/output/query1_sql.out')
