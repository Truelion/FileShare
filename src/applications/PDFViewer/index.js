
namespace("applications.PDFViewer",
{
    '@inherits' : core.ui.OfflineApplication,
    '@cascade'  : true,
    '@stylesheets' : [ "src/./index.css"],
    

    initialize : function(){
        //this.parent(arguments);
        this.closeBtn = this.querySelector("#demo-toolbar .fa");
        this.closeBtn.addEventListener("click", this.onBack.bind(this), false);
        this.loadPage();
    },

    onBack : function(){
        history.back();
    },

    onRender : function(){

    },

    loadPage : function(){
        var documentPath = window.getParameterByName("path");
        var documentType = window.getParameterByName("type")||"pdf";
        console.log(location)


        var html = "";
        var newElem = null;
        switch (documentType){
        case "pdf":            
            html =  '<object id="objectPDF" class="pdf" type="application/pdf" data="' + documentPath + '" width="100%" height="98%">' +
            '       <param name="view" value="FitH"/>' +
            '       <param name="zoom" value="100" />' +
            '       <param name="page" value="1" />' +
            '       <param name="scrollbar" value="1" />' +
            '       <param name="toolbar" value="1" />' +
            '       <param name="navpanes" value="1" />' +
            '       <param name="statusbar" value="1" />' +
            '   </object>';
            break;
        case "jpg":
        case "jpeg":
        case "png":
        case "gif":
            html = '<img src="' + documentPath + '" border="0" />';
            break;
        case "mp4":
        case "m4v":
        case "ogg":
        case "webm":
            html = '<video controls="" width="100%" height="90%">'+
                        '<source src="'+documentPath+'" id="vdoInvproof" type="video/'+documentType+'">'+
                        'Your browser does not support the video tag.'+
                    '</video>'
            break;
        case "ogv":
            html = '<video controls="" width="100%" height="90%">'+
                        '<source src="'+documentPath+'" id="vdoInvproof" type="video/ogg">'+
                        'Your browser does not support the video tag.'+
                    '</video>'
            break;
        default:
            document.getElementById("pdfDiv").style.height = "400px";
            html =  'This file type is not supported on the iPad.';
            break;
        }
        document.getElementById("pdfDiv").innerHTML = html;
    }
});

/************* invoking video from html for various MME types *******
<a href="../PDFViewer/index.html?type=mp4&path=../../../resources/video/SO_Assess_and_Results.mp4">view video</a>
<a href="../PDFViewer/index.html?type=ogg&path=../../../resources/video/small.ogg">view video</a>
<a href="../PDFViewer/index.html?type=ogv&path=../../../resources/video/small3.ogv">view video</a>
<a href="../PDFViewer/index.html?type=webm&path=../../../resources/video/small4.webm">view video</a>
**********************************************/


