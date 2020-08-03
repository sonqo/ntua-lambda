select ?name ?x ?y
where{
    ?s rdf:type <http://www.ex.org/transport-ontology#Stop> .
    ?s <http://www.ex.org/transport-ontology#stopName> ?name .
    ?s <http://www.ex.org/transport-ontology#stopLat> ?x .
    ?s <http://www.ex.org/transport-ontology#stopLon> ?y .
    Filter(bif:st_intersects (bif:st_point (?x, ?y), bif:st_point (38.085, 23.701), 1)) .
}
order by desc(bif:haversine_deg_km(?x, ?y, 38.085, 23.701))
limit 10

select ?curr ?final
where{
    ?curr rdf:type <http://www.ex.org/transport-ontology#Stop> ;
       <http://www.ex.org/transport-ontology#stopLat> "37.9894746190878"^^xsd:float ;
       <http://www.ex.org/transport-ontology#stopLon> "23.6637051384293"^^xsd:float .
    ?x rdf:type <http://www.ex.org/transport-ontology#StopTime> ;
       <http://www.ex.org/transport-ontology#hasStop> ?curr .
    ?x <http://www.ex.org/transport-ontology#stopFrom> ?a .
    ?a <http://www.ex.org/transport-ontology#belongsTo> ?f .
    ?f <http://www.ex.org/transport-ontology#routeName> ?final .
}
limit 10

select distinct ?final
where{
    ?curr rdf:type <http://www.ex.org/transport-ontology#Stop> ;
       <http://www.ex.org/transport-ontology#stopLat> "37.9894746190878"^^xsd:float ;
       <http://www.ex.org/transport-ontology#stopLon> "23.6637051384293"^^xsd:float .
    ?x rdf:type <http://www.ex.org/transport-ontology#StopTime> ;
       <http://www.ex.org/transport-ontology#hasStop> ?curr .
    ?x <http://www.ex.org/transport-ontology#stopFrom> ?a .
    ?a <http://www.ex.org/transport-ontology#belongsTo> ?f .
    ?f <http://www.ex.org/transport-ontology#doneVia> ?final .
}
limit 10

select ?f
where{
    ?x <http://www.ex.org/transport-ontology#stopFrom> <http://www.ex.org/transport-ontology#9803638-TELEMA-T3-Paraskeue-02> .
    ?x <http://www.ex.org/transport-ontology#hasStop> ?y .
    ?y <http://www.ex.org/transport-ontology#stopLat> ?xa ;
        <http://www.ex.org/transport-ontology#stopLon> ?xb ;
        <http://www.ex.org/transport-ontology#stopName> ?f .
    Filter(bif:st_intersects (bif:st_point (?xa, ?xb), bif:st_point (35, 28), 1000)) .
}
order by desc(bif:haversine_deg_km(?xa, ?xb, 35, 28))
limit 10