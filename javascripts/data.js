---

---
var grid;
var row;
var changes = [];
var values;
var Territory;
var Territories;
var columns
var rowNum;
var territories
function backgridTable(data){
   $('#example-1-result').empty()
  	Territory = Backbone.Model.extend({});
    
  	Territories = Backbone.Collection.extend({
      comparator: 'index',
  	  model: Territory
  	});
    // console.log(JSON.stringify(data))
    $.each(data, function(i, row){
      row.index = i + 1
    })
  	territories = new Territories(data);
    var i = 0
    
  	columns = [
    {
      name: "index",
      label: "#",
      cell: "integer",
      editable: false, 
      // 
      sortable: true
    },
    {
      name: "Phase",
      label: "Phase",
      cell: 
      Backgrid.SelectCell.extend({
      // It's possible to render an option group or use a
      // function to provide option values too.
        optionValues: 
        [["PE", "PE"], ["CST", "CST"], ["SCP", "SCP"], ["ROW", "ROW"], ["UTL", "UTL"], ["ALL", "ALL"], ["PE-OV", "PE-OV"]]
      }),
      // editable: false,  false], [
      sortable: false
    },
    {
      name: "Auth",
      label: "Auth",
      cell: "string",
      sortable: false
    },
    {
      name: "FY",
      label: "FY",
      cell: "string",
      sortable: false
    },
    {
      name: "FundSource",
      label: "FundSource",
      cell: Backgrid.SelectCell.extend({
      // It's possible to render an option group or use a
      // function to provide option values too.
        optionValues:
      [["STP - Urban (>200K) (ARC) ", "STP - Urban (>200K) (ARC) "],
["Congestion Mitigation & Air Quality Improvement (CMAQ)", "Congestion Mitigation & Air Quality Improvement (CMAQ)"],
["Congestion Mitigation/Air Quality (100%)", "Congestion Mitigation/Air Quality (100%)"],
["STP - Enhancements", "STP - Enhancements"],
["Recreational Trails Program", "Recreational Trails Program"],
["National Highway Performance Program (NHPP)", "National Highway Performance Program (NHPP)"],
["STP - Statewide Flexible (GDOT)", "STP - Statewide Flexible (GDOT)"],
["National Highway Performance Program (NHPP) Exempt", "National Highway Performance Program (NHPP) Exempt"],
["Railway-Highway - Hazard Elimination", "Railway-Highway - Hazard Elimination"],
["Highway Safety Improvement Program (HSIP)", "Highway Safety Improvement Program (HSIP)"],
["Railway-Highway - Protective Devices", "Railway-Highway - Protective Devices"],
["State of Georgia", "State of Georgia"],
["National Highway System", "National Highway System"],
["Transit Fund (21533)", "Transit Fund (21533)"],
["STP - Urban (>200K) (ARC)", "STP - Urban (>200K) (ARC)"],
["New Starts", "New Starts"],
["Local Sources - PPP", "Local Sources - PPP"],
["Private Sources - PPP", "Private Sources - PPP"],
["State Sources - PPP", "State Sources - PPP"],
["Local Jurisdiction/Municipality Funds", "Local Jurisdiction/Municipality Funds"],
["TIGER V Discretionary Grant ", "TIGER V Discretionary Grant "],
["TAP - Urban (>200K) (ARC)", "TAP - Urban (>200K) (ARC)"],
["Transit Urbanized Area Formula Program", "Transit Urbanized Area Formula Program"],
["Rail Modern - Fixed Guideway (80/20)", "Rail Modern - Fixed Guideway (80/20)"],
["Enhanced Mobility of Seniors and Individuals with Disabilities", "Enhanced Mobility of Seniors and Individuals with Disabilities"],
["Transit Nonurbanized Area Formula", "Transit Nonurbanized Area Formula"],
["Job Access and Reverse Commute", "Job Access and Reverse Commute"],
["New Freedom", "New Freedom"],
["State of Good Repair Grants", "State of Good Repair Grants"],
["Bus and Bus Facilities Program", "Bus and Bus Facilities Program"],
["Transit Project Bond (2007) - State", "Transit Project Bond (2007) - State"],
["GRTA Funds (46001)", "GRTA Funds (46001)"],
["Bus - New (80/20)", "Bus - New (80/20)"],
["State Bonds", "State Bonds"],
["Toll Revenue Bonds", "Toll Revenue Bonds"],
["Interstate Maintenance", "Interstate Maintenance"],
["Fuel Funds", "Fuel Funds"],
["SAFETEA-LU Earmark", "SAFETEA-LU Earmark"],
["OTHER", "OTHER"],
["Public Private Partnership", "Public Private Partnership"],
["TIFIA Loan", "TIFIA Loan"],
["GRV BONDS (GARVEE Bond Program)", "GRV BONDS (GARVEE Bond Program)"],
["Bridge (Off-System)", "Bridge (Off-System)"],
["General Federal Aid - 2018-2040", "General Federal Aid - 2018-2040"],
["Bridge (On-System)", "Bridge (On-System)"],
["Transportation, Community and System Preservation", "Transportation, Community and System Preservation"],
["Surface Transportation Priorities (Earmark)", "Surface Transportation Priorities (Earmark)"],
["Public Land Discretionary", "Public Land Discretionary"],
["Georgia Transportation Infrastructure Bank", "Georgia Transportation Infrastructure Bank"],
["Transportation Enhancement", "Transportation Enhancement"],
["High Priority Projects from TEA-21", "High Priority Projects from TEA-21"],
["Federal Earmark Funding", "Federal Earmark Funding"],
["Federal Earmark", "Federal Earmark"],
["Certain Safety Projects (GRC)", "Certain Safety Projects (GRC)"],
["Bridge Discretionary", "Bridge Discretionary"],
["Congestion Mitigation and Air Quality", "Congestion Mitigation and Air Quality"],
["GA Department of Transportation Funds", "GA Department of Transportation Funds"],
["STP - Off-System Bridge", "STP - Off-System Bridge"],
["Clean Fuels Formula Program", "Clean Fuels Formula Program"],
["State of Good Repair Grant (5337)", "State of Good Repair Grant (5337)"],
["ARRA - Urban (>200K) (ARC)", "ARRA - Urban (>200K) (ARC)"],
["Appalachian Local Access", "Appalachian Local Access"]]
}),

      sortable: false
    },
    {
      name: "Federal",
      label: "Federal",
      cell: "string",
      sortable: false
    },
    {
      name: "State",
      label: "State",
      cell: "string",
      sortable: false
    },
    {
      name: "Local",
      label: "Local",
      cell: "string",
      sortable: false
    },
    {
      name: "Bond",
      label: "Bond",
      cell: "string",
      sortable: false
    },
    {
      name: "Total",
      label: "Total",
      cell: "string",
      sortable: false
    }];
  // Suppose you want to highlight the entire row when an editable field is focused
  var FocusableRow = Backgrid.Row.extend({
    highlightColor: 'lightYellow',
    events: {
      focusin: 'rowFocused',
      focusout: 'rowLostFocus'
    },
    rowFocused: function() {
      this.$el.css('background-color', this.highlightColor);
      // $('#delete-row').removeAttr('disabled')
      row = this
    },
    rowLostFocus: function() {
      this.$el.removeAttr('style');

      // $('#delete-row').attr('disabled', 'disabled')

      // Goofy way to handle the 
      // setTimeout(function(){
      //   row = undefined
      // }, 1000) 
    }
  });

  // Initialize a new Grid instance
  grid = new Backgrid.Grid({
    row: FocusableRow, // <-- Tell the Body class to use FocusableRow to render rows.
    columns: columns,
    collection: territories
  });
  var count = 0;
  grid.collection.on('backgrid:edited', function(model, selected) { 
     var field = selected.attributes.name
     var previous = model._previousAttributes[field]
     var current = model.attributes[field]
     var id = model.attributes['ARCID']
     var lineNumber = model.attributes.index + 1
     // console.log(lineNumber)
     console.log(selected)
     console.log(model)
     // These first two if statements need some work!
     if (previous === undefined && current === '')
        console.log("nothing changed!")
     else if (previous === undefined)
        console.log("nothing changed!")
     else if (previous != current){
        var message = model.attributes['Phase'] + " phase <strong>"+field+"</strong> changed from "+previous+" to "+current // +"<br>"
        console.log()
        var issueMessage = "* [" + strip(message) + "](https://github.com/landonreed/plan-it/blob/gh-pages/data/TIP/individual/"+ id +".csv#L" + lineNumber + ")"
        changes.push(newChange("edit-" + field, model, message, issueMessage))
        updateMessages(changes, false)
        $('.change').removeAttr('disabled')
        count++
     }
  });
  // Render the grid and attach the root to your HTML document
  grid.collection = grid.collection.sort("index", "descending")
  $("#example-1-result").append(grid.render().$el);

  // Fetch some countries from the url
  // territories.fetch({reset: true});
}