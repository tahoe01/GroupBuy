'use strict';

var buttonPressed;

console.log(window.location.href);

$(function() {
    $(".dropdown-menu .dropdown-item").click(function() {

        $(".btn:first-child").text($(this).text());

    });
});

function submitSearchForm(event) {
    event.preventDefault();

    let key = $("#dropdownMenuLink").text().trim();
    let value = $("input").val().trim();
    let userId = $("#userId").text();
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

    let url = "/index?" + keyMap[key] + "=" + value + "&userId=" + userId;
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

$('.submitButton').click(function() {
    buttonPressed = $(this).attr('name');
})

$('#search_form').submit((event) => submitSearchForm(event));

$('.team_form').submit(function(event) {
    event.preventDefault();

    if (buttonPressed == 'createButton') {
        console.log(jQuery(this).serialize());
        jQuery.post(
            "/createteam",
            jQuery(this).serialize(),
            function(data) {
                console.log("get back data");
                var newDoc = document.open('text/html', 'replace');
                newDoc.write(data);
                newDoc.close();
            },
        )
    } else if (buttonPressed == 'findTeamButton') {
        jQuery.get(
            "/jointeam",
            jQuery(this).serialize(),
            function(data) {
                console.log("get back data");
                var newDoc = document.open('text/html', 'replace');
                newDoc.write(data);
                newDoc.close();
            },
        )
    }     
});
