let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }

    
  });

  document.addEventListener('submit', (e) => {
    const newToyForm = document.querySelector(".add-toy-form")
    const toyNameInput = newToyForm.querySelector('input')
    const toyName = toyNameInput.value
    const toyImage = toyNameInput.nextElementSibling.nextElementSibling.value

    const toy = {
      name: toyName, 
      image: toyImage,
      likes: 0,
    }
    createToy(toy)
    e.preventDefault()
    newToyForm.reset()


  }) 

  const getToys = () => {
    fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(allToys => createToys(allToys))
    .catch (error => {alert(error)})
      };

    getToys();
      
    const createToy = toyObject => {
    const toyDiv = document.createElement("div")
    toyDiv.classList.add("card")
    toyDiv.innerHTML = ` 
      <h2>${toyObject.name}</h2>
      <img src="${toyObject.image}" class="toy-avatar" />
      <p> ${toyObject.likes} Likes </p>
      <button class="like-btn">Like <3</button>`
    toyCollection.append(toyDiv) 
    
    };

    const createToys = toysArray => {
      toysArray.forEach(toyObj => {
        createToy(toyObj)
      }) 
    }

});
