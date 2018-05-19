
namespace("applications.HelloWorld.activities.LineChart",
{
    '@inherits' : core.ui.Activity,
    "@cascade"  : true,
    '@href'     : "src/./index.html",
    '@title'    : "Test",
    '@stylesheets' : [ "src/./index.css" ],
    '@imports'  : [],
    '@traits'   : [],


    initialize : function() {
        this.parent(arguments);
        this.setupChart();
    },

    onPause : function(){
        this.parent(arguments);
        // alert(this.namespace + " going to sleep")
    },

    setupChart : function(){
        this.payequity = new core.controllers.PayEquityDataController;
        this.payequity.addEventListener("loaded", this.onPayEquityDataLoaded.bind(this), false);
        this.payequity.load();
    },

    onPayEquityDataLoaded : function(e){
        if(e.controller == this.payequity){
            //all ambiguous, no id's
            var charts = this.querySelectorAll(".line-chart");
            
            //empty the nodes
            charts[0].innerHTML = "";
            charts[1].innerHTML = "";

            //query for plots
            var gender_gaps = this.payequity.getData().items.where("$.category == 'gender_gap'")[0];
            var ethnic_gaps = this.payequity.getData().items.where("$.category == 'ethnic_gap'")[0];

            
            //use plots as model (core.ui.ComponentModel -- 1st arg)
            //reuse node as root element -- 2nd arg.
            var c0 = new core.ui.charts.LineChart(gender_gaps.gaps[0].plotdata, charts[0]);
            var c1 = new core.ui.charts.LineChart(gender_gaps.gaps[1].plotdata, charts[1]);
        }
    },

    innerHTML:
    '<div></div>'
});



