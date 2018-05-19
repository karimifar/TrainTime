

var config = {
    apiKey: "AIzaSyCCmCaiPYuToHxg5wUWHgsqMwLaSCMdH1g",
    authDomain: "train-time-em.firebaseapp.com",
    databaseURL: "https://train-time-em.firebaseio.com",
    projectId: "train-time-em",
    storageBucket: "train-time-em.appspot.com",
    messagingSenderId: "913475075505"
  };
  firebase.initializeApp(config);
  

  var database = firebase.database();
  var tableBody = $("#table-body");

  $(".modal-content").on("click","#close-modal", function(e){
    e.preventDefault();
    $('#myModal').modal('hide')
  })

  $("#submit-btn").on("click", function(e){
    e.preventDefault();
    var name=$("#name-input").val().trim();
    var dest=$("#dest-input").val().trim();
    var firstTime= moment($("#firstTime-input").val().trim(), "HH:mm").format("HH:mm");
    var freq=$("#freq-input").val().trim();

    if(name==="" || dest ==="" || firstTime==="" || freq ===""){
      $('#myModal').modal({
        show: true})
        return;
    }
    console.log(firstTime);
    var newTrain={
        trainName: name,
        trainDest: dest,
        trainFirstTime: firstTime,
        trainFreq: freq
    }

    database.ref().push(newTrain)
    $("#name-input").text("");
    $("#dest-input").text("");
    $("#firstTime-input").text("");
    $("#freq-input").text("");

  })

  database.ref().on("child_added", function(newChild){
    var currentTime=moment(moment()).format("HH:mm");
    var firstTimeConverted= moment(newChild.val().trainFirstTime, "HH:mm").subtract(1,"days");
    var timeDiff= moment().diff( moment(firstTimeConverted, "HH:mm"), "minutes");
    var nextTrain=  parseInt(newChild.val().trainFreq) - timeDiff % parseInt(newChild.val().trainFreq)
    var arrivalTime=  moment(moment().add(nextTrain, "minutes")).format("HH:mm")
    var tableRow = $("<tr class='table-row'>"+ "<td class='table-data bold-td'>" + newChild.val().trainName + "</td>" + "<td class='table-data'>" + newChild.val().trainDest + "</td>"+ "<td class='table-data'>" + newChild.val().trainFreq + "</td>" + "<td class='table-data arrive'>" + arrivalTime + "</td class='table-data'>" + "<td class='table-data next'>" + nextTrain + "</td>"+"</tr>" )

    tableBody.append(tableRow)
    TweenMax.staggerFromTo(".table-row", 0.5, { x:20, opacity:0},{x:0, opacity:1}, 0.3);

    
    console.log(newChild.val().trainName);
    console.log(timeDiff);
    console.log(newChild.val().trainFirstTime);
    console.log(currentTime);
    console.log(nextTrain);
    console.log(arrivalTime);
    

  })

  function animate(){

  }
