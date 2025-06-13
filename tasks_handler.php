<?php
$file = 'data/tasks.json';
if (!file_exists($file)) file_put_contents($file, '[]');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['task'])) {
    $tasks = json_decode(file_get_contents($file), true);
    $tasks[] = $_POST['task'];
    file_put_contents($file, json_encode($tasks));
    exit;
}

if ($_GET['action'] === 'load') {
    echo file_get_contents($file);
    exit;
}

if ($_GET['action'] === 'delete') {
    $index = (int)$_GET['index'];
    $tasks = json_decode(file_get_contents($file), true);
    array_splice($tasks, $index, 1);
    file_put_contents($file, json_encode($tasks));
    exit;
}
?>