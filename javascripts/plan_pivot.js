---

---
var lengths;
var branches = ['2008Q1',
			'2008Q2',
			'2008Q3',
			'2008Q4',
			'2009Q1',
			'2009Q2',
			'2009Q3',
			'2009Q4',
			'2010Q1',
			'2010Q2',
			'2010Q3',
			'2010Q4',
			'2011Q1',
			'2011Q2',
			'2011Q3',
			'2011Q4',
			'gh-pages']

function fiscalYearBucket(row, field){
	var year = row[field.dataSource];
	switch (true){
	case (parseInt(year) < 1999):
		return 'FY1990-1999'
	case (parseInt(year) < 2010):
		return 'FY2000-2009'
	case (parseInt(year) < 2013):
		return 'FY2010-2012'
	case (parseInt(year) == 2014):
		return 'FY2014'
	case (parseInt(year) < 2018):
		return 'FY2015-2017'
	case (year === 'LR 2018-2030'):
		return 'LR 2018-2030'
	case (year === 'LR 2031-2040'):
		return 'LR 2031-2040'
	default:
		return 'FY2014-2019'
	}
}
function modelYearBucket(row, field){
	var year = row[field.dataSource];
	switch (true){
	case (year < 2020):
		return 'MY2014-19'
	case (year < 2030):
		return 'MY2020-29'
	case (year < 2040):
		return 'MY2030-39'
	case (year < 2050):
		return 'MY2040-49'
	default:
		return 'MY2014-19'
	}
}

