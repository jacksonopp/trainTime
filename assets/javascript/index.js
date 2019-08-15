function getTrainData(cb) {
    localforage.getItem("train-data").then(function (result) {
        cb(result || []); //{fill in with example info later}
    });
}

function setTrainData(newTrainData, cb) {
    localforage.setItem("train-data", newTrainData).then(cb);
}

function handleTrainData(newTrainName, newDestination, newFrequency, newFirstTrain, newNextArrival, newMinutesAway) {
    
    getTrainData(function (trainData) {
                
        trainData.push({
            trainName: newTrainName,
            destination: newDestination,
            frequency: newFrequency,
            firstTrain: newFirstTrain,
            nextArrival: newNextArrival,
            minutesAway: newMinutesAway
        });
        console.log(trainData);
        setTrainData(trainData, updateTrainData);
    });
}

//click button to add data
function addData() {
    document.getElementById("submitButton").addEventListener("click", function(event) {
        const trainName = document.getElementById("train-name").value;
        const destination = document.getElementById("destination").value;
        const frequency = document.getElementById("frequency").value;
        const firstTrainTime = document.getElementById("first-train-time").value;
        
        function nextArrivalFunc() {
            let tFrequency = frequency;
            let tFirstTrain = firstTrainTime;
            let firstTrainConverted = moment(tFirstTrain, "HH:mm").subtract(1, "years");
            let timeDiff = moment().diff(moment(firstTrainConverted), "minutes");
            let timeApart = timeDiff % tFrequency;
            let minutesAway = tFrequency - timeApart;
            return minutesAway;
        };
        
        const nextArrival = nextArrivalFunc();

        function minutesAwayFunc() {
            let tFrequency = frequency;
            let tFirstTrain = firstTrainTime;
            let firstTrainConverted = moment(tFirstTrain, "HH:mm").subtract(1, "years");
            let timeDiff = moment().diff(moment(firstTrainConverted), "minutes");
            let timeApart = timeDiff % tFrequency;
            let minutesAway = tFrequency - timeApart;
            let nextArrivalObj = moment().add(minutesAway, "minutes");
            let nextArrival = moment(nextArrivalObj).format("HH:mm");
            return nextArrival;
        }

        minutesAwayFunc();
        const minutesAway = minutesAwayFunc();
        
        handleTrainData(trainName, destination, frequency, firstTrainTime, nextArrival, minutesAway);
        console.log("addData trigger");
    })
}

addData();


function updateTrainData() {
    //get container where data is supposed to go
    const trainTableBody = document.getElementById("train-table-body");

    //create element for data
    const trainTR = document.createElement("tr");
    //populate element with data
    getTrainData(function(trainData) {
        //do stuff
        const trainNameTD = document.createElement("td");
        const destinationTD = document.createElement("td");
        const frequencyTD = document.createElement("td");
        const nextArrival = document.createElement("td");
        const minutesAwayTD = document.createElement("td");

        //get new train data
        let train = trainData[trainData.length - 1];
        
        //populate with info
        trainNameTD.innerText = train.trainName;
        destinationTD.innerText = train.destination;
        frequencyTD.innerText = train.freq;
        nextArrival.innerText = train.nextArrival;
        minutesAwayTD.innerText = train.minutesAway;

        //append td to tr
        trainTR.append(trainNameTD);
        trainTR.append(destinationTD);
        trainTR.append(frequencyTD);
        trainTR.append(nextArrival);
        trainTR.append(minutesAwayTD);

        // append tr to table body
        trainTableBody.append(trainTR);
    })

    //append element ot container
}

function renderTrainData() {
    // console.log("timer test")
    const trainTableBody = document.getElementById("train-table-body");
    getTrainData(function(trainData) {
        // console.log(trainData);
        trainTableBody.innerHTML = "";
        for (let i = 0; i < trainData.length; i++) {
            // console.log("train data at",i,trainData[i]);
            const trainTR = document.createElement("tr");
            const trainNameTD = document.createElement("td");
            const destinationTD = document.createElement("td");
            const frequencyTD = document.createElement("td");
            const nextArrivalTD = document.createElement("td");
            const minutesAwayTD = document.createElement("td");

            let train = trainData[i];

            //populate with info
            trainNameTD.innerText = train.trainName;
            destinationTD.innerText = train.destination;
            frequencyTD.innerText = train.frequency;
            nextArrivalTD.innerText = train.nextArrival;
            minutesAwayTD.innerText = train.minutesAway;

            //append td to tr
            trainTR.append(trainNameTD);
            trainTR.append(destinationTD);
            trainTR.append(frequencyTD);
            trainTR.append(nextArrivalTD);
            trainTR.append(minutesAwayTD);

            // append tr to table body
            trainTableBody.append(trainTR);
        }
    })
}

renderTrainData();

let renderUpdate = setInterval(renderTrainData, 500);
// let timeUpdate = setInterval(updateTrainTimes, 10000);

function updateTrainTimes() {
    let minutesAway;

    getTrainData(function (result) {
        for (let i = 0; i < result.length; i++) {
            let frequency = result[i].frequency //result[i].frequency;
            let firstTrain = result[i].firstTrain;
            console.log("first train: ",firstTrain);
            let firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
            console.log(firstTrainConverted);
            let diffTime = moment().diff(moment(firstTrainConverted), "minutes");
            console.log("DIFFERENCE IN TIME: " + diffTime);
            let timeApart = diffTime % frequency;
            console.log(timeApart);
            let minutesAway = frequency - timeApart;
            console.log("MINUTES TILL TRAIN: " + minutesAway);
            let nextArrival = moment().add(minutesAway, "minutes");
            console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

            return minutesAway;
        }
    })
}