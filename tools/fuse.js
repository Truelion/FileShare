importPackage(java.io);
importPackage(java.net);
importPackage(java.util);
importPackage(java.lang);


var Fuse = {
	File: function(filepath){
      	var file = new File(filepath);
        return file;
    },

    Tie : function(file){
    	var html = Fuse.Read(file);
    		html = html.replace("</head>", "test</head>");
    		return html;
    	print("HTML:\n" + html);
    },

    Read: function(file){
        var stream, line, lineno, lines = [];
        if (!BufferedReader || !FileReader) {
            throw new Error("This operation requires Mozilla Rhino.");
        }
        stream = new BufferedReader(new FileReader(file));
        lineno = 1;
        while ((line = stream.readLine()) !== null) {
            lines.push(line);
        }
        stream.close();
        return lines.join("\n");
    },

    Save : function(filepath, html){
    	print("SAVING:\n" + html);
    	var directory, stream;
        if (!File || !BufferedWriter || !FileWriter) {
            throw new Error("This operation requires Mozilla Rhino.");
        }
        var destination = new File(filepath).getCanonicalFile();

        stream = new BufferedWriter(new FileWriter(destination));
        stream.write(html);
        stream.close();
        return true;
    }
};


function main(p) {
	try{ 
		var filepath = arguments[0]+"/index_Employee_en-US.html";
		var file = Fuse.File(filepath);
		if(file && file.isFile()){
			var newcode = Fuse.Tie(file);
			Fuse.Save(filepath, newcode);
		} else {
			print(file);
		}
	} catch(e) {
		print("FUSE ERROR:\n" + e.message);
	}
};

main(arguments[0]);