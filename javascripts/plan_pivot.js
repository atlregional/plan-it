function ageBucket(row, field){
  var age = Math.abs(((new Date().getTime()) - row[field.dataSource])/1000/60/60/24);
  switch (true){
    case (age < 31):
      return '000 - 030'
    case (age < 61):
      return '031 - 060'
    case (age < 91):
      return '061 - 090'
    case (age < 121):
      return '091 - 120'
    default:
      return '121+'
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

    {name: 'ARCID', type: 'string', filterable: true},
    {name: 'Description', type: 'string', filterable: true},
    {name: 'Jurisdiction', type: 'string', filterable: true},
    {name: 'ModelingNetworkYear', type: 'string', filterable: true},
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
    {name: 'Federal', type: 'string', filterable: true},
    {name: 'State', type: 'string', filterable: true},
    {name: 'Local', type: 'string', filterable: true},
    {name: 'Bond', type: 'string', filterable: true},
    {name: 'Total', type: 'string', filterable: true},
    {name: 'FederalSum', type: 'string', filterable: true},
    {name: 'StateSum', type: 'string', filterable: true},
    {name: 'LocalSum', type: 'string', filterable: true},
    {name: 'BondSum', type: 'string', filterable: true},
    {name: 'TotalSum', type: 'string', filterable: true}
    // // psuedo fields
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
    // {name: 'invoice_yyyy', type: 'string', filterable: true, pseudo: true, columnLabelable: true,
    //   pseudoFunction: function(row){ return new Date(row.invoice_date).getFullYear() }},
    // {name: 'age_bucket', type: 'string', filterable: true, columnLabelable: true, pseudo: true, dataSource: 'last_payment_date', pseudoFunction: ageBucket},


    // // summary fields
    // {name: 'billed_amount',     type: 'float',  rowLabelable: false, summarizable: 'sum', displayFunction: function(value){ return accounting.formatMoney(value)}},
    // {name: 'payment_amount',    type: 'float',  rowLabelable: false, summarizable: 'sum', displayFunction: function(value){ return accounting.formatMoney(value)}},
    // {name: 'balance', type: 'float', rowLabelable: false, pseudo: true,
    //   pseudoFunction: function(row){ return row.billed_amount - row.payment_amount },
    //   summarizable: 'sum', displayFunction: function(value){ return accounting.formatMoney(value)}},
    // {name: 'last_payment_date',  type: 'date',  filterable: true}
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

    setupPivot({url:'./data/projects.csv', fields: fields, filters: {Jurisdiction: 'City of Atlanta'}, rowLabels:['ARCID', 'Jurisdiction', 'ModelingNetworkYear', 'Status']})

    // prevent dropdown from closing after selection
    $('.stop-propagation').click(function(event){
      event.stopPropagation();
    });

    // **Sexy** In your console type pivot.config() to view your current internal structure (the full initialize object).  Pass it to setup and you have a canned report.
    // $('#ar-aged-balance').click(function(event){
    //   $('#pivot-demo').pivot_display('reprocess_display', {rowLabels:["employer"], columnLabels:["age_bucket"], summaries:["balance"]})
    // });

    // $('#acme-detail-report').click(function(event){
    //   $('#pivot-demo').pivot_display('reprocess_display', {filters:{"employer":"Acme Corp"},rowLabels:["city","last_name","first_name","state","invoice_date"]})
    // });

    // $('#miami-invoice-detail').click(function(event){
    //   $('#pivot-demo').pivot_display('reprocess_display', {"filters":{"city":"Miami"},"rowLabels":["last_name","first_name","employer","invoice_date"],"summaries":["payment_amount"]})
    // });
  });