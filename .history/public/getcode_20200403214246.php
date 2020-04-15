<?php
$cimg = imagecreate(100,20);
imagecolorallocate($cimg, 58,89,253);
$white = imagecolorallocate($cimg,255,255,255);
$num1 = rand(1,99);
$num2 = rand(1,99);
session_start();
$_SESSION['code'] = $num1 + $num2;
imagestring($cimg, 5,5,5,$num1,$white);
imagestring($cimg, 5,30,5,"+",$white);
imagestring($cimg, 5,45,5,$num2,$white);
imagestring($cimg, 5,70,5,"=?",$white);
header("Content-type:imagepng");
imagepng($cimg)
?>