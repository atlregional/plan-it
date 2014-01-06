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
      cell: "string"
    },
    {
      name: "Auth",
      label: "Auth",
      cell: "string"
    },
    {
      name: "FY",
      label: "FY",
      cell: "string"
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

  // Render the grid and attach the root to your HTML document
  $("#example-1-result").append(grid.render().$el);

  // Fetch some countries from the url
  // territories.fetch({reset: true});
}