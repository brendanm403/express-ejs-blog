// prevents enter button from submitting a form //
// get the form element//

const preventEnterKeySubmit = () => {
  let form = document.getElementById("create-post"); 
        form.onkeydown = function (key) {
          console.log(key);
            let btn = 0 || key.keyCode || key.charCode; 
            if (btn == 13) { 
                // alert("Enter Key is Pressed!"); 
                key.preventDefault(); 
            } 
        }
}

const showCreateForm = function() {
  for (let i = 1; i < 4; i++) {
    let targetElement = document.getElementById(`action${i}`);
    targetElement.addEventListener("click", (event) => {
      console.log('clicked', event.target.id);
      if (event.target.id === "action1") {
        let element = document.getElementById("action1-container");
        element.classList.remove("visible-no");
        hideOnSubmit();  
      }
    })
  }  
}

const hideOnSubmit = () => {
  let element = document.getElementsByClassName("post-button")[0];
  element.addEventListener("click", () => {
    let element2 = document.getElementById("action1-container");
    element2.classList.add("visible-no");
  })
}

showCreateForm();
preventEnterKeySubmit();
