data <- read.delim("/Volumes/KINGSTON/Hackathlon/data8patients.txt")
patientData <- data.frame()
for (pat in seq(1, 8, by=1) ) {
  patientData[pat] = data[which(data$Patient==pat&data$Year==0),3:dim(data)[2]]
  for (year in seq(1, 10, by=1) ) {
    patientData[pat] = cbind(patientData[pat],
                             data[which(data$Patient==pat&data$Year==year),3:dim(data)[2]])
}
}

