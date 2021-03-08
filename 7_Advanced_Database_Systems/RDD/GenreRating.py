import csv
from io import StringIO
from pyspark.sql import SparkSession

def split_complex(x):
	return list(csv.reader(StringIO(x), delimiter=','))[0]

spark = SparkSession.builder.appName('query3_rdd').getOrCreate()

sc = spark.sparkContext

# read file
# create (key, value) pairs where key = movie
# calculate for every movie (number of reviews, sum of reviews)
# calculate average rating
movies = sc.textFile('hdfs://master:9000/movies/data/ratings.csv') \
	.map(lambda x : split_complex(x)) \
	.map(lambda x : (x[1], (1, float(x[2])))) \
	.aggregateByKey((0, 0.0), (lambda x, y : (x[0]+y[0], x[1]+y[1])), (lambda a, b : (a[0]+b[0], a[1]+b[1]))) \
	.mapValues(lambda x : x[1]/x[0])

# read file
# create (key, value) pairs where key = movie
genres = sc.textFile('hdfs://master:9000/movies/data/movie_genres.csv') \
	.map(lambda x : split_complex(x)) \
	.map(lambda x : (x[0], x[1]))

# join movie average ratings with genres on movie ID
# calculate for every genre (number of movies, sum of average ratings of movies)
# calculate average rating of genre
avrg = movies.join(genres) \
	.map(lambda x : (x[1][1], (1, float(x[1][0])))) \
	.aggregateByKey((0, 0.0), (lambda x, y : (x[0]+y[0], x[1]+y[1])), (lambda a, b : (a[0]+b[0], a[1]+b[1]))) \
	.mapValues(lambda x : (x[0], x[1]/x[0]))

# format and write result
res = avrg.map(lambda x : (x[0], x[1][1], x[1][0])) \
	.coalesce(1, True).sortBy(lambda x : x[0]).saveAsTextFile('hdfs://master:9000/movies/output/query3_rdd.out')
