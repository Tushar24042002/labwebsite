// it makes a favourites meal array if its not exist in local storage
if (localStorage.getItem("favouritesList") == null) {
    localStorage.setItem("favouritesList", JSON.stringify([]));
}

// it fetches meals from api and return it
async function fetchMealsFromApi(url, value) {
    const response = await fetch(`${url + value}`);
    const meals = await response.json();
    return meals;
}



function homePage(){
    html = `
    <div class="page-wrap d-flex flex-row align-items-center mt-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-12 text-center">
                    <span class="display-2 d-block">Hello user</span>
                    <div class="mb-4 lead ">
                       <h4> Welcome to our Mini Meal World</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    document.getElementById("main").innerHTML = html;
}
homePage();




// it show's all meals card in main acording to search input value
function showMealList() {
    let inputValue = document.getElementById("my-search").value;
    document.getElementById("search-word").innerText = inputValue;
    let arr = JSON.parse(localStorage.getItem("favouritesList"));
    let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    let html = "";
    let meals = fetchMealsFromApi(url, inputValue);
    meals.then((data) => {
        if (data.meals) {
            data.meals.forEach((element) => {
                let isFav = false;
                for (let index = 0; index < arr.length; index++) {
                    if (arr[index] == element.idMeal) {
                        isFav = true;
                    }
                }
                if (isFav) {
                    html += `
                    <div class="col-lg-3 col-md-4 col-12">
                    <div id="foodli${element.idMeal}" class="foodbox card mb-3">
                    <div class="food-img"> 
                    <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                    </div>
               
                <div class="card-body px-0 pb-2">
                    <h5 class="card-title">${element.strMeal}</h5>
                    <div class="d-flex align-items-center justify-content-between mt-2">
                    <div class="category"><i class="fa-regular fa-fork-knife"></i> ${element.strCategory}</div>
                    <div class="category"><i class="fa-sharp fa-solid fa-location-dot"></i> ${element.strArea}</div>

                    </div>
                    <div class="d-flex justify-content-between mt-3">
                        <button type="button" class="btn btn-outline-light" onclick="showMealDetails(${element.idMeal})">More Details</button>
                        <button id="main${element.idMeal}" class="btn btn-outline-light fav-btn" onclick="addRemoveToFavList(${element.idMeal})"><i class="fa-solid fa-heart"></i></button>
                    </div>
                </div>
            </div>

                    </div>
                `;
                } else {
                    html += `
                    <div class="col-lg-3 col-md-4 col-12">
                    <div id="foodli${element.idMeal}" class="foodbox card mb-3" >
                    <div class="food-img"> 
                    <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                    </div>
               
                <div class="card-body px-0 pb-2">
                    <h5 class="card-title">${element.strMeal}</h5>
                    <div class="d-flex align-items-center justify-content-between mt-2">
                    <div class="category"><i class="fa-regular fa-fork-knife"></i> ${element.strCategory}</div>
                    <div class="category"><i class="fa-sharp fa-solid fa-location-dot"></i> ${element.strArea}</div>

                    </div>
                    <div class="d-flex justify-content-between mt-3">
                        <button type="button" class="btn btn-outline-light" onclick="showMealDetails(${element.idMeal})">More Details</button>
                        <button id="main${element.idMeal}" class="btn btn-outline-light fav-btn" onclick="addRemoveToFavList(${element.idMeal})"><i class="fa-solid fa-heart"></i></button>
                    </div>
                </div>
            </div>

                    </div>
              
                `;
                }
            });
        } else {
            html += `
            <div class="page-wrap d-flex flex-row align-items-center">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-12 text-center">
                            <span class="display-1 d-block">404</span>
                            <div class="mb-4 lead">
                                The meal you are looking for was not found.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
        document.getElementById("main").innerHTML = html;
    });
}

