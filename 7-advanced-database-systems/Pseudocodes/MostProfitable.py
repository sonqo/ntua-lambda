Map (key, values):
# key : LineID from movies.csv 
# values : (MovieID, Title, Summary, Date, Duration, ProdCosts, Gross, Pop)
    if ProdCosts != 0 and Gross != 0 and YEAR(Date) >= 2000:
        emit((YEAR(Date), (Title, ProdCosts, Gross)))

Reduce (key, values):
# key : year
# values : list of respective values [(T1, PC1, G1), (T2, PC2, G2), ...], where T = title, PC = ProdCost, G = Gross
    max = (T1, (G1 - PC1) / PC1)
    for triplet in values:
        curr = (triplet[Gross] - triplet[ProdCosts]) / triplet[ProdCosts]
        if curr > max[1]:
            max = (triplet[Title], curr)
    emit(key, max)
