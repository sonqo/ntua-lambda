import pandas as pd
from unidecode import unidecode

with open('transport-ontology.owl', 'a') as owl_file:

    # Parsing Agency CSV file
    agency = pd.read_csv('data/agency.txt')
    for index, row in agency.iterrows():
        i = 0
        for e in row:
            if i == 0:
                i += 1
                owl_file.write('\n:' + unidecode(str(e).replace(' ', '').replace('/', '-')) + ' rdf:type ' + ':Agency ;\n')
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
    for index, row in calendar.iterrows():
        i = 0
        for e in row:
            if i == 0:
                i += 1
                owl_file.write(':' + unidecode(str(e).replace(' ', '').replace('/', '-')) + ' rdf:type ' + ':Service .\n\n')
            else:
                i += 1

    #Parsing Routes CSV file
    route = pd.read_csv('data/routes.txt')
    for index, row in route.iterrows():
        i = 0
        for e in row:
            if i == 0:
                i += 1
                owl_file.write(':' + unidecode(str(e).replace(' ', '').replace('/', '-')) + ' rdf:type ' + ':Route ;\n')
            elif i == 2:
                i += 1
                owl_file.write(' '*8 + ':routeName "' + unidecode(str(e)) + '"^^xsd:string ;\n')
            elif i == 5:
                i += 1
                owl_file.write(' '*8 + ':routeColor "' + unidecode(str(e)) + '"^^xsd:string .\n\n')
            else:
                i += 1

    # Parsing Stops CSV file
    stops = pd.read_csv('data/stops.txt')
    for index, row in stops.iterrows():
        i = 0
        for e in row:
            if i == 0:
                i += 1
                owl_file.write(':' + unidecode(str(e).replace(' ', '').replace('/', '-')) + ' rdf:type ' + ':Stop ;\n')
            elif i == 2:
                i += 1
                owl_file.write(' '*8 + ':stopName "' + unidecode(str(e)) + '"^^xsd:string ;\n')
            elif i == 3:
                i += 1
                owl_file.write(' '*8 + ':stopDescription "' + unidecode(str(e)) + '"^^xsd:string ;\n')
            elif i == 4:
                i += 1
                curr = unidecode(str(e))
            elif i == 5:
                i += 1
                owl_file.write(' '*8 + ':stopCoordinates "Point(' + curr + ' ' + unidecode(str(e)) + ')"^^<http://openlinksw.com/schemas/virtrdf#Geometry> .\n\n')
            else:
                i += 1

    # Parsing Trips CSV file
    trips = pd.read_csv('data/trips.txt')
    for index, row in trips.iterrows():
        i = 0
        owl_file.write(':' + unidecode(str(row[2]).replace(' ', '').replace('/', '-')) + ' rdf:type ' + ':Trip ;\n')
        for e in row:
            if i == 0:
                i += 1
                owl_file.write(' '*8 + ':routeID "' + unidecode(str(e)) + '"^^xsd:string ;\n')
            elif i == 1:
                i += 1
                owl_file.write(' '*8 + ':serviceID "' + unidecode(str(e)) + '"^^xsd:string ;\n')
            elif i == 3:
                i += 1
                owl_file.write(' '*8 + ':tripHeadsign "' + unidecode(str(e)) + '"^^xsd:string ;\n')
            elif i == 4:
                i += 1
                owl_file.write(' '*8 + ':tripDirection "' + unidecode(str(e)) + '"^^xsd:int .\n\n')
            else:
                i += 1
