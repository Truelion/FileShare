

namespace("core.ui.DataGrid", 
{
    '@inherits' : core.ui.WebComponent,
    '@cascade'  : true,
    // '@stylesheets' :["~/resources/[$theme]/DataGrid.css"],
    // '@traits' : [core.traits.EventTracker],
    
    initialize : function(){
        this.addEventListener("click",      this.onClickDetected.bind(this), false);
        this.addEventListener("cellclick",  this.onCellClicked.bind(this), false);
        this.addEventListener("columnclick",this.onColumnHeaderClicked.bind(this), false);
        this.addEventListener("columnsort", this.onSortByColumnClicked.bind(this), false);
        this.addEventListener("gridaction", this.onGridCellAction.bind(this), false);
    },

    onGridCellAction : function(e){
        console.warn(e.data)
    },

    onClickDetected : function(e){
        if(e.target){
            e.preventDefault();

            var tr;
            var td = this.getRealTargetFromEvent(e, "td", "tr");
            var th = this.getRealTargetFromEvent(e, "th", "thead");

            if(td) {
                var _action = td.getAttribute("data-action");
                var _action_value = td.getAttribute("data-action-value");
                tr = td.parentNode;
                this.dispatchEvent("cellclick", true, true, {row:tr, cell:td, action:_action, action_value:_action_value})
            }
            else if(th) {
                var _thead = th.parentNode;
                var _action = th.getAttribute("data-action");
                var _sortby="";
                var _sortorder="";

                if(_action == "sort"){
                    _sortby = th.getAttribute("data-sortby");
                    _sortorder = th.getAttribute("data-order");
                    this.dispatchEvent("sortcolumn", true, true, {header:_thead, column:th, sortby:_sortby, sortorder:_sortorder});
                } else {
                    var _action = th.getAttribute("data-action");
                    var _action_value = td.getAttribute("data-action-value");
                    this.dispatchEvent("columnclick", true, true, {header:_thead, column:th, action:_action, action_value:_action_value});
                }
            }
        }
        /*if(e.target){
            var cl = e.target.classList;
            if(cl.contains("cell")){
                var _row = e.target.parentNode;
                if(cl.contains("action")){
                    var b = e.target.querySelector(".button");
                    var a = e.target.getAttribute("data-action");
                    this.dispatchEvent("gridaction", true, true, {
                        row : _row, 
                        cell: e.target,
                        button : b,
                        action : a
                    });
                    this.dispatchEvent(a, true, true, {
                        row : _row, 
                        cell: e.target,
                        button : b,
                        action : a
                    });
                }
                this.dispatchEvent("cellclick", true, true, {row:_row, cell:e.target})
            }
            else if(cl.contains("column")||cl.contains("column-label")) {
                var _header = e.target.parentNode;
                this.dispatchEvent("columnclick", true, true, {header:_header, column:e.target});
                this.dispatchEvent("columnsort", true, true, {header:_header, column:e.target, attribute: e.target.getAttribute("data-name")})
            }
        }*/
    },

    onCellClicked : function(e){
        var data = e.data||{};
        if(data.row) {
             console.log("cellclick", data.row, data.cell, data.action, data.action_value)
            if(this.lastRow){
                this.lastRow.classList.remove("selected");
            }
            data.row.classList.add("selected");
            this.lastRow = data.row;
            this.dispatchEvent("select", true, true, {row:data.row, cell:data.cell})
        }
    },

    onSortByColumnClicked : function(e){
        var attrb = e.data.attribute;
        this.dataController.sort(attrb);
    },

    onColumnHeaderClicked : function(e){
        //logic to sort by column
    },

    
    innerHTML: ""
});
