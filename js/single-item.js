function createSingleItem(item) {
    var $div = $('<div class="single-item"></div>');

    $div.html(`
    <input type="checkbox" ${item.completed ? "checked" : ""} />
    <p class="${item.completed ? "completed-text" : ""}">
      ${item.name}
    </p>
    <div class="btn-container">
      <button class="btn icon-btn edit-btn" type="button">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button class="btn icon-btn remove-btn" type="button">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  `);

    $div.find('input[type="checkbox"]').on("change", function () {
        editCompleted(item.id);
    });

    $div.find(".remove-btn").on("click", function () {
        removeItem(item.id);
    });

    $div.find(".edit-btn").on("click", function () {
        setEditId(item.id);
    });

    return $div;
}



