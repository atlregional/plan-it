---

---
function backgridTable(data){
   $('#example-1-result').empty()
  	var Territory = Backbone.Model.extend({});
    
  	var Territories = Backbone.Collection.extend({
  	  model: Territory
  	});
    console.log(JSON.stringify(data))
  	var territories = new Territories(data);
  	var columns = [
    {
      name: "Phase",
      label: "Phase",
      cell: Backgrid.SelectCell.extend({
      // It's possible to render an option group or use a
      // function to provide option values too.
        optionValues: [["ALL", "ALL"], ["CST", "CST"], ["PE", "PE"], ["PE-OV", "PE-OV"], ["ROW", "ROW"], ["SCP", "SCP"], ["UTL", "UTL"]]

      })
    },
    {
      name: "Auth",
      label: "Auth",
      cell: Backgrid.SelectCell.extend({
      // It's possible to render an option group or use a
      // function to provide option values too.
        optionValues: [["AUTH", "AUTH"], ["", "  "]]
        
      })
    },
    {
      name: "FY",
      label: "FY",
      cell: "string"
      // cell: Backgrid.SelectCell.extend({
      // // It's possible to render an option group or use a
      // // function to provide option values too.
      //   optionValues: [["2013", "2013"], ["2014", "2014"], ["2015", "2015"], ["2016", "2016"], ["2017", "2017"], ["AUTH", "AUTH"], ["LR 2018-2030", "LR 2018-2030"], ["LR 2031-2040", "LR 2031-2040"]]
        
      // })
    },
    {
      name: "FundSource",
      label: "FundSource",
      cell: "string"
    },
    {
      name: "Federal",
      label: "Federal",
      cell: "string"
    },
    {
      name: "State",
      label: "State",
      cell: "string"
    },
    {
      name: "Local",
      label: "Local",
      cell: "string"
    },
    {
      name: "Bond",
      label: "Bond",
      cell: "string"
    },
    {
      name: "Total",
      label: "Total",
      cell: "string"
    }];

  // Initialize a new Grid instance
  var grid = new Backgrid.Grid({
    columns: columns,
    collection: territories
  });
  grid.collection.on('backgrid:edited', function(model, selected) { 
     var previous = model._previousAttributes[selected.attributes.name]
     var current = model.attributes[selected.attributes.name]
     console.log(selected.attributes.name)
     console.log(model)
     if (previous != current){
        var message = "You changed <strong>"+selected.attributes.name+"</strong> from "+previous+" to "+current
        console.log()
        $('#edit-message').empty().append(message).fadeIn(500).delay(500).fadeOut(2000)
     }
  });
  // Render the grid and attach the root to your HTML document
  $("#example-1-result").append(grid.render().$el);

  // Fetch some countries from the url
  // territories.fetch({reset: true});
}