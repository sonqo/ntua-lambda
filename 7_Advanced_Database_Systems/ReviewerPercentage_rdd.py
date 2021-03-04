import csv
from io import StringIO
from pyspark.sql import SparkSession
from pyspark.sql import functions as F

def split_complex(x):
	return list(csv.reader(StringIO(x), delimiter=','))[0]

spark = SparkSession.builder.appName('query2_rdd').getOrCreate()

sc = spark.sparkContext

# read file
# create (key, value) pairs where key = user
# calcucate for every user (number of reviews, sum of reviews)
# calculate average reviews of user
movies = sc.textFile('hdfs://master:9000/movies/ratings.csv') \
	.map(lambda x : split_complex(x)) \
	.map(lambda x : (x[0], (1, float(x[2])))) \
	.aggregateByKey((0, 0.0), (lambda x, y : (x[0]+y[0], x[1]+y[1])), (lambda a, b : (a[0]+b[0], a[1]+b[1]))) \
	.mapValues(lambda x : x[1]/x[0])

valid = movies.filter(lambda x : x[1] > 3).collect() # filter users with average review > 3
movies = movies.collect()
average = round(len(valid)/len(all), 2)

# write result
res = sc.parallelize([average]) \
	.coalesce(1, True).saveAsTextFile('hdfs://master:9000/movies/output/query2_rdd.out')
