
openDocument = function (documentName, iPadType){
	//var document = getdocument();
	var rootPath = Session.BasePath||"";
	var docPath = documentName;

    // replace // at end with /
    if (rootPath.split("").reverse().join("").indexOf("//") == 0){
    	rootPath = rootPath.substr(0, rootPath.length-1);
    }
    
    if (documentName.toLowerCase().indexOf("http:") == -1 && documentName.toLowerCase().indexOf("https:") == -1){
        documentName = rootPath + documentName;    	
    }
    
    if (Session.Browser.isIPad()){   
    	if(typeof(iPadType) == "undefined") { iPadType = "pdf"; }
        if (iPadType.toLowerCase().indexOf("pdf") > -1 || iPadType.toLowerCase().indexOf("html") > -1)
		{
         /*   var newPath = "";
            var splitPath = docPath.split(".");
            // use the ipad type as the document type
            var extension = splitPath[splitPath.length -1];
            
            if (typeof(iPadType) == "undefined"){
                var iPadType = extension;
            }       
            
            if (docPath.toLowerCase().indexOf("http:") > -1 || docPath.toLowerCase().indexOf("https:") > -1){
    			window.location = "myapp:///" + docPath;
            }else{
	            for (var i=0;i<splitPath.length-1;i++){
	                newPath += (splitPath[i] + ".");
	            }
	            docPath = newPath;
	            docPath += iPadType;
	
	            //fix path for ios
				docPath=docPath.replace("./","/"); 
				console.info("docPath", docPath);
				window.location = "myapp:///" + docPath;
            }*/

           documentName=documentName.replace("./","/"); 
	       createDocumentFrame();
	       if (document.getElementById("documentFrame")){
				if (iPadType.toLowerCase() == "html"){
					document.getElementById("documentFrame").src = documentName;
				}else{
					document.getElementById("documentFrame").src = rootPath + "./iPadOpenDocument.html?file=" + documentName + "&type=" + iPadType.toLowerCase();				
				}
			}
	 		
			if (document.getElementById("documentDiv")){
				document.getElementById("documentDiv").style.display = "";
			}
		}
		else
		{
	        var newPath = "";
	        var splitPath = documentName.split(".");
	        // use the ipad type as the document type
	        var extension = splitPath[splitPath.length -1];
	        
	        if (typeof(iPadType) == "undefined"){
	            var iPadType = extension;
	        }       
	        
	        for (var i=0;i<splitPath.length-1;i++){
	            newPath += (splitPath[i] + ".");
	        }
	        documentName = newPath;
	        documentName += iPadType;

	        createDocumentFrame();
	
	 		if (document.getElementById("documentFrame")){
				if (iPadType.toLowerCase() == "html"){
					document.getElementById("documentFrame").src = documentName;
				}else{
					document.getElementById("documentFrame").src = "./iPadOpenDocument.html?file=" + documentName + "&type=" + iPadType.toLowerCase();				
				}
			}
	 		
			if (document.getElementById("documentDiv")){
				document.getElementById("documentDiv").style.display = "";
			}
	    }
		
	}
	else
	{
		var w = window.open(documentName, "docwin", "");
		w.focus();
	}
}

createDocumentFrame = function (){



    if (!document.getElementById("documentFrame")){		
		var docDiv = document.createElement("div");
		docDiv.id = "documentDiv";
		docDiv.name = "documentDiv";
		docDiv.style.position = "absolute";
		docDiv.style.zIndex = "99999";
		docDiv.style.top = "0";
		docDiv.style.left = "0";
		// width/height are reversed because app is landscaped on iPad
		
		docDiv.style.height = (screen.width - 20) + "px";
		docDiv.style.width = (screen.height - 20) + "px";

		// modifying the height and width to fit the screen 
		docDiv.style.height = "100%";
		docDiv.style.width = "100%";
		
		docDiv.style.background = "#ffffff";
		docDiv.style.display = "";
		docDiv.style.margin = "1px";
		docDiv.style.border = "1px solid gray";
		document.body.appendChild (docDiv);
		
		var innerDocDiv = document.createElement("div");
		innerDocDiv.style.width = "100%";
		innerDocDiv.style.textAlign = "right";
		innerDocDiv.style.paddingRight = "10px";
		innerDocDiv.style.height = "50px";
		docDiv.appendChild (innerDocDiv);
		 
		var stopLink = document.createElement("a");
		stopLink.href = "javascript:void(0)";
		stopLink.onclick = function (){
			document.body.style["overflow-y"] = "auto";
			document.getElementById('documentDiv').style.display='none';
			document.getElementById('documentFrame').src='./blank.html';
			return false;
		};
		stopLink.title = "Close";
		stopLink.innerHTML = '<img src="./resources/images/btn_close.png" border="0" style="position:relative;top:10px;right:10px;"></img>';
		innerDocDiv.appendChild(stopLink);
		
		var docFrame = document.createElement("iframe");
		docFrame.id = "documentFrame";
		docFrame.name = "documentFrame";
		docFrame.style.width = "100%";
		docFrame.style.height = "100%";
		docFrame.style.border = "0";
		docFrame.style.frameBorder = "0";
		docFrame.scrolling = "yes";
		docFrame.innerHTML = "Loading Document ...";
		docDiv.appendChild (docFrame);
		document.body.style["overflow-y"] = "hidden";
	}

};


