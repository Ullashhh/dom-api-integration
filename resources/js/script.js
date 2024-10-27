const foodSection = document.querySelector("#food-section");



const findFoodByName = async(name, start, end) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  // fetch(url)
    // .then((res) => res.json())
    // .then((data) => displayFood(data.meals.slice(start,end)))
    // .catch(error => console.log(error))
    try {
      const res = await fetch(url);
      const data = await res.json()
      displayFood(data.meals.slice(start, end))
    } catch (error) {
      console.log(error)
    }
};
findFoodByName("", 0, 6);



const displayFood = (foods) => {
  console.log(foods);
  const foodList = foods;
  console.log(foodList);
  foodList.forEach((food) => {
    const newSection = document.createElement("div");
    newSection.innerHTML = `
                <div class="col">
                  <div class="card">
                    <img src="${food.strMealThumb}" class=" rounded-start" alt="...">
                    <div class="card-body">
                      <h4 class="card-title text-center">${food.strMeal}</h4>
                      <p class="card-text">${food.strInstructions.slice(0,199)}...</p>
                    </div>
                    <button onclick = "getFoodDetails(${food.idMeal})" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        DETAILS
                    </button>
                  </div>
                </div> 
              `;
    foodSection.appendChild(newSection);
  });
};



document.getElementById("search-btn").addEventListener("click", () => {
  const getFood = document.querySelector("#food-name");
  const foodName = getFood.value;
  findFoodByName(foodName, 0, 6);
  foodSection.innerHTML = "";
});



const getFoodDetails = (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayFoodDetails(data.meals[0]));
};



const displayFoodDetails = (food) => {
  console.log(food);
  document.querySelector(".modal-title").textContent = food.strMeal;
  document.querySelector(".modal-body").innerHTML = `
  <div>
    <img class = "img-fluid" src = "${food.strMealThumb}"> 
    <p>${food.strInstructions}</p>
  </div>
  <h5>Tags : ${food.strTags ? food.strTags : "Home Food or Street Food"} </h5>
  <h5>Origin: ${food.strArea}</h5>
  <h5>YouTube Links: <a href="${food.strYoutube}">Click Here</a></h5>
  `;
};




document.querySelector('#more-food-btn').addEventListener('click', () => {
  const getFood = document.querySelector("#food-name");
  const foodName = getFood.value;
  findFoodByName(foodName, 6, -1);
})


