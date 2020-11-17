


function submitLoginForm(formSubmitEvent){
	console.log("submit create account form");
	
	// Important: disable the default action of submitting the form
    //   which will cause the page to refresh
    //   see jQuery reference for details: https://api.jquery.com/submit/
	formSubmitEvent.preventDefault();
	
	jQuery.post(
			"createaccount",
			// Serialize
			jQuery("#create_account_form").serialize());
			// (resultDataString) => handleLoginResult(resultDataString));
}

// Bind the submit action of the form to a handler function
jQuery("#create_account_form").submit((event) => submitLoginForm(event)); 