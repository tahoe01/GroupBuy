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

    let url = "http://localhost:8080/" + "?" + keyMap[key] + "=" + value;
    console.log(url);

    // Sending request to backend
    jQuery.get(
        url, 
        function(data) {
            console.log("get back data");
            var newDoc = document.open('text/html', 'replace');
            newDoc.write(data);
            newDoc.close();
        },
    )
}

function createTeam(event) {
    console.log("creating");
    event.preventDefault();
    // let teamSize = $("#teamSize").val().trim();
    // let productId = $("#productId").text();
    // console.log(teamSize);
};

$(document).ready(function() {
    $('#search_form').submit((event) => submitForm(event));
})

$(document).ready(function() {
    $('.team_form').submit((event) => createTeam(event));
})
