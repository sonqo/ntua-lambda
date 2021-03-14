import csv
from io import StringIO
from pyspark.sql import SparkSession

def split_complex(x):
	return list(csv.reader(StringIO(x), delimiter=','))[0]

def repartitionJoin(values): # reducer
	Br = []
	Bl = []
	res = []
	for item in values:
		if item[0] == 0:
			Br.append(item)
		else:
			Bl.append(item)
	for right in Br:
		for left in Bl:
			res.append((left[1], right[1]))
	return res

spark = SparkSession.builder.appName('repartition_join').getOrCreate()

sc = spark.sparkContext

Collection = sc.textFile('hdfs://master:9000/movies/data/reduced_movie_genres.csv,hdfs://master:9000/movies/data/ratings.csv') \
	.map(lambda x : split_complex(x)) \
	.map(lambda x : (x[0], (0, x[1])) if len(x) == 2 else (x[1], (1, (x[0], x[2], x[3])))) \
	.groupByKey().mapValues(list).flatMapValues(repartitionJoin).filter(lambda x : x[1] != []) \
	.collect()

for i in Collection:
	print(i)
