'use strict';

$(function() {
    $(".dropdown-menu .dropdown-item").click(function() {

        $(".btn:first-child").text($(this).text());

    });
});

function submitForm(event) {
    event.preventDefault();

    let key = $("#dropdownMenuLink").text().trim();
    let value = $("input").val().trim();
    let keyMap = {
        "Product Name": "productName",
        "Company": "company",
        "Tag": "tag",
        "All": "all"
    }

    console.log(key);
    console.log(value);

    if (value.trim().length == 0) {
        console.log("Empty input");
        return;
    }

    console.log("start searching...");

    let url = "?" + keyMap[key] + "=" + value;
    console.log(url);

    // Sending request to backend
    jQuery.get(
        url, 
        function(data) {
            console.log("get back data");
        },
    )
}

$(document).ready(function() {
    $('#search_form').submit((event) => submitForm(event));
})

