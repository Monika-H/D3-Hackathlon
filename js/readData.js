function readDataTable(filename, patientLabel) {

    d3.csv(filename, function(error, inData) {

        var uniqueIds,
            patientIds,
            lookup;

        if (error) {
            console.log(error);
        } else {
            patientIds = [];
            for (var i = 0; i < inData.length; i++) {
                patientIds.push(inData[i][patientLabel]);
            }
            uniqueIds = patientIds.filter(function(itm, i, array) {
                                        return i == patientIds.indexOf(itm);
                                     });

            dataset = new Array(uniqueIds.length);
            lookup = new Array(uniqueIds.length);
            for (var i = 0; i < uniqueIds.length; i++) {
                lookup[uniqueIds[i]] = i;
                dataset[i] = new Array();
            }
            for (var i = 0; i < inData.length; i++) {
                dataset[lookup[inData[i].subject]].push(inData[i]);
            }
        }
        initialize();
    });
}