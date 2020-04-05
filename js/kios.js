//global module
var MODULE = (function () {
    var app = {};
    app.views = new Array();
    app.activeNavItem = null;
    app.currentView = null;
    app.currentViewID = 0;
    app.currentViewName = '';
    app.prevViewId = 0;
    app.currentNavId = 0;
    app.navItems = new Array();

    app.backEnabled = false;
    app.optionEnabled = false;
    app.fullAdVisible = false;

    app.optionButtonAction = '';

    app.backButton = document.getElementById("bar-back");
    app.actionButton = document.getElementById("bar-action");
    app.optionsButton = document.getElementById("bar-options");

    app.totalNoOfStates = 29;  // It is just fixed as data is not comming properly formated after that.


    // button input
    app.keyCallback = {
        dUp: function () { navVertical(false); },
        dDown: function () { navVertical(true); },
        dLeft: function () { navHorizontal(false); },
        dRight: function () { navHorizontal(true); },
        softLeft: function () { goBack(); },
        softRight: function () { executeOption(); },
        enter: function () { execute(); },
        menu: function () { },
        back: function () { goBack(); },
        quit: function () { },
        other: function () { }
    };

    // startup
    window.addEventListener("load", function () {
        // var viewRoot = document.getElementById("views");
        // app.views = viewRoot.querySelectorAll('.view');
        // load first view
        //showView(0);
        initView();
    });

    /**
     * initilize view componsents,
     *  
     */
    function initView() {
        appendDate();
        let statistics = JSON.parse(coronaStatistics);
        //console.log(statistics);
        let payload = statistics.payload;
        let columnHeadings = payload.columnHeadings;
        let rows = payload.rows[0];
        detailDiv = $('#header-detail');
        for(let [index, row] of Object.entries(rows)) {
            if(index > app.totalNoOfStates) {
                $(detailDiv).append(
                    '<div class="card m-t10"><div class="header-title-div" onclick="showDetail(' +"'detail-"+30+  "')"+ '">'
                    +'<div class="state-name"> <strong class="state-name-span">'+ row[0]+' :</strong></div>'
                    +'</div>'
                    + '<div class="detail-'+30+' header-detail">'
                    +    '<div><strong>Total Confirmed cases : '+ row[1]+'</strong></div>'
                    +    '<div><strong class="cured-count-span">Total Cured/Discharged/Migrated : '+ row[3] + '</strong></div>'
                    +    '<div><strong class="death-count-span">Total Deaths : ' + row[6] + '</strong></div>'
                    +  '</div>'
                    +  '<div>'
                ); 
                $('#show-detail').toggleClass('hide');       
                break;
            }
        // for (var index = 0; index < rows.length && index < app.totalNoOfStates; index++) {

            $(detailDiv).append(
                '<div class="card m-t10"><div class="header-title-div" onclick="showDetail(' +"'detail-"+row[0]+  "')"+ '">'
                +'<div class="state-name"> <strong>Name of State / UT : </strong><span class="state-name-span">'+ row[1]+'</span></div>'
                +'</div>'
                + '<div class="detail-'+row[0]+' header-detail">'
                +    '<div><strong class="state-name-span">Total Confirmed cases : '+ row[2]+'</strong></div>'
                +    '<div><strong class="cured-count-span">Cured/Discharged/Migrated : '+ row[3] + '</strong></div>'
                +    '<div><strong class="death-count-span">Death : ' + row[4] + ' </strong></div>'
                +  '</div>'
                +  '<div>'
            );

            // <div class="card">
            //     <div class="header-title-div" onclick="showDetail('detail-1')">
            //         <div class="state-name"><strong>Name of State / UT : </strong> Andhra Pradesh</div>
            //     </div>
            //     <div class="detail-1 header-detail">
            //         <div><strong>Total Confirmed cases : </strong> 161</div>
            //         <div><strong>Cured/Discharged/Migrated : </strong> 1</div>
            //         <div><strong>Death : </strong> 1</div>
            //         <div>

            //         </div>

            //     </div>
        }

    }

    function appendDate() {
        today = new Date();
        $('.header-status-today').append(today.toLocaleDateString());
    }

    /**
     * different ways to fetch json data from from server,
     *  failed due to setup of server on the localhost:port
     */
    function fetchCrawledData() {
                    $.getJSON("data1.json", function () {
                        console.log("success");
                    }).done(function (data) {
                        console.log("second success");
                    })
                        .fail(function () {
                            console.log("error");
                        })
                        .always(function () {
                            console.log("complete");
                        });


        $.getJSON( '../data1.json', function( data ) {
                    console.log(data);
        });

        //usage:
        readTextFile("data1.json", function (text) {
            var data = JSON.parse(text);
            console.log(data);
        });
    }

    /**
     * This method will call server and fetch jsonData file from there
     * @param Crawled Data  file
     * @param {*} callback where response is returned
     */
    function readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                    callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }



}());