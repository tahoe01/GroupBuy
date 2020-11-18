function handleLoginResult(resultData) {
	console.log(resultData);
    let userId = resultData['userId'];
    window.location.replace(`/index?all=''&userId=${userId}`);
}


function submitLoginForm(formSubmitEvent){
	console.log("submit create account form");
	
	// Important: disable the default action of submitting the form
    //   which will cause the page to refresh
    //   see jQuery reference for details: https://api.jquery.com/submit/
	formSubmitEvent.preventDefault();
	
	jQuery.post(
			"createaccount",
			// Serialize
			jQuery("#create_account_form").serialize(),
            (resultData) => handleLoginResult(resultData)
    );
}

// Bind the submit action of the form to a handler function
jQuery("#create_account_form").submit((event) => submitLoginForm(event)); 