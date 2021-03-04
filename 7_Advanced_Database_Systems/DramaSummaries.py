import csv
from io import StringIO
from pyspark.sql import SparkSession
from pyspark.sql import functions as F

def split_complex(x):
	return list(csv.reader(StringIO(x), delimiter=','))[0]

spark = SparkSession.builder.appName('query4_rdd').getOrCreate()

sc = spark.sparkContext

# read file
# discard empty dates and dates before 00s
# create (key, value) pairs where key = movie, keeping summaries and years
summaries = sc.textFile('hdfs://master:9000/movies/movies.csv') \
	.map(lambda x : split_complex(x)) \
	.filter(lambda x : x[3] != "") \
	.filter(lambda x : int(x[3].split('-')[0]) >= 2000) \
	.map(lambda x : (x[0], (x[2], x[3].split('-')[0]))) \

# read file
# discard movie genres that are not dramas
# create (key, value) pairs where key = movie
genres = sc.textFile('hdfs://master:9000/movies/movie_genres.csv') \
	.map(lambda x : split_complex(x)) \
	.filter(lambda x : x[1] == 'Drama') \
	.map(lambda x : (x[0], x[1]))

# join tables on movie ID
# aggregate on dates, calculating number of summaries and their respective word count
# calculate average summary word count for every year
dramas = summaries.join(genres) \
	.map(lambda x : (x[1][0][1], (1, len(x[1][0][0].split(' '))))) \
	.aggregateByKey((0, 0), (lambda x, y : (x[0]+y[0], x[1]+y[1])), (lambda a, b : (a[0]+b[0], a[1]+b[1]))) \
	.mapValues(lambda x : x[1]/x[0])

acc = []
dates = ['2000-2004', '2005-2009', '2010-2014', '2015-2019']
# for every 5-year span discard all other dates
# create new respective key
# calulcate sum of word count
# caclucate average 5-year summary word count
for d in dates:
	incr = dramas.filter(lambda x : int(x[0]) < int(d.split('-')[1])+1) \
		.map(lambda x : (d, x[1])) \
		.aggregateByKey((0.0), (lambda x, y : (x+y)), (lambda a, b : (a+b))) \
		.mapValues(lambda x : round(x/5, 2))
	acc.append(incr)

# unify resulting RDDs
# write result
res = sc.union(acc) \
	.coalesce(1, True).saveAsTextFile('hdfs://master:9000/movies/output/query4_rdd.out')
