$(function () {
  //Let's build the map of dna/rna in localStorage first...
  buildBases('dna');
  buildBases('rna');
  var baseTypeElem = $('#baseType');
  //Initialize the drop down
  baseTypeElem.dropdown();
  //Hide the strand message on inital page load
  $(".strandMessage").hide();
  //Listen for drop down changes
  $("#baseType").on('click', function(event){
    var baseType = baseTypeElem.dropdown('get value');
    if(baseType.length > 0) {
      $('#base-input').prop('disabled', false);
    } else {
      $('#base-input').prop('disabled', true);
    }
  });
  //Listen for keystroke changes for the input field
  $('#base-input').prop('disabled', true);
  $('#base-input').on('keypress keyup', function (e) {
    var v = this.value.split("");
    var strand = "";
    var baseType = baseTypeElem.dropdown('get value').toLowerCase();
    //Loop through the splitted string and get the ASCII code for each character
    v.map(function (i) {
      var bases = getBases(baseType);
      strand += bases[i.charCodeAt(0)]; //Build our strand string
    });
    //Populate the strand message
    $("#strand").html(strand);
    //Populate strand message header
    $(".strandMessage").find(".header").html(`Your ${baseType.toUpperCase()} strand is...`);
    //Only show that strand message if the user types in something, otherwise hide it via CSS
    if (this.value.length > 0) {
      $(".strandMessage").show();
    } else {
      $(".strandMessage").hide();
    }
  });
  //Smooth scrolling
  $('.view-solution').click(function(){
    $('html, body').animate({
      scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 1000);
    return false;
  });
})

//Let's build our bases
function buildBases(type) {
  var bases = type === 'dna' ? ['A', 'T', 'G', 'C'] : ['A', 'U', 'G', 'C'];
  var updatedBases = [];
  var b = 0;
  // Create an array of ASCII numbers
  while (b <= 255) {
    //Do a random sort on the bases on each iteration
    var sortedBases = bases.sort(function (a, b) {
      return 0.5 - Math.random()
    });
    var base = sortedBases.join(""); //Turn that array into a string of characters (ex. TGAC)
    updatedBases.push(base);
    b++; //Update the counter
  }
  //Set the built bases array in localstorage
  setBases(type, updatedBases);
}

function setBases(key, collection) {
  if (localStorage) {
    localStorage.setItem(key, JSON.stringify(collection));
  }
}

function getBases(key) {
  if (localStorage) {
    return JSON.parse(localStorage.getItem(key));
  }
}