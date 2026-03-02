function getLocalStorage() {
    var list = localStorage.getItem("grocery-list");
    if (list) {
        return JSON.parse(list);
    }
    return [];
}

function setLocalStorage(itemsArray) {
    localStorage.setItem("grocery-list", JSON.stringify(itemsArray));
}

function removeItemFromLocalStorage(id) {
    var list = getLocalStorage();
    list = list.filter(function (item) {
        return item.id !== id;
    });
    setLocalStorage(list);
}

function updateItemInLocalStorage(id, updatedItem) {
    var list = getLocalStorage();
    list = list.map(function (item) {
        if (item.id === id) {
            return updatedItem;
        }
        return item;
    });
    setLocalStorage(list);
}


function removeItem(itemId) {
    items = $.grep(items, function (item) {
        return item.id !== itemId;
    });
    setLocalStorage(items);
    render();
    setTimeout(function () {
        alert("Item Deleted Successfully!");
    }, 0);
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function addItem(itemName) {
    var newItem = {
        name: itemName,
        completed: false,
        id: generateId(),
    };
    items.push(newItem);
    setLocalStorage(items);
    render();
    setTimeout(function () {
        alert("Item Added Successfully!");
    }, 0);
}