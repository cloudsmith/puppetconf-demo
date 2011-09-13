<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml"> 
<head> 
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" /> 
	<title>Search for #stackhammer tweats</title> 
	<style type="text/css" media="screen"> 
		@import url("screen.css");
	</style> 
    <style type="text/css" media="print"> 
		@import url("print.css");
	</style> 
</head>
<body>
<form action="index.php" method="submit">
<input name="twitterq" type="text" id="twitterq" />
<input name="Search" type="submit" value="Search" />
</form>
<?php 
include('TwitterSearch.phps');
if($_GET['twitterq']){
$twitter_query = $_GET['twitterq'];
echo '<div><p>Query is: '.$twitter_query.'</p></div>';
$search = new TwitterSearch($twitter_query);
$search->rpp(100);
$results = $search->results();

if(count($results) < 1)
	echo '<div><p>No results found</p></div>';
	
$odd = true;
echo '<table width="100%"><tr><td class="left" width="40%>';
foreach($results as $result){
	$oddEven = $odd ? "odd" : "even";
	$odd = ! $odd;
	echo '<div class="twitter_status '.$oddEven.'">';
	echo '<img src="'.$result->profile_image_url.'" class="twitter_image">';
	// replace embedded URLs
	$text_n = preg_replace('/https?:\/\/[^\s]+/i', '<a href="$0" target="output">$0</a>', $result->text); // toLink($result->text);
	echo $text_n;
	echo '<div class="twitter_small">';
	echo '<strong>From:</strong> <a href="http://www.twitter.com/'.$result->from_user.'">'.$result->from_user.'</a>: ';
	echo '<strong>at:</strong> '.$result->created_at;
	echo '</div>';
	echo '</div>';
	}
}
echo '</td><td class="right" valign="top" height="100%" width="60%"><iframe class="outputFrame" name="output" align="top" width="100%" height="100%"></td></tr></table>';
?>
</body>
</html>
