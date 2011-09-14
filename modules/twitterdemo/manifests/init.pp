class twitterdemo($demo_doc_root = "/var/www/twitterdemo", $demo_alias = "demo") {
	include php5

	file { "$demo_doc_root":
		ensure => present,
		source => "puppet:///modules/twitterdemo",
		recurse => true,
		purge => true,
		owner => root,
		group => root,
	}

	file { "/etc/httpd/conf.d/twitterdemo.conf":
		ensure => present,
		content => template("twitterdemo/twitterdemo.conf.erb"),
		owner => root,
		group => root,
		notify => Service["httpd"],
	}
}
