function createItems(itemsArray) {
    if (itemsArray.length === 0) {
        return $("<div></div>");
    }

    var $container = $('<div class="items"></div>');

    $.each(itemsArray, function (index, item) {
        var $itemElement = createSingleItem(item);
        $container.append($itemElement);
    });

    var $clearBtn = $('<button class="clear-btn">clear items</button>');
    $clearBtn.on("click", function () {
        clearItems();
    });

    $container.append($clearBtn);

    return $container;
}

