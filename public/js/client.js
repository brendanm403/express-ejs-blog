//let actionShowing = {action1: false, action2: false, action3: false};

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

const showActionForm = function() {
  let element1 = document.getElementById("action1-container");
  let element2 = document.getElementById("action2-container");
  let element3 = document.getElementById("action3-container");
  for (let i = 1; i < 4; i++) {
    let targetElement = document.getElementById(`action${i}`);
    targetElement.addEventListener("click", (event) => {
      console.log('clicked', event.target.id);
      if (event.target.id === "action1") {
        element1.classList.remove("visible-no");
        element2.classList.add("visible-no");
        element3.classList.add("visible-no"); 
      } else if (event.target.id === "action2") {
        element1.classList.add("visible-no");
        element2.classList.remove("visible-no");
        element1.classList.add("visible-no");
      } else if (event.target.id === "action3") {
        element1.classList.add("visible-no");
        element2.classList.add("visible-no");
        element3.classList.remove("visible-no")
      }
    })
  }  
}


showActionForm();
preventEnterKeySubmit();
