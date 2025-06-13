<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: admin-login.php");
    exit();
}
require 'db.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DAN TECH Admin Dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: 'Poppins', sans-serif;
      background-color: #f1f4f9;
      color: #333;
    }
    header {
      background-color: #007bff;
      color: white;
      padding: 20px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    header h1 {
      font-size: 24px;
      margin: 0;
    }
    .logout-btn {
      background-color: #dc3545;
      border: none;
      padding: 10px 16px;
      color: white;
      font-weight: 600;
      border-radius: 5px;
      cursor: pointer;
      transition: 0.3s;
    }
    .logout-btn:hover {
      background-color: #b02a37;
    }
    .container {
      max-width: 1100px;
      margin: 30px auto;
      padding: 20px;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }
    h2 {
      margin-bottom: 20px;
      font-size: 22px;
      color: #007bff;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }
    th, td {
      padding: 12px;
      border-bottom: 1px solid #ddd;
      text-align: left;
    }
    th {
      background-color: #f8f9fa;
      font-weight: 600;
    }
    tr:hover {
      background-color: #f1f1f1;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #666;
      font-size: 14px;
      margin-top: 50px;
    }
    @media (max-width: 768px) {
      header, .container {
        padding: 15px;
      }
      header h1 {
        font-size: 20px;
      }
      th, td {
        font-size: 14px;
      }
    }
  </style>
</head>
<body>
<header>
  <h1>Admin Panel – DAN TECH Dashboard</h1>
  <form method="POST" action="logout.php">
    <button class="logout-btn">Logout</button>
  </form>
</header>
<div class="container">
  <h2>Staff Shift Logs</h2>
  <?php
    $result = $conn->query("SELECT * FROM shifts ORDER BY id DESC");
    if ($result->num_rows > 0): ?>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <?php while ($row = $result->fetch_assoc()):
            $start = strtotime($row['start_time']);
            $end = strtotime($row['end_time']);
            $duration = ($start && $end) ? round(($end - $start) / 60) . " mins" : "-";
          ?>
            <tr>
              <td><?php echo $row['id']; ?></td>
              <td><?php echo date("Y-m-d H:i:s", $start); ?></td>
              <td><?php echo date("Y-m-d H:i:s", $end); ?></td>
              <td><?php echo $duration; ?></td>
            </tr>
          <?php endwhile; ?>
        </tbody>
      </table>
  <?php else: ?>
    <p>No shift logs available.</p>
  <?php endif; ?>
</div>
<div class="footer">
  &copy; <?php echo date("Y"); ?> DAN TECH | Admin Panel
</div>
</body>
</html>