#!/bin/bash
PREFIX="temprecord"
csplit -f $PREFIX -k ../../exports/TIP/10Q4.csv 1 {4000}

for file in $PREFIX*; 
do ARCID=$(grep -Eo '^[^ ,]+' "$file")
if [ -f "$ARCID.csv" ]
then 
	cat "$ARCID.csv" | cat - $file > /tmp/out && mv /tmp/out "$ARCID.csv";
else 
	mv "$file" "$ARCID.csv"; 
fi
done
for file in *.csv; 
do echo "ARCID,Description,Jurisdiction,ModelingNetworkYear,Sponsor,ExistLanes,ProposedLanes,Length,GDOTPI,Limits,Status,ProjectType,Analysis,Phase,PhaseStatus,FiscalYear,FundSource,Federal,State,Local,Bond,Total,FederalSum,StateSum,LocalSum,BondSum,TotalSum" | cat - $file > /tmp/out && mv /tmp/out $file; 
done

rm $PREFIX*