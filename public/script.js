(function() {
    
    const url = "/api/v1/" + dbname;

    function createRow(row) {
        let html = "<tr>";
        colNames.forEach(function(c) {
            html += "<td>" + row[c] + "</td>";
        });
        html += "</tr>";
        return html;
    }

    $.getJSON(url, function(data) {

        let table = "";
        data.forEach(function(r) {
            table += createRow(r);
        });
        $("#data").append(table);
    });

})();
