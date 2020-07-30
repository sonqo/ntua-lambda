select *
where{
    ?s rdf:type <http://www.ex.org/transport-ontology#Stop> .
    ?s <http://www.ex.org/transport-ontology#stopLat> ?x .
    ?s <http://www.ex.org/transport-ontology#stopLon> ?y .
    Filter(bif:st_intersects (bif:st_point (?x, ?y), bif:st_point (38.085, 23.701), 1)) .
}
order by desc(bif:haversine_deg_km(?x, ?y, 38.085, 23.701))
limit 10

