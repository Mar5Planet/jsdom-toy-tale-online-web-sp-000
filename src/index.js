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

  document.addEventListener("click", (e) => {
  if (e.target.matches(".like-btn" )) {
    const button = e.target
    const toyDiv = button.parentNode
    likeToy(toyDiv)
   
  };
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
    postToy(toy)
    e.preventDefault()
    newToyForm.reset()


  });

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
      <p> <span class="like-value">${toyObject.likes}</span> Likes </p>
      <h4 class="hidden"> ${toyObject.id} </h4>
      <button class="like-btn">Like <3</button>`
    toyCollection.append(toyDiv) 
    
    };

    const createToys = toysArray => {
      toysArray.forEach(toyObj => {
        createToy(toyObj)
      }) 
    }

    function postToy(toy) {
      fetch('http://localhost:3000/toys', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
          },
          body: JSON.stringify({
            "name": toy.name,
            "image": toy.image,
            "likes": 0
    
          })
        })
        .then(res => res.json())
        .then((obj_toy) => {
          let new_toy = createToy(obj_toy)
        })
    }

    const likeToy = (parentDiv) => {
      const likeSpan = parentDiv.querySelector('span')
      const currentLike = likeSpan.innerText
      const newLike = parseInt(currentLike) + 1
      likeSpan.textContent = newLike
      const toyId = parentDiv.querySelector('h4').innerText
    console.log(toyId)
      fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": newLike
      })
      })
      .then(res => res.json())
      .then((like_obj => {
        
      }))
    }

});
