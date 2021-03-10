from pyspark.sql import SparkSession

spark = SparkSession.builder.appName('broadcast_join').getOrCreate()

sc = spark.sparkContext

def broadcastJoin(Left):

    Right = sc.textFile('hdfs://master:9000/movies/data/input')
    listRist = Right.collect()

    acc = {}
    for entry in listRist:
        acc[entry[0]] = [entry[1]]

    for entry in Left:
        if acc[entry[0]]:
            acc[entry[0]].append(entry[1])

    for key, value in acc.items():
        yield((key, value))