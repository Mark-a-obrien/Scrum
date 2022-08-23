const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");

// Basic drag and drop 
containers.forEach(container => {
    container.addEventListener("dragover", (e) => {
        e.preventDefault();
        const afterElement = getDragAFterElement(container, e.clientY);
        const draggable = document.querySelector(".dragging");

        // drops above or below
        if (afterElement == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElement);
        }
    })
})

function getDragAFterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".draggable:not(dragging")]; // gets each element besides the on being dragged

    return draggableElements.reduce( (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2; //Center of boxes
        if (offset < 0 && offset > closest.offset)
            return { offset: offset, element: child}
        else 
            return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element ;
}




// form
const colors = document.querySelectorAll(".color");
const textArea = document.querySelector(".text");
const create = document.querySelector(".btn-createStory");
const edits = document.querySelectorAll(".btn-edit");




colors.forEach((color) => {
    color.addEventListener("click", () => {
        const textElement = color.parentNode.parentNode.parentElement[0];
        textElement.style.backgroundColor = window.getComputedStyle(color).backgroundColor;
    })
})

const backLog = document.querySelector("#backlog");
function createStory() {
    const form = document.createElement("form");
    const textarea = document.createElement("textarea");
    const iconArea = document.createElement("div");
    const edit = document.createElement("img");
    const editDiv = document.createElement("div");
    const colors = document.createElement("div");
    const btnDelete = document.createElement("button");

    form.addEventListener("dragstart", () => {
        form.classList.add("dragging");
    })

    form.addEventListener("dragend", () => {
        form.classList.remove("dragging");
    })


    // settign atributes 
    form.draggable = true;
    edit.src = "icons/up-arrow.svg";
    edit.dataset.direction = "up";
    edit.draggable = false;
    btnDelete.type = "button";
    btnDelete.textContent = "delete";

    

    // adding classes to elements
    form.classList.add("draggable");
    textarea.classList.add("text", "text-edit");
    edit.classList.add("btn-edit", "icon");
    editDiv.classList.add("edit", "edit-hidden");
    colors.classList.add("colors");

    function createColors(color) {
        const btnColor = document.createElement("div");
        btnColor.type = "button";

        btnColor.style.backgroundColor = color;


        btnColor.classList.add("color","btn");

        btnColor.addEventListener("click", () => {
            const textElement = textarea;
            textElement.style.backgroundColor = window.getComputedStyle(btnColor).backgroundColor;
        })

        colors.appendChild(btnColor)
    }

    createColors("#77BCDE");
    createColors("#CF3A3E");
    createColors("#4EB67F");
    createColors("#D05A2E");
    createColors("#D1546C");

    // deletes story
    btnDelete.addEventListener("click", () => {
        form.remove();
    })

    

    edit.addEventListener("click", () => {
        const parentElement = edit.parentNode.parentNode;
        const textElement = parentElement[0];
        const editElement = editDiv;
        console.log(editElement);


        // shows and hides the edit 
        editElement.hidden ? editElement.hidden = false : editElement.hidden = true;
        editElement.classList.toggle("edit-hidden");
        textElement.disabled ? textElement.disabled = false : textElement.disabled = true;

        textElement.classList.toggle("text-edit");

        // changes arrow icon
        if (edit.dataset.direction == "down") {
            edit.src = "icons/up-arrow.svg";
            edit.dataset.direction = "up";
        }
        else {
            edit.src = "icons/down-arrow.svg"
            edit.dataset.direction = "down";
        };
    });



    //appending children
    iconArea.appendChild(edit);
    editDiv.append(colors, btnDelete);
    form.append(textarea, iconArea, editDiv);  
    backLog.append(form);
}

create.addEventListener("click", () => {
    createStory();
})




