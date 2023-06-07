
const search=document.getElementById('search');
submit=document.getElementById('submit');
random=document.getElementById('random');
mealsE1=document.getElementById('meals');
resultsHeading=document.getElementById('result_heading');
single_meals=document.getElementById('single-meal');
function searchmeal(e){
e.preventDefault();
single_meals.innerHTML="";
const term=search.value;
console.log(term);
if(term.trim()){
fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
.then((res => res.json()))
.then((data) => {
    console.log(data)
    single_meals.innerHTML=`<h2> search results for '${term}':</h2>`;
    if(data.meals===null){
       single_meals.innerHTML=`<p>There are no search result.Try again please!</p>`;
    }
    else{
        mealsE1.innerHTML=data.meals
        .map(meal=>`<div class=meal>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
        <div class="meal-info" data-mealID="${meal.idMeal}">
        <h3>${meal.strMeal}</h3>
        </div>
        </div>`).join("")
    }
})
search.value="";

}
else{
    alert("please enter the search term");
}
}
function getMealById(mealID){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res => res.json()))
    .then(data=>{
    const meal=data.meals[0];
    addmealToDOM(meal)
    });
}
/*function getRandomMeal() {
    mealsE1.innerHTML="";
    resultsHeading.innerHTML="";
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data=>{
        const meal=data.meals[0];
        addmealToDOM(meal)
    });
}*/
function getRandomMeal() {
    mealsE1.innerHTML="";
    resultsHeading.innerHTML="";
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data=>{
        const meal=data.meals[0];
        addmealToDOM(meal)
    });
}

function addmealToDOM(meal){
    const ingredients=[];
    for(let i=1;i<=20;i++){
        if(meal[`strIngredient${i}`]){
        ingredients.push(
            `${meal[`strIngredient${i}`]}-${meal[`strMeasure${i}`]}`
            );
    }
    else{
        break;
    }
}
single_meals.innerHTML=`<div class="single-meal">
<h2>${meal.strMeal}</h2>
<img src="${meal.strMealThumb}"alt="${meal.strMeal}"/>
<div class="single-meal-info">
${meal.strCategory?`<p>${meal.strCategory}</p>`:""} 
${meal.strArea?`<p>${meal.strArea}</p>`:""}
</div>
<div class="main">
<p>${meal.strInstructions}</p>
<h2>Ingredients</h2>
<ul>
${ingredients.map(ing=>`<li>${ing}</li>`).join("")}
</ul>
</div>
</div>`


}
submit.addEventListener('submit',searchmeal)
random.addEventListener("click",getRandomMeal)
mealsE1.addEventListener("click", (e) => {
    const mealInfo = e.target;
    while (mealInfo && !mealInfo.classList.contains("meal-info")) {
      mealInfo = mealInfo.parentElement;
    }
  
    if (mealInfo) {
      const mealId = mealInfo.getAttribute("data-mealid");
      console.log(mealId);
      getMealById(mealId);
    }
  });