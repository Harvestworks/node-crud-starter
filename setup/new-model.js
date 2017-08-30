let interactiveScript = require('interactive-script');
let colors = require('colors');
let fs = require('fs');
let path = require('path');

let columnNames = [];
let schema = {}; 

interactiveScript (async (say, ask) => {

    say("------------------------------------------------".yellow);
    say("  Hello, welcome to the ".yellow + "Database Models".rainbow +  " setup.".yellow);
    say("                     c. 2017".yellow + " Harvestworks".red.bold);
    say("------------------------------------------------".yellow);
    say("");

    let getDBName = true;
    let dbname = '';
    while (getDBName) {
        dbname = await ask("Please enter your database name > ");
        let confirmDBName = true;
        while (confirmDBName) {
            conf = await ask("Your database model name is: " + dbname + " (Y|n)");
            confirmDBName = !confirmThis(conf);
        }
        getDBName = !confirmThis(conf, false);
    }

    dbname = dbname.replace(/\ /g, "_");
    let doYouWantToAddAnotherColumn = true;
    let columnCount = 1;
    while (doYouWantToAddAnotherColumn) {

        let column = await getValue("Please enter the value for column #" + columnCount + " >", (x) => {
            const valid = (typeof(x) == "string");
            if (!valid) {
                say("invalid input, it should be a string");
            }
            return valid;
        });
        columnNames.push(column);
        let datatype = await getValue("Please enter the data type for this column (String, Number, Date, Buffer, Boolean, Mixed, Objectid, Array) >", (x) => {
            const valid = ["String","Number","Date","Buffer","Boolean", "Mixed", "Objectid", "Array"].includes(x);
            if (!valid) {
                say("invalid input. It should be one of the following: String, Number, Date, Buffer, Boolean, Mixed, Objectid, Array");
            }
            return valid;
        });
        let isRequired = await getValue("Is this column required? (Y|n)", confirmThis);
        isRequired = confirmThis(isRequired, false); // convert yes | No to true | false
        schema[column] = {type: datatype, required: isRequired};

        let getAnother = true;
        while (getAnother) {
            ans = await ask("Would you like to add another column? (Y|n)");
            getAnother = !confirmThis(ans);
        }
        columnCount += 1;
        doYouWantToAddAnotherColumn = confirmThis(ans, false);

    }

    say("Your database has the following column names:");
    say(JSON.stringify(schema));
    conf = await ask("Is this correct? (Y|n)");

    // Write Files
    if (confirmThis(conf, false)) {
        say("creating database schema...".green);
        const schemaPath = path.join(__dirname + "/../Models/");
        const file = "const mongoose = require('mongoose');\n" +
                    "module.exports = new mongoose.Schema(" +
                    JSON.stringify(schema).replace(/\"/g, "") + "\n" +
                    ");";
        fs.writeFileSync(schemaPath + dbname + "Model.js", file);
        say("database created");

        say("setting config variables".green);
        const configPath = path.join(__dirname + "/../config.js");
        const configContents = "module.exports ={\n" +
            "    modelName: '" + dbname + "',\n" +
            "    columnNames: " + JSON.stringify(columnNames) + "\n" + "};";
        fs.writeFileSync(configPath, configContents);
        say("complete!!".rainbow);
    } else {
        say("uh oh!  Please start over");
    }

    function confirmThis(conf, reask=true) {
        
        conf = conf.toLowerCase();
        let result = true;

        if (conf === "y" || conf === "yes") {
            result = true;
        } else if (conf === "n" || conf === "no") {
            result = reask;
        } else {
            say("uh... what?");
            result = false;
        }
        return result;
    }

    async function getValue(question, validate) {

        var thing;
        let getThisThing = true;

        while (getThisThing) {
            thing = await ask(question);
            getThisThing = !validate(thing); // if valid, don't getThisThing
        }
        return thing;
    }

});

