function readDataTable(filename, patientLabel) {

    d3.csv(filename,
        function(d) {
	      return{
		 subject: d.subject,
		visit: +d.visit,
		day: +d.day,
		age: +d.age,
		gender: d.gender,
		daily_insulin_dose: +d.daily_insulin_dose,
		 weight: +d.weight,
		bmi: +d.bmi,
		hemoglobin_HbA1c_percent: +d.hemoglobin_HbA1c_percent,
		fasting_plasma_glucose: +d.fasting_plasma_glucose,
		postprandial_glucose: +d.postprandial_glucose,
		systolic_blood_pressure: +d.systolic_blood_pressure,
		 diastolic_blood_pressure: +d.diastolic_blood_pressure
	};},
		function(error, inData) {

        var uniqueIds,
            patientIds,
            lookup;

        if (error) {
            console.log(error);
        } else {
			inData = inData.sort(function(a,b) {return (Number(a.visit) - Number(b.visit));});

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