from pyspark.sql import SparkSession

spark = SparkSession.builder.appName('CSV2Parquet').getOrCreate()

movie_df = spark.read.csv('hdfs://master:9000/movies/movies.csv')
movie_df.write.parquet('hdfs://master:9000/movies/movies.parquet')

ratings_df = spark.read.csv('hdfs://master:9000/movies/ratings.csv')
ratings_df.write.parquet('hdfs://master:9000/movies/ratings.parquet')

movie_genres_df = spark.read.csv('hdfs://master:9000/movies/movie_genres.csv')
movie_genres_df.write.parquet('hdfs://master:9000/movies/movie_genres.parquet')