//it  shows full meal details in main
async function showMealDetails(id) {
    let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
    let html = "";
    await fetchMealsFromApi(url, id).then((data) => {
        let Totalingredients ="";
// ingredients
Totalingredients += data.meals[0].strIngredient1+ ` (${data.meals[0].strMeasure1})`+", " +data.meals[0].strIngredient2 + ` (${data.meals[0].strMeasure2})`+", "+data.meals[0].strIngredient3 + ` (${data.meals[0].strMeasure3})`+", "+data.meals[0].strIngredient4 + ` (${data.meals[0].strMeasure4})`+", "+data.meals[0].strIngredient5 + ` (${data.meals[0].strMeasure5})`+", "+data.meals[0].strIngredient6 + ` (${data.meals[0].strMeasure6})`+", "+data.meals[0].strIngredient7 + ` (${data.meals[0].strMeasure7})`+", "+data.meals[0].strIngredient8 + ` (${data.meals[0].strMeasure8})`+", "+data.meals[0].strIngredient9 + ` (${data.meals[0].strMeasure9})`+", "+data.meals[0].strIngredient10+` (${data.meals[0].strMeasure10})`+", "+data.meals[0].strIngredient11+` (${data.meals[0].strMeasure11})`+", " +data.meals[0].strIngredient12+` (${data.meals[0].strMeasure12})`+", "+data.meals[0].strIngredient13+` (${data.meals[0].strMeasure13})`+", "+data.meals[0].strIngredient14+` (${data.meals[0].strMeasure14})`+", "+data.meals[0].strIngredient15+` (${data.meals[0].strMeasure15})`+", "+data.meals[0].strIngredient16+` (${data.meals[0].strMeasure16})`+", "+data.meals[0].strIngredient17+` (${data.meals[0].strMeasure17})`+", "+data.meals[0].strIngredient18+` (${data.meals[0].strMeasure18})`+", "+data.meals[0].strIngredient19+` (${data.meals[0].strMeasure19})`+", "+data.meals[0].strIngredient20+` (${data.meals[0].strMeasure20})`;

var ingredientArr = Totalingredients.split(",");

var finalListIngredients = "";
for(let i =0; i< ingredientArr.length;i++){
if(!ingredientArr[i].includes("null") && ingredientArr[i].length > 6){
    finalListIngredients += ingredientArr[i];
}
if(i+1 < ingredientArr.length){
    if(!ingredientArr[i+1].includes("null") && ingredientArr[i+1].length > 6){
        finalListIngredients +=", ";
    }
}

}
// var ingredients = finalListIngredients.replace(/ /g, ', ');
// console.log();

        html += `
          <div id="meal-details" class="mb-5">
            <div id="meal-header" class="d-flex justify-content-around flex-wrap">
              <div id="meal-thumbail">
                <img class="mb-2" src="${data.meals[0].strMealThumb}" alt="" srcset="">
              </div>
              <div id="details">
                <h3>${data.meals[0].strMeal}</h3>
                <h6>Category : ${data.meals[0].strCategory}</h6>
                <h6>Area : ${data.meals[0].strArea}</h6>
              </div>
            </div>
            <div id="meal-ingredients" class="mt-3">
            <p><span>Ingredients : </span>${finalListIngredients}</p>
          </div>
          <hr/>
            <div id="meal-instruction" class="mt-3">
              <h5>Instruction :</h5>
              <p>${data.meals[0].strInstructions}</p>
            </div>
            <div class="text-center">
              <a href="${data.meals[0].strYoutube}" target="_blank" class="btn btn-outline-light mt-3">Watch Video</a>
            </div>
          </div>
        `;
    });
    document.getElementById("main").innerHTML = html;
}

// it shows all favourites meals in favourites body
async function showFavMealList() {
    let arr = JSON.parse(localStorage.getItem("favouritesList"));
    let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
    let html = "";
    if (arr.length == 0) {
        html += `
            <div class="page-wrap d-flex flex-row align-items-center">
                <div class="container" id="emptyfav">
                    <div class="row justify-content-center">
                        <div class="col-md-12 text-center">
                            <span class="display-1 d-block">404</span>
                            <div class="mb-4 lead">
                                No meal added in your favourites list.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
    } else {
        for (let index = 0; index < arr.length; index++) {
            await fetchMealsFromApi(url, arr[index]).then((data) => {
                html += `
                <div id="favLi${data.meals[0].idMeal}" class="foodbox card mb-3" style="width: 20rem;">
                <div class="food-img">
                    <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="...">
                    </div>
                    <div class="card-body px-0">
                        <h5 class="card-title">${data.meals[0].strMeal}</h5>
                        <div class="d-flex align-items-center justify-content-between mt-2">
                    <div class="category"><i class="fa-regular fa-fork-knife"></i> ${data.meals[0].strCategory}</div>
                    <div class="category"><i class="fa-sharp fa-solid fa-location-dot"></i> ${data.meals[0].strArea}</div>

                    </div>
                        <div class="d-flex justify-content-between mt-3">
                            <button type="button" class="btn btn-outline-light" onclick="showMealDetails(${data.meals[0].idMeal})">More Details</button>
                            <button id="main${data.meals[0].idMeal}" class="btn btn-outline-light fav-btn active" onclick="addRemoveToFavList(${data.meals[0].idMeal})" ><i class="fa-solid fa-heart"></i></button>
                        </div>
                    </div>
                </div>
                `;
            });
        }
    }
    document.getElementById("favourites-body").innerHTML = html;
}
document.getElementById("addAlert").style.display = "none";
document.getElementById("removeAlert").style.display = "none";
//it adds and remove meals to favourites list
function addRemoveToFavList(id) {
    let arr = JSON.parse(localStorage.getItem("favouritesList"));
    let contain = false;
    for (let index = 0; index < arr.length; index++) {
        if (id == arr[index]) {
            contain = true;
        }
    }
    if (contain) {
        let number = arr.indexOf(id);
        arr.splice(number, 1);
        document.getElementById("removeAlert").style.display = "block";
        setTimeout(offFavRemove, 2000);
        function offFavRemove(){
            document.getElementById("removeAlert").style.display = "none";
        }
        // alert("your meal removed from your favourites list");
    } else {
        arr.push(id);
        document.getElementById("addAlert").style.display = "block";
        setTimeout(offFav, 2000);
        function offFav(){
            document.getElementById("addAlert").style.display = "none";
        }
        // alert("your meal add your favourites list");
    }
    localStorage.setItem("favouritesList", JSON.stringify(arr));
    showMealList();
    showFavMealList();
}



function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }
  
  /*An array containing all the country names in the world:*/
  var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
  
  /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
  autocomplete(document.getElementById("my-search"), countries);