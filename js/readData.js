function readDataTable(filename, patientLabel) {

    d3.csv(filename, function(error, inData) {

        var uniqueIds,
            patientIds;

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
            for (var i = 0; i < uniqueIds.length; i++) {
                dataset[uniqueIds[i]] = new Array();
            }
            for (var i = 0; i < inData.length; i++) {
                dataset[inData[i].subject].push(inData[i]);
            }
        }
        initialize();
    });
}