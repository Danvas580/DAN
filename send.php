<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if this is a KRA form submission or main contact form
    if (isset($_POST['fullname']) && isset($_POST['krapin'])) {
        // KRA Form Submission
        $fullname = $_POST['fullname'];
        $email    = $_POST['email'];
        $phone    = $_POST['phone'];
        $idnumber = $_POST['idnumber'];
        $krapin   = $_POST['krapin'];
        $message  = $_POST['message'];

        $data = "Name: $fullname\nEmail: $email\nPhone: $phone\nID: $idnumber\nKRA PIN: $krapin\nMessage: $message\n---\n";
        file_put_contents("admin/kra-submissions.txt", $data, FILE_APPEND);

        // Send email to site owner
        $to = "danvasm5@gmail.com";
        $subject = "New KRA Form Submission";
        $email_message = "Name: $fullname\nEmail: $email\nPhone: $phone\nID: $idnumber\nKRA PIN: $krapin\nMessage: $message\n";
        $headers = "From: $email\r\nReply-To: $email\r\n";
        mail($to, $subject, $email_message, $headers);

        // Forward to Formspree
        $ch = curl_init("https://formspree.io/f/xrbkpajr");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
            'fullname' => $fullname,
            'email' => $email,
            'phone' => $phone,
            'idnumber' => $idnumber,
            'krapin' => $krapin,
            'message' => $message,
            '_subject' => 'New KRA Form Submission - DAN TECH'
        ]));
        $response = curl_exec($ch);
        curl_close($ch);

        header("Location: file-kra-returns.html?success=true");
        exit();
    } else {
        // Main Contact Form Submission
        $name = $_POST['name'];
        $email = $_POST['email'];
        $message = $_POST['message'];
        $service = isset($_POST['service']) ? $_POST['service'] : '';
        $course = isset($_POST['course']) ? $_POST['course'] : '';

        // Send email to site owner
        $to = "danvasm5@gmail.com";
        $subject = "New Contact Form Submission - DAN TECH";
        $email_message = "Name: $name\nEmail: $email\n";
        if ($service) $email_message .= "Service Interest: $service\n";
        if ($course) $email_message .= "Course Interest: $course\n";
        $email_message .= "Message: $message\n";
        
        $headers = "From: $email\r\nReply-To: $email\r\n";
        mail($to, $subject, $email_message, $headers);

        // Forward to Formspree
        $formspree_data = [
            'name' => $name,
            'email' => $email,
            'message' => $message,
            '_subject' => 'New Contact Form Submission - DAN TECH'
        ];
        
        if ($service) $formspree_data['service'] = $service;
        if ($course) $formspree_data['course'] = $course;

        $ch = curl_init("https://formspree.io/f/xrbkpajr");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($formspree_data));
        $response = curl_exec($ch);
        curl_close($ch);

        // Redirect back to the page with success message
        $referer = $_SERVER['HTTP_REFERER'] ?? 'index.html';
        header("Location: $referer?success=true");
        exit();
    }
}
?>
