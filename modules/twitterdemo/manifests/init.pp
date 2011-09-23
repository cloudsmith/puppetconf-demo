class twitterdemo($demo_alias = "demo") {
	include php5

	$demo_doc_root = "/var/www/twitterdemo"

	file { "$demo_doc_root":
		ensure => present,
		source => "puppet:///modules/twitterdemo",
		recurse => true,
		purge => true,
		owner => root,
		group => root,
		require => Package["httpd"],
	}

	file { "/etc/httpd/conf.d/twitterdemo.conf":
		ensure => present,
		content => template("twitterdemo/twitterdemo.conf.erb"),
		owner => root,
		group => root,
		require => Package["httpd"],
		notify => Service["httpd"],
	}
}
