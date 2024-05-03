let actionShowing = {action1: false, action2: false, action3: false};

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

const hideAction = function(obj) {
  if (obj.action1 === true && (obj.action2 || obj.action3 === true)) {
    let element = document.getElementById("action1-container");
    element.classList.add("visible-no");
    obj.action1 = false;
  } else if (obj.action2 === true && (obj.action1 || obj.action3 === true)) {
    let element = document.getElementById("action2-container");
    element.classList.add("visible-no");
    obj.action2 = false;
  } 
  console.log();
}



// when a new option is selected it should hide the currently displayed action/form //

const showActionForm = function() {
  let element1 = document.getElementById("action1-container");
  let element2 = document.getElementById("action2-container");
  //let element3 = document.getElementById("action3-container");
  for (let i = 1; i < 4; i++) {
    let targetElement = document.getElementById(`action${i}`);
    targetElement.addEventListener("click", (event) => {
      console.log('clicked', event.target.id);
      console.log('obj', actionShowing);
      if (event.target.id === "action1") {
        element1.classList.remove("visible-no");
        element2.classList.add("visible-no"); 
      } else if (event.target.id === "action2") {
        element1.classList.add("visible-no");
        element2.classList.remove("visible-no");
      }
    })
  }  
}



// const hideOnSubmit = () => {
//   let element = document.getElementsByClassName("post-button")[0];
//   element.addEventListener("click", () => {
//     let element2 = document.getElementById("action1-container");
//     element2.classList.add("visible-no");
//   })
// }

showActionForm();
preventEnterKeySubmit();
