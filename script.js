const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");


// Changes the style of the element while it is being dragged
draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
    })

    draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
    })
})

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
