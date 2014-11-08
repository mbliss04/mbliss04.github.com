<?
	if(isset($_POST['submit'])) {

		$email_to = "mccall@mccallbliss.com";
    		$email_subject = "Contact Form";

    		function died($error) {
		        // your error code can go here
    			header( 'Location: errorpage.html' ) ; 
		        die();
		}

    		if(!isset($_POST['name']) || !isset($_POST['email']) ||
		   !isset($_POST['message'])) {
		   	$error_message .= "Nothing set!<br />";
			died($error_message);     
		}

    		$name = $_POST['name']; // required
    		$email = $_POST['email']; // required
    		$message = $_POST['message']; // required

		$error_message = "";
		$email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
		if(!preg_match($email_exp,$email)) {
	        	$error_message .= 'Not actually an email address!<br />';
	    	}
	    	$string_exp = "/^[A-Za-z .'-]+$/";
	    	if(!preg_match($string_exp,$name)) {
	        	$error_message .= 'Is that actually your name?<br />';
	    	}
	    	if(strlen($message) < 2) {
	        	$error_message .= 'Maybe try typing some more characters.<br />';
	    	}
	    	if(strlen($error_message) > 0) {
	        	died($error_message);
	    	}
	    	$email_message = "Form details below.\n\n";
	     
	    	function clean_string($string) {
	        	$bad = array("content-type","bcc:","to:","cc:","href");
	        	return str_replace($bad,"",$string);
	    	}

	    	$email_message .= "Name: ".clean_string($name)."\n";
	    	$email_message .= "Email: ".clean_string($email)."\n";
	   	$email_message .= "Message: ".clean_string($message)."\n";
	     
	     
		// create email headers
	    	$headers = 'From: '.$email_from."\r\n".
	               	   'Reply-To: '.$email_from."\r\n" .
	                   'X-Mailer: PHP/' . phpversion();

		mail($email_to, $email_subject, $email_message, $headers);

		header( 'Location: thankyou.html' ) ;
	}

?>
