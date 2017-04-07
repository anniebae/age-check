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
  // localStorage.clear();

  storeBirthday();
  birthdayString();
  console.log('onload: ' + age);

  clearBirthdayValidation();

  if (age >= 21) {
    location.href="http://brooklynbrewery.com/"
  }

  $('#enter-btn').click(function() {
    birthdayString();
    validateAge();

    if ($('#checkbox-1').is(':checked')) {
        storeBirthday()
        birthdayString();
    } else {
      localStorage.clear();
    }
  });
});


// get birthday of entered DOB
function birthdayString() {
  getYear();
  getMonth();
  getDay();
  birthday = (year+month+day);

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


// age of entered DOB
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

  // console.log("age: " + age);
}

// age validation
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

function clearBirthdayValidation() {
  $('.emptyYear').css('display', 'none');
  $('.emptyMonth').css('display', 'none');
  $('.emptyDay').css('display', 'none');
}

function clearValidation() {
  $('.validationMessage .success').css('display', 'none');
  $('.validationMessage .invalid').css('display', 'none');
}


// store birthday for remember me
function storeBirthday() {
  storeYear();
  storeMonth();
  storeDay();
}

function storeYear() {
  $('#DOBYear').change(function() {
    localStorage.setItem('yearStored', this.value);
  });
  if(localStorage.getItem('yearStored')){
    $('#DOBYear').val(localStorage.getItem('yearStored'));
  }
}

function storeMonth() {
  $('#DOBMonth').change(function() {
    localStorage.setItem('monthStored', this.value);
  });
  if(localStorage.getItem('monthStored')){
    $('#DOBMonth').val(localStorage.getItem('monthStored'));
  }
}

function storeDay() {
  $('#DOBDay').change(function() {
    localStorage.setItem('dayStored', this.value);
  });
  if(localStorage.getItem('dayStored')){
    $('#DOBDay').val(localStorage.getItem('dayStored'));
  }
}