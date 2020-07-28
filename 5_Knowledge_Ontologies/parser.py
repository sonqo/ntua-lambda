import pandas as pd
from unidecode import unidecode

# Parsing Agency CSV file
agency = pd.read_csv('data/agency.txt')

owl_file = open('trans_turtle.owl', 'a')
for index, row in agency.iterrows():
    i = 0
    for e in row:
        if i == 0:
            i += 1
            owl_file.write(':' + unidecode(str(e)) + ' rdf:type' + 'Agency ;\n')
        elif i == 1:
            i += 1
            owl_file.write(' '*8 + ':agencyURL "' + unidecode(str(e)) + '"^^xsd:string ;\n')
        elif i == 2:
            i += 1
            owl_file.write(' '*8 + ':agencyLand "' + unidecode(str(e)) + '"^^xsd:string ;\n')
        elif i == 3:
            i += 1
            owl_file.write(' '*8 + ':agencyLang "' + unidecode(str(e)) + '"^^xsd:string ;\n')
        elif i == 4:
            i += 1
            owl_file.write(' '*8 + ':agencyPhone "' + unidecode(str(e)) + '"^^xsd:string .\n\n')

#Parsing Calendar CSV file
calendar = pd.read_csv('data/calendar.txt')

owl_file = open('trans_turtle.owl', 'a')
for index, row in calendar.iterrows():
    i = 0
    for e in row:
        if i == 0:
            i += 1
            owl_file.write(':' + unidecode(str(e)) + ' rdf:type' + 'Service .\n\n')
        else:
            i += 1

#Parsing Routes CSV file
