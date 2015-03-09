//jQuery
$(document).ready(function() {
    $("#analizar").click(function() {
        analizar();
    });
});

function analizar(){
    var csv_text = document.getElementById("csv_text").value;
    
    //local storage 
    if(window.localStorage)
        localStorage.csv_text = csv_text;
        
    var regexp = /\s*"((?:[^"\\]|\\.)*)"\s*,?|\s*([^,]+),?|\s*,/g;
    var lines = csv_text.split(/\n+\s*/);
    var html_text = [];
    //underscore
    var row = "<% _.each(item, function(cell){%>"+ 
              "<td><%=cell%></td>"+    
              "<%}); %>";
    
    for (var i in lines){
        var matching = lines[i].match(regexp);
        var t_row = []; //treated row
        if(matching){
            for(var j in matching){
                var value = matching[j].replace(/,\s*$/,''); //remove comma
                value = value.replace(/^\s*"/,''); //remote first quote
                value = value.replace(/"\s*$/,''); //remote last quote
                value = value.replace(/\\"/,'"'); //remove scaped quotes
                t_row.push(value);
            }
            //underscore
            html_text.push('<tr>' + _.template(row, {item : t_row}) + '</tr>');
        }else{
            alert("Invalid CSV format!");
        }
    }
    html_text.unshift('<table class="table table-bordered">');
    html_text.push('</table>');
    document.getElementById("tabla").innerHTML = html_text.join('\n');
};

//check localStorage
window.onload = function() {
    if (window.localStorage && localStorage.csv_text) {
        document.getElementById("csv_text").value = localStorage.csv_text;
    }
};