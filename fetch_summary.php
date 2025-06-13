<?php
header('Content-Type: application/json');

// Example DB query logic (use real connection)
// $conn = new mysqli("localhost", "user", "pass", "DAN TECHdb");

// Sample response (replace with actual query results)
echo json_encode([
  "staff_count" => 14,
  "active_shifts" => 5,
  "tasks_total" => 34,
  "tasks_done" => 21
]);
?>
