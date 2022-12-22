import csv
from io import StringIO
from pyspark.sql import SparkSession

def split_complex(x):
	return list(csv.reader(StringIO(x), delimiter=','))[0]

def broadcastJoin(pair): # mapper
	res = []
	if pair[0] in acc_bc.value.keys():
		for item in acc_bc.value[pair[0]]:
			res.append((pair[0], (pair[1], item)))
	return res

spark = SparkSession.builder.appName('broadcast_join').getOrCreate()

sc = spark.sparkContext

Right = sc.textFile('hdfs://master:9000/movies/data/reduced_movie_genres.csv') \
	.map(lambda x : split_complex(x)) \
	.map(lambda x : (x[0], x[1]))

acc = {} # init() state
listRight = Right.collect()
for entry in listRight:
	if entry[0] in acc.keys():
		acc[entry[0]].append(entry[1])
	else:
		acc[entry[0]] = [entry[1]]
for key, value in acc.items():
	acc[key] = tuple(value)
acc_bc = sc.broadcast(acc)

Left = sc.textFile('hdfs://master:9000/movies/data/ratings.csv') \
	.map(lambda x : split_complex(x)) \
	.map(lambda x : (x[1], (x[0], x[2], x[3]))) \
	.flatMap(lambda x : broadcastJoin(x)) \
	.collect()

for i in Left:
	print(i)
