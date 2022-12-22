import pandas as pd
from unidecode import unidecode

trips = pd.read_csv('data/trips.txt')
stops = pd.read_csv('data/stops.txt')
route = pd.read_csv('data/routes.txt')
agency = pd.read_csv('data/agency.txt')
stimes = pd.read_csv('data/stop_times.txt')
calendar = pd.read_csv('data/calendar.txt')

with open('transport-ontology.owl', 'a') as owl_file:

    # Parsing Agency CSV file
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
    for index, row in calendar.iterrows():
        i = 0
        for e in row:
            if i == 0:
                i += 1
                owl_file.write(':' + unidecode(str(e).replace(' ', '').replace('/', '-')) + ' rdf:type ' + ':Service .\n\n')
            else:
                i += 1

    #Parsing Routes CSV file
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
                owl_file.write(' '*8 + ':routeColor "' + unidecode(str(e)) + '"^^xsd:string ;\n')
                owl_file.write(' '*8 + ':doneVia :UBus .\n\n' )
            else:
                i += 1

    # Parsing Stops CSV file
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
                owl_file.write(' '*8 + ':stopLat "' + unidecode(str(e)) + '"^^xsd:float ;\n')
            elif i == 5:
                i += 1
                owl_file.write(' '*8 + ':stopLon "' + unidecode(str(e)) + '"^^xsd:float .\n\n')
            else:
                i += 1

    # Parsing Trips CSV file
    for index, row in trips.iterrows():
        i = 0
        owl_file.write(':' + unidecode(str(row[2]).replace(' ', '').replace('/', '-')) + ' rdf:type ' + ':Trip ;\n')
        for e in row:
            if i == 0:
                i += 1
                owl_file.write(' '*8 + ':belongsTo :' + unidecode(str(e).replace(' ', '').replace('/', '-')) + ' ;\n')
            elif i == 1:
                i += 1
                owl_file.write(' '*8 + ':hasService :' + unidecode(str(e).replace(' ', '').replace('/', '-')) + ' ;\n')
            elif i == 3:
                i += 1
                owl_file.write(' '*8 + ':tripHeadsign "' + unidecode(str(e)) + '"^^xsd:string ;\n')
            elif i == 4:
                i += 1
                owl_file.write(' '*8 + ':tripDirection "' + unidecode(str(e)) + '"^^xsd:int .\n\n')
            else:
                i += 1

    # Parsing StopTime CSV file
    for index, row in stimes.iterrows():
        i = 0
        owl_file.write(':' + unidecode(str(row[3]).replace(' ', '').replace('/', '-')) + 'ST rdf:type ' + ':StopTime ;\n')
        for e in row:
            if i == 0:
                i += 1
                owl_file.write(' '*8 + ':stopFrom :' + unidecode(str(e).replace(' ', '').replace('/', '-')) + ' ;\n')
            elif i == 1:
                i += 1
                owl_file.write(' '*8 + ':arrivalTime "' + unidecode(str(e)) + '"^^xsd:string ;\n')
            elif i == 2:
                i += 1
                owl_file.write(' '*8 + ':departureTime "' + unidecode(str(e)) + '"^^xsd:string ;\n')
            elif i == 3:
                i += 1
                owl_file.write(' '*8 + ':hasStop :' + unidecode(str(e).replace(' ', '').replace('/', '-')) + ' ;\n')
            elif i == 4:
                i += 1
                owl_file.write(' '*8 + ':stopSequence "' + unidecode(str(e)) + '"^^xsd:int .\n\n')
            else:
                i += 1