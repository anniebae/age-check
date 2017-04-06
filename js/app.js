// Global variables
var month,
    day,
    year,
    birthday,
    birthDateStr,
    age,
    parts,
    dateObj

$(function() {
  $("#enter-btn").click(function() {
    birthdayString();
    validateAge();
  })
});

function birthdayString() {
  getYear();
  getMonth();
  getDay();
  birthday = (year+month+day);
  console.log(`birthday: ${birthday}`);

  if (birthday.match(/[a-z]/i)) {
    return false;
  }

  birthDateStr = '' + birthday,
    parts = birthDateStr.match(/(\d{4})(\d{2})(\d{2})/),
    dateObj = new Date(parts[1], parts[2]-1, parts[3]); // months 0-based!

  getAge(dateObj);
}

function getYear() {
  year = $("#DOBYear").val();

  if (year === "no-year") {
    $('.emptyYear').css('display', 'block');
  }
  $('#DOBYear').change(function(){
      $('.emptyYear').css('display', 'none');
      clearValidation();
  });
}

function getMonth() {
  month = $("#DOBMonth").val();
  
  if (month === "no-month") {
    $('.emptyMonth').css('display', 'block');
  }
   $('#DOBMonth').change(function(){
      $('.emptyMonth').css('display', 'none');
      clearValidation();
  });
}

function getDay() {
  day = $("#DOBDay").val();

  if (day === "no-day") {
    $('.emptyDay').css('display', 'block');
  }
  $('#DOBDay').change(function(){
      $('.emptyDay').css('display', 'none');
      clearValidation();
  });
}

function getAge(birthDate) {
  var now = new Date();

  function isLeap(year) {
    return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
  }

  var days = Math.floor((now.getTime() - birthDate.getTime())/1000/60/60/24);
      age = 0;

  for (var y = birthDate.getFullYear(); y <= now.getFullYear(); y++){
    var daysInYear = isLeap(y) ? 366 : 365;
    if (days >= daysInYear){
      days -= daysInYear;
      age++;
    }
  }
}

function validateAge() {
  if (age >= 21) {
    $('.validationMessage .success').css('display', 'block');
    $('.validationMessage .invalid').css('display', 'none');
    setTimeout(function(){
      location.href="http://brooklynbrewery.com/"
    }, 1500);
  }

  if (age < 21) {
    $('.validationMessage .success').css('display', 'none');
    $('.validationMessage .invalid').css('display', 'block');
  }
}

function clearValidation() {
  $('.validationMessage .success').css('display', 'none');
  $('.validationMessage .invalid').css('display', 'none');
}