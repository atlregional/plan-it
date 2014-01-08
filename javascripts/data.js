---

---
var grid;
var row;
var changes = [];
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
      cell: "string",
      editable: false, 
      // Backgrid.SelectCell.extend({
      // // It's possible to render an option group or use a
      // // function to provide option values too.
      //   optionValues: [["ALL", "ALL"], ["CST", "CST"], ["PE", "PE"], ["PE-OV", "PE-OV"], ["ROW", "ROW"], ["SCP", "SCP"], ["UTL", "UTL"]]

      // }),
      sortable: false
    },
    {
      name: "Auth",
      label: "Auth",
      cell: "string",
      // Backgrid.SelectCell.extend({
      // // It's possible to render an option group or use a
      // // function to provide option values too.
      //   optionValues: [["AUTH", "AUTH"], ["", ""], ["  ", ""]]
      // }),
      sortable: false
    },
    {
      name: "FY",
      label: "FY",
      cell: "string",
      sortable: false
      // cell: Backgrid.SelectCell.extend({
      // // It's possible to render an option group or use a
      // // function to provide option values too.
      //   optionValues: [["2013", "2013"], ["2014", "2014"], ["2015", "2015"], ["2016", "2016"], ["2017", "2017"], ["AUTH", "AUTH"], ["LR 2018-2030", "LR 2018-2030"], ["LR 2031-2040", "LR 2031-2040"]]
        
      // })
    },
    {
      name: "FundSource",
      label: "FundSource",
      cell: "string",
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
     var previous = model._previousAttributes[selected.attributes.name]
     var current = model.attributes[selected.attributes.name]
     var id = model.attributes['ARCID']
     var lineNumber = parseInt(model.cid.substring(1)) + 1
     console.log(selected)
     console.log(model)
     if (previous != current){
        changes.push(newChange("cell-edit", model))
        var message = model.attributes['Phase'] + " phase <strong>"+selected.attributes.name+"</strong> changed from "+previous+" to "+current // +"<br>"
        console.log()
        var issueMessage = "* [" + strip(message) + "](https://github.com/landonreed/plan-it/blob/gh-pages/data/TIP/individual/"+ id +".csv#L" + lineNumber + ")"
        $('#edit-message').empty().append(message).fadeIn(500).delay(500).fadeOut(2000)
        if (count > 0){
          $('#issue-body').val($('#issue-body').val() + "\n" + issueMessage)
        }
        else{
          $('#issue-body').val("**Changes:**\n" + issueMessage)
        }
        $('#save').removeAttr('disabled')
        count++
     }
  });
  // Render the grid and attach the root to your HTML document
  $("#example-1-result").append(grid.render().$el);

  // Fetch some countries from the url
  // territories.fetch({reset: true});
}