(function() {
    /*   *   *   *   *   *   *   *
     * Get these values from script or config.js
     */

    const dbname = "Default";
    const colNames = ["Name", "Date", "Fact", "Other Thing"];

    // const config = require('../config.js');
    // const dbname = config.modelName;
    // const colNames = config.columnNames;
    /*   *   *   *   *   *   *   */
    
    $("#title").text(dbname);
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

        let table = "<thead><tr>";
        colNames.forEach(function(n) {
            table += "<th>" + n + "</th>";
        });
        table += "</thead></tr>";
        table += "<tbody>";

        data.forEach(function(r) {
            table += createRow(r);
        });
        table += "</tbody>";

        $("#data").append(table);
    });

})();
