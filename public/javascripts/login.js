function handleLoginResult(resultData) {
	console.log(resultData);

	if (resultData['info'] == 'success') {
		let userId = resultData['userId'];
		window.location.replace(`/index?all=''&userId=${userId}`);
	} else { // user email & password not match
		jQuery("#login_error_message").text("Wrong email or password. Try again!");
	}
}


function submitLoginForm(formSubmitEvent){
	console.log("submit login form");
	
	// Important: disable the default action of submitting the form
    //   which will cause the page to refresh
    //   see jQuery reference for details: https://api.jquery.com/submit/
	formSubmitEvent.preventDefault();
	
	jQuery.post(
			"",
			// Serialize
			jQuery("#login_form").serialize(),
			(resultData) => handleLoginResult(resultData)
	);
}

// Bind the submit action of the form to a handler function
jQuery("#login_form").submit((event) => submitLoginForm(event)); 