<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $course = $_POST['course'];
    $files = $_FILES['files'];

    // Define the recipient email address (your email)
    $to = "DAN TECHkenya@gmail.com";
    $subject = "New Course Enrollment";

    // Create the email content
    $message = "<h1>New Course Enrollment</h1>";
    $message .= "<p><strong>Name:</strong> $name</p>";
    $message .= "<p><strong>Email:</strong> $email</p>";
    $message .= "<p><strong>Course Selected:</strong> $course</p>";
    
    // Check if a file was uploaded
    if ($files["error"] == 0) {
        $fileName = $files["name"];
        $fileTmpName = $files["tmp_name"];
        $fileType = $files["type"];
        $fileSize = $files["size"];

        // Save the file temporarily
        $uploadDirectory = "uploads/";
        $filePath = $uploadDirectory . basename($fileName);
        move_uploaded_file($fileTmpName, $filePath);

        $message .= "<p><strong>File Uploaded:</strong> $fileName</p>";
    }

    // Set headers for email (HTML format)
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo "Enrollment submitted successfully!";
    } else {
        echo "There was an error submitting your enrollment.";
    }
}
?>
