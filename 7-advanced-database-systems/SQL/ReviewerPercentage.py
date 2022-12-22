from pyspark.sql import SparkSession

spark = SparkSession.builder.appName('query2_sql').getOrCreate()

ratings = spark.read.format('csv') \
	.options(header='false', inferSchema='true') \
	.load('hdfs://master:9000/movies/data/ratings.csv')

ratings.registerTempTable('ratings')

cleaned_ratings = \
	"SELECT _c0 AS User, _c2 AS Rating " + \
	"FROM ratings"

temp1 = spark.sql(cleaned_ratings)
temp1.registerTempTable('cleaned_ratings')

average_ratings = \
	"SELECT User, SUM(Rating)/COUNT(Rating) AS AvgRating " + \
	"FROM cleaned_ratings " + \
	"GROUP BY User"

temp2 = spark.sql(average_ratings)
temp2.registerTempTable('average_ratings')

over_ratings = \
	"SELECT User, AvgRating " + \
	"FROM average_ratings " + \
	"WHERE AvgRating > 3"

temp3 = spark.sql(over_ratings)
temp3.registerTempTable('over_ratings')

all_ratings = \
	"SELECT COUNT(*) AS All FROM average_ratings"
some_ratings = \
	"SELECT COUNT(*) AS Some FROM over_ratings"

temp4 = spark.sql(all_ratings)
temp4.registerTempTable('all_ratings')
temp5 = spark.sql(some_ratings)
temp5.registerTempTable('some_ratings')

sqlResult = \
	"SELECT Some/All AS Reviewer_Percentage FROM all_ratings CROSS JOIN some_ratings"

res = spark.sql(sqlResult).coalesce(1).write.json('hdfs://master:9000/movies/output/query2_sql.out')
