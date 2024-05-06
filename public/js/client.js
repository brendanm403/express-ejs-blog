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

const getData = async (event) => {
  const response = await fetch("http://localhost:3000/server-data");
  const myData = await response.json();
  console.log("data fetch", myData);
  if (myData.data.length > 0) {
    const title = document.getElementById("title-edit");
    const content = document.getElementById("content-edit");
    const hiddenInput = document.getElementById("hidden-input");
    const blogPost = myData.data.filter((foundPost) => foundPost.id == event.target.id);
    //console.log("newlog", blogPost);
    title.attributes[3].value = blogPost[0].title;
    content.innerHTML = blogPost[0].content;
    hiddenInput.innerHTML = blogPost[0].id;
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
        //getData();
        aaa();
        element1.classList.add("visible-no");
        element2.classList.remove("visible-no");
        element3.classList.add("visible-no");
      } else if (event.target.id === "action3") {
        element1.classList.add("visible-no");
        element2.classList.add("visible-no");
        element3.classList.remove("visible-no")
      }
    })
  }  
}

const aaa = function() {
  let elementArr = document.querySelectorAll(".edit-dropdown-item");
  console.log(elementArr);
  if (elementArr.length > 0) {
    elementArr.forEach(element => {
      element.addEventListener("click", (event) => {
        console.log(event.target.id);
        getData(event);
      })
  }
  )};
}



showActionForm();
preventEnterKeySubmit();