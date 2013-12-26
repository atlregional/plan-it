function replaceSpecialChars(str) {
	return str.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/"/g, "&quot;").replace(/&nbsp;/g, " ");
}
function tableToJson(table) { 
	var data = []; // first row needs to be headers 
	var headers = []; 
	var maxLength = {};
	for (var i=0; i<table.rows[0].cells.length; i++) {
		headers[i] = table.rows[0].cells[i].innerHTML.replace(/ /gi,'');
		maxLength[ headers[i] ] = headers[i].length
	} 
	// go through cells 
	for (var i=1; i<table.rows.length; i++) { 
		var tableRow = table.rows[i]; 
		var rowData = {}; 
		for (var j=0; j<tableRow.cells.length; j++) { 
			rowData[ headers[j] ] = replaceSpecialChars(tableRow.cells[j].innerHTML)
			if (tableRow.cells[j].innerHTML.length > maxLength[headers[j]])
				maxLength[ headers[j] ] = rowData[ headers[j] ].length
		} 
		data.push(rowData); 
	} 
	return [maxLength, data]; 
}
function exportResults(type) {
	var name = 'results.' + type
	var a = document.createElement("a");
	document.body.appendChild(a);
	a.style = "display: none";
	// var json = pivot.results().all()
	var tableObjects = tableToJson($('#pivot-table').get(0))
	console.log(tableObjects)
	var table = tableObjects[1]
	lengths = tableObjects[0]
	if (type === 'json') {
		// alert('Exporting results as ' + type + '.')
		formBlob = new Blob([JSON.stringify(table)], {
			type: 'octet/stream'
		});

		url = window.URL.createObjectURL(formBlob);
	} else if (type === 'csv') {
		// alert('Exporting results as ' + type + '.')
		csv = JSON2CSV(table)
		formBlob = new Blob([csv], {
			type: 'text/csv',
			filename: 'MyVerySpecial.csv'
		});

		url = window.URL.createObjectURL(formBlob);
	} else if (type === 'pdf') {
		// var doc = new jsPDF();
		// doc.fromHTML($('#pivot-table').get(0), .5, .5, {
		//   'width': 500,
		//   'elementHandlers': specialElementHandlers
		// });
		console.log(table)
		// doc.save("results.pdf")
		var doc = new jsPDF('l', 'pt', 'letter', true);
		doc.setFontSize(10)
		doc.cellInitialize();

		$.each(table, function (i, row) {
			if (i == 0) {
				$.each(lengths, function (j, length) {
					doc.setFontStyle('bold')
					doc.cell(10, 200, length * 5 + 13, 20, j, i)

				})
			}
			doc.setFontStyle('normal')
			$.each(row, function (j, cell) {
				// if (i === 0){
				//   doc.setFontStyle('bold')
				//   // console.log(cell.length)
				//   doc.cell(10, 200, lengths[j]*5+13, 20, j, i)

				// }
				// console.log(j)
				// console.log(lengths[j])
				doc.cell(10, 200, lengths[j] * 5 + 13, 20, cell, i + 1);

			})
		})
		// for (row in table){
		//   console.log(row)
		//	 for (cell in row) {
		//		 console.log(cell)
		//		 // doc.cell(10, 200, 100, 20, 'Cell '+k, i);
		//		 // k++;
		//	 }
		// }
		// doc.addJS('print(true)');
		doc.save('results.pdf');
		// use jsPDF library!
	}
	a.href = url;
	a.download = name;
	a.click();
	window.URL.revokeObjectURL(url);
}
function generateReport(type) {
	var name = 'results.' + type
	var a = document.createElement("a");
	document.body.appendChild(a);
	a.style = "display: none";
	// var json = pivot.results().all()
	var tableObjects = tableToJson($('#pivot-table').get(0))
	console.log(tableObjects)
	var table = tableObjects[1]
	lengths = tableObjects[0]
	if (type === 'json') {
		// alert('Exporting results as ' + type + '.')
		formBlob = new Blob([JSON.stringify(table)], {
			type: 'octet/stream'
		});

		url = window.URL.createObjectURL(formBlob);
	} else if (type === 'csv') {
		// alert('Exporting results as ' + type + '.')
		csv = JSON2CSV(table)
		formBlob = new Blob([csv], {
			type: 'text/csv',
			filename: 'MyVerySpecial.csv'
		});

		url = window.URL.createObjectURL(formBlob);
	} else if (type === 'pdf') {
		// var doc = new jsPDF();
		// doc.fromHTML($('#pivot-table').get(0), .5, .5, {
		//   'width': 500,
		//   'elementHandlers': specialElementHandlers
		// });
		console.log(table)
		// doc.save("results.pdf")
		var doc = new jsPDF('l', 'pt', 'letter', true);
		doc.setFontSize(10)
		doc.cellInitialize();

		$.each(table, function (i, row) {
			if (i == 0) {
				$.each(lengths, function (j, length) {
					doc.setFontStyle('bold')
					doc.cell(10, 200, length * 5 + 13, 20, j, i)

				})
			}
			doc.setFontStyle('normal')
			$.each(row, function (j, cell) {
				// if (i === 0){
				//   doc.setFontStyle('bold')
				//   // console.log(cell.length)
				//   doc.cell(10, 200, lengths[j]*5+13, 20, j, i)

				// }
				// console.log(j)
				// console.log(lengths[j])
				doc.cell(10, 200, lengths[j] * 5 + 13, 20, cell, i + 1);

			})
		})
		// for (row in table){
		//   console.log(row)
		//	 for (cell in row) {
		//		 console.log(cell)
		//		 // doc.cell(10, 200, 100, 20, 'Cell '+k, i);
		//		 // k++;
		//	 }
		// }
		// doc.addJS('print(true)');
		doc.save('results.pdf');
		// use jsPDF library!
	}
	a.href = url;
	a.download = name;
	a.click();
	window.URL.revokeObjectURL(url);
}