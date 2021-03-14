import numpy as np

from matplotlib import cm
import matplotlib.pyplot as plt

labels = ['Query_1', 'Query_2', 'Query_3', 'Query_4', 'Query_5']
rdd = [9.3, 67.31, 76.34, 8.39, 948.51]
sql_csv = [9.3, 31.63, 26.25, 10.42, 178.72]
sql_parquet = [9.03, 15.58, 15.27, 12.49, 105.86]

width = 0.20
x = np.arange(len(labels))

fig, ax = plt.subplots(figsize=(10, 8))
rect1 = ax.bar(x-width, rdd, width, label='RDD', color='#da291cff')
rect2 = ax.bar(x, sql_csv, width, label='SQL-CSV', color='#56A8CBFF')
rect3 = ax.bar(x+width, sql_parquet, width, label='SQL-PARQUET', color='#53A567FF')

ax.legend()
ax.set_xticks(x)
ax.set_ylabel('Seconds')
ax.set_xticklabels(labels)
ax.set_title('Query Execution Time Comparison')

def autolabel(rects):
    for rect in rects:
        height = rect.get_height()
        ax.annotate('{}'.format(height), xy=(rect.get_x()+rect.get_width()/2, height), xytext=(0, 3), textcoords="offset points", ha='center', va='bottom')

autolabel(rect1)
autolabel(rect2)
autolabel(rect3)
fig.tight_layout()

plt.show()