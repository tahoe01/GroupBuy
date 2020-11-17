


function submitLoginForm(formSubmitEvent){
	console.log("submit login form");
	
	// Important: disable the default action of submitting the form
    //   which will cause the page to refresh
    //   see jQuery reference for details: https://api.jquery.com/submit/
	formSubmitEvent.preventDefault();
	
	jQuery.post(
			"",
			// Serialize
			jQuery("#login_form").serialize()
			// (resultData) => handleLoginResult(resultDataString)
	);
}

// Bind the submit action of the form to a handler function
jQuery("#login_form").submit((event) => submitLoginForm(event)); 