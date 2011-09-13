<form action="index.php" method="submit">
<input name="twitterq" type="text" id="twitterq" />
<input name="Search" type="submit" value="Search" />
</form>
<?php 
include('TwitterSearch.phps');
echo '<div><p>Before results:</p></div>';
if($_GET['twitterq']){
$twitter_query = $_GET['twitterq'];
echo '<div><p>Query is: $twitter_query;</p></div>';
$search = new TwitterSearch($twitter_query);
echo '<div><p>Search is: $search;</p></div>';
$results = $search->results();

echo '<div><p>Search results:</p></div>';
foreach($results as $result){
echo '<div class="twitter_status">';
echo '<img src="'.$result->profile_image_url.'" class="twitter_image">';
$text_n = toLink($result->text);
echo $text_n;
echo '<div class="twitter_small">';
echo '<strong>From:</strong> <a href="http://www.twitter.com/'.$result->from_user.'">'.$result->from_user.'</a>: ';
echo '<strong>at:</strong> '.$result->created_at;
echo '</div>';
echo '</div>';
}
}
?>