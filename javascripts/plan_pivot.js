---

---
function modelYearBucket(row, field){
  var year = row[field.dataSource];
  switch (true){
    case (year < 2020):
      return '2014-2019'
    case (year < 2030):
      return '2020-2029'
    case (year < 2040):
      return '2030-2039'
    case (year < 2050):
      return '2040-2049'
    default:
      return '2014-2019'
  }
};

// Define the structure of fields, if this is not defined then all fields will be assumed
// to be strings.  Name must match csv header row (which must exist) in order to parse correctly.
var fields = [
    // // filterable fields
    // {name: 'last_name',         type: 'string', filterable: true, filterType: 'regexp'},
    // {name: 'first_name',        type: 'string', filterable: true},
    // {name: 'state',             type: 'string', filterable: true},
    // {name: 'employer',          type: 'string', filterable: true},
    // {name: 'city',              type: 'string', filterable: true},
    // {name: 'invoice_date',      type: 'date',   filterable: true},

    {name: 'ARCID', type: 'string', filterable: true, summarizable: 'count'},
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
    {name: 'FiscalYear', type: 'string', filterable: true},
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
    //   pseudoFunction: function(row){
    //       var date = new Date(row.invoice_date);
    //       return pivot.utils().padLeft((date.getMonth() + 1),2,'0')}
    // },
    // {name: 'invoice_yyyy_mm', type: 'string', filterable: true, pseudo: true,
    //   pseudoFunction: function(row){
    //     var date = new Date(row.invoice_date);
    //     return date.getFullYear() + '_' + pivot.utils().padLeft((date.getMonth() + 1),2,'0')}
    // },
    {name: 'ModelingNetworkYear', type: 'string', filterable: true, pseudo: true, columnLabelable: true,
      pseudoFunction: function(row){ return row.ModelingNetworkYear }},
    {name: 'FiscalYear', type: 'string', filterable: true, pseudo: true, columnLabelable: true,
      pseudoFunction: function(row){ return row.FiscalYear }},
     {name: 'ModelYearBucket', type: 'string', filterable: true, columnLabelable: true, pseudo: true, dataSource: 'ModelingNetworkYear', pseudoFunction: modelYearBucket},


    // // summary fields
    {name: 'Federal',     type: 'integer',  rowLabelable: false, summarizable: 'sum', displayFunction: function(value){ return accounting.formatMoney(value)}},
    {name: 'State',     type: 'integer',  rowLabelable: false, summarizable: 'sum', displayFunction: function(value){ return accounting.formatMoney(value)}},
    {name: 'Local',     type: 'integer',  rowLabelable: false, summarizable: 'sum', displayFunction: function(value){ return accounting.formatMoney(value)}},
    {name: 'Bond',     type: 'integer',  rowLabelable: false, summarizable: 'sum', displayFunction: function(value){ return accounting.formatMoney(value)}},
    {name: 'Total',     type: 'integer',  rowLabelable: false, summarizable: 'sum', displayFunction: function(value){ return accounting.formatMoney(value)}},
    {name: 'FederalSum',     type: 'integer',  rowLabelable: false, summarizable: 'sum', displayFunction: function(value){ return accounting.formatMoney(value)}},
    {name: 'StateSum',     type: 'integer',  rowLabelable: false, summarizable: 'sum', displayFunction: function(value){ return accounting.formatMoney(value)}},
    {name: 'LocalSum',     type: 'integer',  rowLabelable: false, summarizable: 'sum', displayFunction: function(value){ return accounting.formatMoney(value)}},
    {name: 'BondSum',     type: 'integer',  rowLabelable: false, summarizable: 'sum', displayFunction: function(value){ return accounting.formatMoney(value)}},
    {name: 'TotalSum',     type: 'integer',  rowLabelable: false, summarizable: 'sum', displayFunction: function(value){ return accounting.formatMoney(value)}}
]

  function setupPivot(input){
    input.callbacks = {afterUpdateResults: function(){
      $('#results > table').dataTable({
        "sDom": "<'row'<'span6'l><'span6'f>>t<'row'<'span6'i><'span6'p>>",
        "iDisplayLength": 25,
        "aLengthMenu": [[25, 50, 100, -1], [25, 50, 100, "All"]],
        "sPaginationType": "bootstrap",
        "oLanguage": {
          "sLengthMenu": "_MENU_ records per page"
        }
      });
    }};
    $('#pivot-demo').pivot_display('setup', input);
  };

  $(document).ready(function() {

    setupPivot({url:'{{ site.baseurl}}/data/TIP/projects.csv', fields: fields, filters:{"FiscalYear":"2014"}, rowLabels:['ARCID', 'Jurisdiction', 'ProjectType', 'Phase', 'Status'], summaries:["Total"]})

    // prevent dropdown from closing after selection
    $('.stop-propagation').click(function(event){
      event.stopPropagation();
    });

    // **Sexy** In your console type pivot.config() to view your current internal structure (the full initialize object).  Pass it to setup and you have a canned report.
    $('#atl-project-funding').click(function(event){
      $('#pivot-demo').pivot_display('reprocess_display', {filters:{"Jurisdiction":"City of Atlanta"}, rowLabels:["ProjectType"], columnLabels:["ModelingNetworkYear"], summaries:["Total"]})
    });

    $('#cobb-phase-funding').click(function(event){
      $('#pivot-demo').pivot_display('reprocess_display', {filters:{"Jurisdiction":"Cobb County"},rowLabels:["Phase","ModelingNetworkYear"], summaries:["Total"]})
    });

    $('#douglasville-source-funding').click(function(event){
      $('#pivot-demo').pivot_display('reprocess_display', {filters:{"Sponsor":"City of Douglasville"},rowLabels:["ModelingNetworkYear"],summaries:["Total", "Federal", "State", "Local", "Bond"]})
    });
  });