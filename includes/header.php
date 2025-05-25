<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Compass</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
  <link rel="stylesheet" href="assets/css/styles.css">
  <?php if (isset($use_slider) && $use_slider): ?>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
  <?php endif; ?>
  <?php if (isset($use_fa) && $use_fa): ?>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" />
  <?php endif; ?>

</head>

<body>
  <?php include('nav.php'); ?>
  <main>