// Define the structure of fields, if this is not defined then all fields will be assumed
// to be strings.	Name must match csv header row (which must exist) in order to parse correctly.
var fields = [
	// // filterable fields
	// {name: 'last_name',		 type: 'string', filterable: true, filterType: 'regexp'},
	// {name: 'first_name',		type: 'string', filterable: true},
	// {name: 'state',			 type: 'string', filterable: true},
	// {name: 'employer',			type: 'string', filterable: true},
	// {name: 'city',				type: 'string', filterable: true},
	// {name: 'invoice_date',		type: 'date',	 filterable: true},

	{name: 'ARCID', type: 'string', filterable: true, summarizable: 'count', displayFunction: function(value){ return '<a href="{{ site.baseurl }}/data/#/'+value+'">'+value+'</a>'}},
	{name: 'Description', type: 'string', filterable: true},
	{name: 'Jurisdiction', type: 'string', filterable: true},
	{name: 'ModelingNetworkYear', type: 'integer', filterable: true},
	{name: 'Sponsor', type: 'string', filterable: true},
	{name: 'ExistLanes', type: 'string', filterable: true},
	{name: 'ProposedLanes', type: 'string', filterable: true},
	{name: 'Length', type: 'string', filterable: true},
	{name: 'GDOTPI', type: 'string', filterable: true},
	{name: 'Limits', type: 'string', filterable: true},
	{name: 'Status', type: 'string', filterable: true},
	{name: 'ProjectType', type: 'string', filterable: true},
	{name: 'Analysis', type: 'string', filterable: true},
	{name: 'Phase', type: 'string', filterable: true},
	{name: 'PhaseStatus', type: 'string', filterable: true},
	{name: 'FiscalYear', type: 'string', filterable: true, filterType:'multiselect', columnLabelable: true},
	{name: 'FundSource', type: 'string', filterable: true},
	// {name: 'Federal', type: 'integer', filterable: true},
	// {name: 'State', type: 'integer', filterable: true},
	// {name: 'Local', type: 'integer', filterable: true},
	// {name: 'Bond', type: 'integer', filterable: true},
	// {name: 'Total', type: 'integer', filterable: true},
	// {name: 'FederalSum', type: 'integer', filterable: true},
	// {name: 'StateSum', type: 'integer', filterable: true},
	// {name: 'LocalSum', type: 'integer', filterable: true},
	// {name: 'BondSum', type: 'integer', filterable: true},
	// {name: 'TotalSum', type: 'integer', filterable: true},
	
	// psuedo fields
	
	// {name: 'invoice_mm', type: 'string', filterable: true, pseudo: true,
	//	 pseudoFunction: function(row){
	//		 var date = new Date(row.invoice_date);
	//		 return pivot.utils().padLeft((date.getMonth() + 1),2,'0')}
	// },
	// {name: 'invoice_yyyy_mm', type: 'string', filterable: true, pseudo: true,
	//	 pseudoFunction: function(row){
	//	 var date = new Date(row.invoice_date);
	//	 return date.getFullYear() + '_' + pivot.utils().padLeft((date.getMonth() + 1),2,'0')}
	// },
	{name: 'ModelingNetworkYear', type: 'string', filterable: true, pseudo: true, columnLabelable: true,pseudoFunction: function(row){ return "MY"+row.ModelingNetworkYear }},
	// {name: 'FY', type: 'string', filterable: true, pseudo: true, columnLabelable: true, pseudoFunction: fiscalYearBucket},
	 // {name: 'ModelYearBucket', type: 'string', filterable: true, columnLabelable: true, pseudo: true, dataSource: 'ModelingNetworkYear', pseudoFunction: modelYearBucket},

	// // summary fields
	{name: 'Federal',	 type: 'integer',	rowLabelable: false, summarizable: 'sum', displayFunction: function(value){ return accounting.formatMoney(value)}},
	{name: 'State',	 type: 'integer',	rowLabelable: false, summarizable: 'sum', displayFunction: function(value){ return accounting.formatMoney(value)}},
	{name: 'Local',	 type: 'integer',	rowLabelable: false, summarizable: 'sum', displayFunction: function(value){ return accounting.formatMoney(value)}},
	{name: 'Bond',	 type: 'integer',	rowLabelable: false, summarizable: 'sum', displayFunction: function(value){ return accounting.formatMoney(value)}},
	{name: 'Total',	 type: 'integer',	rowLabelable: false, summarizable: 'sum', displayFunction: function(value){ return accounting.formatMoney(value)}},
	{name: 'FederalSum',	 type: 'integer',	rowLabelable: false, summarizable: 'sum', displayFunction: function(value){ return accounting.formatMoney(value)}},
	{name: 'StateSum',	 type: 'integer',	rowLabelable: false, summarizable: 'sum', displayFunction: function(value){ return accounting.formatMoney(value)}},
	{name: 'LocalSum',	 type: 'integer',	rowLabelable: false, summarizable: 'sum', displayFunction: function(value){ return accounting.formatMoney(value)}},
	{name: 'BondSum',	 type: 'integer',	rowLabelable: false, summarizable: 'sum', displayFunction: function(value){ return accounting.formatMoney(value)}},
	{name: 'TotalSum',	 type: 'integer',	rowLabelable: false, summarizable: 'sum', displayFunction: function(value){ return accounting.formatMoney(value)}}
]
var dTable = null;

	function setupPivot(input){
	input.callbacks = {afterUpdateResults: function(){
		dTable = $('#results > table').dataTable({
		"sDom": "<'row'<'col-md-6'l><'col-md-6'f>>t<'row'<'col-md-6'i><'col-md-6'p>>",
		"iDisplayLength": 25,
		"aLengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
		"sPaginationType": "bootstrap",
		"oLanguage": {
			"sLengthMenu": "_MENU_ records per page"
		}//,
		// "sScrollX": "100%",
		// "sScrollXInner": "150%",
		// "bScrollCollapse": true
		});
		//new FixedColumns( dTable );
	}};
	$('#pivot-demo').pivot_display('setup', input);
	};
	function JSON2CSV(objArray) {
	var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

	var str = '';
	var line = '';

	if (1){//($("#labels").is(':checked')) {
		var head = array[0];
		if ($("#quote").is(':checked')) {
			for (var index in array[0]) {
				var value = index + "";
				line += '"' + value.replace(/"/g, '""') + '",';
			}
		} else {
			for (var index in array[0]) {
				line += index + ',';
			}
		}

		line = line.slice(0, -1);
		str += line + '\r\n';
	}

	for (var i = 0; i < array.length; i++) {
		var line = '';

		if (1){//($("#quote").is(':checked')) {
			for (var index in array[i]) {
				var value = array[i][index] + "";
				line += '"' + value.replace(/"/g, '""') + '",';
			}
		} else {
			for (var index in array[i]) {
				line += array[i][index] + ',';
			}
		}

		line = line.slice(0, -1);
		str += line + '\r\n';
	}
	return str;
	
}
var specialElementHandlers = {
	'#editor': function(element, renderer){
	return true;
	}
};

	var someLink = window.location || window.webkiURL//window.location//'http://0.0.0.0:4000/explore/pivot/download.json' //window.location
	var formBlob = null
	var csv = ''
	

	$(document).ready(function() {
	$.each(branches, function(i, branch){
		var selected = (branch=="gh-pages") ? 'selected="selected" ' : ''
		var name = (branch=="gh-pages") ? 'Current TIP' : branch
		$('.branch-select').append('<option '+ selected +'value="'+branch+'">' + name + '</option>')
	})
	setupPivot({url:'{{ site.baseurl}}/data/TIP/projects.csv', fields: fields, filters:{"FiscalYear":"2014"}, rowLabels:['ARCID', 'Jurisdiction', 'ProjectType', 'Phase', 'Status'], summaries:["Total"]})
	$('.branch-select').change(function(){
		var branch = $('.branch-select').val()
		if (branch == 'gh-pages')
		setupPivot({url:'{{ site.baseurl}}/data/TIP/projects.csv', fields: fields, filters:{"FiscalYear":"2014"}, rowLabels:['ARCID', 'Jurisdiction', 'ProjectType', 'Phase', 'Status'], summaries:["Total"]})
		else{ 
		$.get('https://api.github.com/repos/landonreed/plan-it/contents/data/TIP/projects.csv?ref='+ branch, function (file) {
			var data = Base64.decode(file.content)
			console.log(data)
			setupPivot({csv:data, fields: fields, filters:{"FiscalYear":branch.substring(0,4)}, rowLabels:['ARCID', 'Jurisdiction', 'ProjectType', 'Phase', 'Status'], summaries:["Total"]})
			});
		}
	})

	// prevent dropdown from closing after selection
	$('.stop-propagation').click(function(event){
		event.stopPropagation();
	});

	// **Sexy** In your console type pivot.config() to view your current internal structure (the full initialize object).	Pass it to setup and you have a canned report.
	$('#atl-project-funding').click(function(event){
		$('#pivot-demo').pivot_display('reprocess_display', {filters:{"Jurisdiction":"City of Atlanta"}, rowLabels:["ProjectType"], columnLabels:["ModelingNetworkYear"], summaries:["Total"]})
	});

	$('#cobb-phase-funding').click(function(event){
		$('#pivot-demo').pivot_display('reprocess_display', {filters:{"Jurisdiction":"Cobb County"},rowLabels:["Phase","ModelingNetworkYear"], summaries:["Total"]})
	});

	$('#fy-category-funding').click(function(event){
		$('#pivot-demo').pivot_display('reprocess_display', {rowLabels:["FundSource"],columnLabels:["FiscalYearBucket"],summaries:["Total"]})
	});


	});

