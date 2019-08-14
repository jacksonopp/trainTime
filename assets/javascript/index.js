function getTrainData(cb) {
    localforage.getItem("train-data").then(function (result) {
        cb(result || []); //{fill in with example info later}
    });
}

function setTrainData(newTrainData, cb) {
    localforage.setItem("train-data", newTrainData).then(cb);
}

function handleTrainData(newTrainName, newDestination, newFrequency, newFirstTrain) {
    getTrainData(function (trainData) {
        trainData.push({
            trainName: newTrainName,
            destination: newDestination,
            frequency: newFrequency,
            newFirstTrain: newFirstTrain
        });
        console.log(trainData);
        setTrainData(trainData, updateTrainData);
    });
}

function addData() {
    document.getElementById("submitButton").addEventListener("click", function(event) {
        const trainName = document.getElementById("train-name").value;
        const destination = document.getElementById("destination").value;
        const frequency = document.getElementById("frequency").value;
        const firstTrainTime = document.getElementById("first-train-time").value;
        handleTrainData(trainName, destination, frequency, firstTrainTime);
        console.log("addData trigger");
    })
}

addData();

function calculations(){
    
}

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
        nextArrival.innerText = "some text here";
        minutesAwayTD.innerText = "some text here";

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
// displayHighScores();

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
            nextArrivalTD.innerText = "some text here";
            minutesAwayTD.innerText = "some text here";

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

