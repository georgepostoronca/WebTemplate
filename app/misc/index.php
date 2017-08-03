<?php

echo '<meta name="viewport" content="width=device-width"><link rel="stylesheet" href="css/reset.css" media="all"><link rel="stylesheet" href="fonts/fonts.css" media="all"><link rel="stylesheet" href="css/style.css" media="all">
	<style>
	body{padding:40px;font-size:18px;background:none;}
	p{margin:10px;padding:0;}
	a{text-decoration:none;}
	</style>';

$dir = './';
 
$f = scandir($dir);
 
foreach ($f as $file){
    if(preg_match('/\.(html)/', $file)){
        echo '<p><a href="'.$file.'">'.$file.'</a></p>';
    }
}
?>
