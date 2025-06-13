<?php
$file = 'data/chat.json';
if (!file_exists($file)) file_put_contents($file, '[]');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['message'])) {
    $messages = json_decode(file_get_contents($file), true);
    $messages[] = $_POST['message'];
    file_put_contents($file, json_encode($messages));
    exit;
}

if ($_GET['action'] === 'load') {
    echo file_get_contents($file);
    exit;
}

if ($_GET['action'] === 'delete') {
    $index = (int)$_GET['index'];
    $messages = json_decode(file_get_contents($file), true);
    array_splice($messages, $index, 1);
    file_put_contents($file, json_encode($messages));
    exit;
}
?>