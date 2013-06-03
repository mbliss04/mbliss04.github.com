<?php
  if($_POST['formSubmit'] == "voilà") {

    $errorMessage = "";

    if(empty($_POST['name'])) {
      $errorMessage .= "<li>You forgot to enter your name!</li>";
    }

    if(empty($_POST['email'])) {
      $errorMessage .= "<li>You forgot to enter your email!</li>";
    }

    if(empty($_POST['message'])) {
      $errorMessage .= "<li>Sure you want to leave the message blank?</li>";
    }

    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    if(!empty($errorMessage)) 
    {
      echo("<p>There was an error with your form:</p>\n");
      echo("<ul>" . $errorMessage . "</ul>\n");
    }
    else
    {
      $subject = "Email from " . $name;
      $headers = "From:" . $email;
      mail("mccallkbliss@gmail.com",$subject,$message,$headers);
      echo "Mail Sent.";
      //header("Location: thankyou.html");
    }
  }
?>