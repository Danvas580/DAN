<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = $_POST['fullname'];
    $email    = $_POST['email'];
    $phone    = $_POST['phone'];
    $idnumber = $_POST['idnumber'];
    $krapin   = $_POST['krapin'];
    $message  = $_POST['message'];

    $data = "Name: $fullname\nEmail: $email\nPhone: $phone\nID: $idnumber\nKRA PIN: $krapin\nMessage: $message\n---\n";
    file_put_contents("admin/kra-submissions.txt", $data, FILE_APPEND);

    // Forward to Formspree
    $ch = curl_init("https://formspree.io/f/xblodzaa");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
        'fullname' => $fullname,
        'email' => $email,
        'phone' => $phone,
        'idnumber' => $idnumber,
        'krapin' => $krapin,
        'message' => $message
    ]));
    $response = curl_exec($ch);
    curl_close($ch);

    header("Location: file-kra-returns.html?success=true");
    exit();
}
?>
