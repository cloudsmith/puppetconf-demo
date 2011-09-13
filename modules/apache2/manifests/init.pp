class apache2 {
	package { "httpd":
		ensure => present,
	}

	service { "httpd":
		enable => true,
		ensure => running,
	}
}
