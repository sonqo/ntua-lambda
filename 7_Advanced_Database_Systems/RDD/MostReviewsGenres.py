import csv
from io import StringIO
from pyspark.sql import SparkSession

def split_complex(x):
	return list(csv.reader(StringIO(x), delimiter=","))[0]

spark = SparkSession.builder.appName('query5_rdd').getOrCreate()

sc = spark.sparkContext

ratings = sc.textFile('hdfs://master:9000/movies/data/ratings.csv') \
	.map(lambda x : split_complex(x)) \
	.map(lambda x : (x[1], (x[0], x[2])))

genres = sc.textFile('hdfs://master:9000/movies/data/movie_genres.csv') \
	.map(lambda x : split_complex(x))

ratings_genres = ratings \
	.join(genres) \
	.map(lambda x : ((x[1][1], x[1][0][0]), 1)) \
	.aggregateByKey((0), (lambda x, y : x+y), (lambda a, b : a+b))

temp_genre_reviewers = ratings_genres \
	.map(lambda x : (x[0][0], (x[0][1], int(x[1])))) \
	.reduceByKey(lambda x, y : (x[0] if x[1] >= y[1] else y[0], max(x[1], y[1]))) \
	.map(lambda x : (x[0], (x[1][0], x[1][1])))

temp_ratings_genre = ratings_genres.map(lambda x : ((x[0][0], x[1]), x[0][1]))

genre_reviewers = temp_genre_reviewers \
	.map(lambda x : ((x[0], x[1][1]), x[1][0])) \
	.join(temp_ratings_genre) \
	.map(lambda x : (x[0][0], (x[1][1], x[0][1])))

movies = sc.textFile('hdfs://master:9000/movies/data/movies.csv') \
	.map(lambda x : split_complex(x)) \
	.map(lambda x : (x[0], (x[1], x[7])))

ratings = ratings \
	.map(lambda x : ((x[1][0], x[0]), x[1][1]))

collection = genres \
	.map(lambda x : (x[1], x[0])) \
	.join(genre_reviewers) \
	.map(lambda x : (x[1][0], (x[0], x[1][1][0], x[1][1][1]))) \
	.join(movies) \
	.map(lambda x : ((x[1][0][1], x[0]), (x[1][0][0], x[1][0][2], x[1][1][0], x[1][1][1]))) \
	.join(ratings) \
	.map(lambda x : (x[1][0][0], x[0][0], x[1][0][1], x[1][0][2], x[1][0][3], x[1][1]))

temp_collection = collection \
	.map(lambda x : ((x[0], x[1], x[5]), (x[2], x[3], x[4])))

max_rating = collection \
	.map(lambda x : ((x[0], x[1]), x)) \
	.reduceByKey(lambda x, y : max(x, y, key=lambda x : x[5])) \
	.map(lambda x : ((x[0][0], x[0][1], x[1][5]), x[1][5])) \
	.join(temp_collection) \
	.map(lambda x : ((x[0][0], x[0][1], x[0][2]), (x[1][1][0], x[1][1][1], x[1][1][2]))) \
	.reduceByKey(lambda x, y : max(x, y, key=lambda x : float(x[2]))) \
	.map(lambda x : ((x[0][0], x[0][1], x[1][0]), (x[1][1], x[1][2], x[0][2])))

min_rating = collection \
	.map(lambda x : ((x[0], x[1]), x)) \
	.reduceByKey(lambda x, y : min(x, y, key=lambda x : x[5])) \
	.map(lambda x : ((x[0][0], x[0][1], x[1][5]), x[1][5])) \
	.join(temp_collection) \
	.map(lambda x : ((x[0][0], x[0][1], x[0][2]), (x[1][1][0], x[1][1][1], x[1][1][2]))) \
	.reduceByKey(lambda x, y : max(x, y, key=lambda x : float(x[2]))) \
	.map(lambda x : ((x[0][0], x[0][1], x[1][0]), (x[1][1], x[1][2], x[0][2])))

res = max_rating \
	.join(min_rating) \
	.map(lambda x : (x[0][0], x[0][1], x[0][2], x[1][0][0], x[1][0][1], x[1][0][2], x[1][1][0], x[1][1][1], x[1][1][2])) \
	.coalesce(1, True).sortBy(lambda x : x[0]).saveAsTextFile('hdfs://master:9000/movies/output/query5_rdd.out')
