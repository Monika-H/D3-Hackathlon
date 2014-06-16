

subject <- round((runif(100) + 1)*1000000)

age <- round(rnorm(100,59,10))

set.gender <- function(item) {
	if (item <= 0.6) {
		 "male"
	} else {
		"female"
	}
}

gender <- sapply(runif(100),set.gender)

visit <- rep(1,times=100)
day <- rep(1,times=100)

daily_insulin_dose <- rnorm(100,90,30)

weight <- rnorm(100,101,16)

bmi <- rnorm(100,35,4)

height.squared <- weight/bmi

hemoglobin_HbA1c_percent <- exp(rnorm(100,log(9.4),log(1.3)))

fasting_plasma_glucose <- rnorm(100,165,50)

postprandial_glucose <- rnorm(100,315,60)

systolic_blood_pressure <- rnorm(100,127,14)

diastolic_blood_pressure <- rnorm(100,80,9)

check.bloodpressure <- function(dias,sys) {
	if((sys-dias) < 30) {
		sys-30
	} else {
		dias
	}
}

diastolic_blood_pressure <- mapply(check.bloodpressure,diastolic_blood_pressure,systolic_blood_pressure)


visit1 <- data.frame(subject,visit,day,age,gender,daily_insulin_dose,weight,
bmi,hemoglobin_HbA1c_percent,fasting_plasma_glucose,postprandial_glucose,
systolic_blood_pressure,diastolic_blood_pressure)

change.over.time <- function(item) {
	item["weight"] <- item["weight"] + (runif(100)-0.7)*1.3
	item["bmi"] <- item["weight"]/height.squared 
	item["hemoglobin_HbA1c_percent"] <- item["hemoglobin_HbA1c_percent"] + (runif(100)-0.7)*0.3
	item["fasting_plasma_glucose"] <- item["fasting_plasma_glucose"] + (runif(100)-0.7)*9
	item["postprandial_glucose"] <- item["postprandial_glucose"] + (runif(100)-0.7)*12
	item["systolic_blood_pressure"] <- item["systolic_blood_pressure"] + (runif(100)-0.7)*0.5
	item["diastolic_blood_pressure"] <- item["diastolic_blood_pressure"] + (runif(100)-0.7)*0.5
  item
}

change.over.time.less <- function(item) {
  item["weight"] <- item["weight"] + (runif(100)-0.7)*0.7
  item["bmi"] <- item["weight"]/height.squared 
  item["hemoglobin_HbA1c_percent"] <- item["hemoglobin_HbA1c_percent"] + (runif(100)-0.7)*0.1
  item["fasting_plasma_glucose"] <- item["fasting_plasma_glucose"] + (runif(100)-0.7)*7
  item["postprandial_glucose"] <- item["postprandial_glucose"] + (runif(100)-0.7)*9
  item["systolic_blood_pressure"] <- item["systolic_blood_pressure"] + (runif(100)-0.7)*0.3
  item["diastolic_blood_pressure"] <- item["diastolic_blood_pressure"] + (runif(100)-0.7)*0.3
  item
}

nextPeriod <- visit1
visit2 <- rbind(change.over.time(nextPeriod[1:50,]),change.over.time.less(nextPeriod[51:100,]))
visit2["day"] <- 30 + round((runif(100)-0.5)*6)
visit2["visit"] <- 2

nextPeriod <- visit2
visit3 <- rbind(change.over.time(nextPeriod[1:50,]),change.over.time.less(nextPeriod[51:100,]))
visit3["day"] <- 60 + round((runif(100)-0.5)*6)
visit3["visit"] <- 3

nextPeriod <- visit3
visit4 <- rbind(change.over.time(nextPeriod[1:50,]),change.over.time.less(nextPeriod[51:100,]))
visit4["day"] <- 90 + round((runif(100)-0.5)*6)
visit4["visit"] <- 4

nextPeriod <- visit4
visit5 <- rbind(change.over.time(nextPeriod[1:50,]),change.over.time.less(nextPeriod[51:100,]))
visit5["day"] <- 120 + round((runif(100)-0.5)*6)
visit5["visit"] <- 5

nextPeriod <- visit5
visit6 <- rbind(change.over.time(nextPeriod[1:50,]),change.over.time.less(nextPeriod[51:100,]))
visit6["day"] <- 150 + round((runif(100)-0.5)*6)
visit6["visit"] <- 6

nextPeriod <- visit6
visit7 <- rbind(change.over.time(nextPeriod[1:50,]),change.over.time.less(nextPeriod[51:100,]))
visit7["day"] <- 180 + round((runif(100)-0.5)*6)
visit7["visit"] <- 7

nextPeriod <- visit7
visit8 <- rbind(change.over.time(nextPeriod[1:50,]),change.over.time.less(nextPeriod[51:100,]))
visit8["day"] <- 210 + round((runif(100)-0.5)*6)
visit8["visit"] <- 8

nextPeriod <- visit8
visit9 <- rbind(change.over.time(nextPeriod[1:50,]),change.over.time.less(nextPeriod[51:100,]))
visit9["day"] <- 240 + round((runif(100)-0.5)*6)
visit9["visit"] <- 9

nextPeriod <- visit9
visit10 <- rbind(change.over.time(nextPeriod[1:50,]),change.over.time.less(nextPeriod[51:100,]))
visit10["day"] <- 270 + round((runif(100)-0.5)*6)
visit10["visit"] <- 10

data <- rbind(visit1,visit2,visit3,visit4,visit5,visit6,visit7,visit8,visit9,visit10)
data.ordered <- data[order(data[,"subject"],data[,"visit"]),]

setwd("Hackathlon")
write.csv(data,"Hackathlon_Data.csv")