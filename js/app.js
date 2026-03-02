// STATE
var items = getLocalStorage().length > 0 ? getLocalStorage() : (typeof groceryItems !== 'undefined' ? groceryItems : []);
var editId = "";

// LOCAL STORAGE
function getLocalStorage() {
    return localStorage.getItem("grocery-list")
        ? JSON.parse(localStorage.getItem("grocery-list"))
        : [];
}

function setLocalStorage(itemsArray) {
    localStorage.setItem("grocery-list", JSON.stringify(itemsArray));
}

// RENDER
function render() {
    var $app = $("#app");
    $app.empty();

    var itemToEdit = items.find(function (item) { return item.id === editId; });
    var $form = createForm(editId, itemToEdit);
    var $itemList = createItems(items);

    $app.append($form);
    $app.append($itemList);

    updateProgress();
}

// PROGRESS
function updateProgress() {
    var $container = $(".progress-container");
    var $bar = $(".progress-bar");

    if (items.length === 0) {
        $container.hide();
        return;
    }

    $container.show();
    var completed = items.filter(function (item) { return item.completed; }).length;
    var percentage = (completed / items.length) * 100;
    $bar.css("width", percentage + "%");
}

// OPERATIONS
function addItem(itemName) {
    var newItem = {
        name: itemName,
        completed: false,
        id: new Date().getTime().toString(),
    };
    items.push(newItem);
    setLocalStorage(items);
    render();
    displayAlert("item added to the list", "success");
}

function removeItem(id) {
    items = items.filter(function (item) {
        return item.id !== id;
    });
    setLocalStorage(items);
    render();
    displayAlert("item removed", "danger");
    if (items.length === 0) {
        editId = "";
    }
}

function setEditId(id) {
    editId = id;
    render();
}

function updateItemName(name) {
    items = items.map(function (item) {
        if (item.id === editId) {
            item.name = name;
        }
        return item;
    });
    setLocalStorage(items);
    editId = "";
    render();
    displayAlert("value changed", "success");
}

function editCompleted(id) {
    items = items.map(function (item) {
        if (item.id === id) {
            item.completed = !item.completed;
        }
        return item;
    });
    setLocalStorage(items);
    render();
}

function clearItems() {
    items = [];
    setLocalStorage(items);
    editId = "";
    render();
    displayAlert("empty list", "danger");
}

// ALERT
function displayAlert(text, action) {
    var $alert = $(".alert-container");
    $alert.text(text);
    $alert.addClass(`alert-${action} alert-show`);

    setTimeout(function () {
        $alert.removeClass("alert-show");
        setTimeout(function () {
            $alert.text("");
            $alert.removeClass(`alert-${action}`);
        }, 400);
    }, 1500);
}

// INIT
$(document).ready(function () {
    render();
});