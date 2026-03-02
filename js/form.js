function createForm(editId, itemToEdit) {
    var $form = $("<form class='grocery-form'></form>");
    $form.html(`
        <h2>grocery bud</h2>
        <div class="form-control">
            <input
                type="text"
                class="form-input"
                placeholder="e.g. eggs"
                value="${itemToEdit ? itemToEdit.name : ""}"
            />
            <button type="submit" class="btn">
                ${editId ? "edit" : "submit"}
            </button>
        </div>
    `);

    $form.on("submit", function (e) {
        e.preventDefault();
        var $input = $form.find(".form-input");
        var value = $.trim($input.val());

        if (!value) {
            displayAlert("please enter value", "danger");
            return;
        }

        if (editId) {
            updateItemName(value);
        } else {
            addItem(value);
        }
    });

    return $form;
}
