class newrelic::php($application_name = "Demo Test") {
	include php5

	$is64bitArch = $architecture ? {
		/(amd|64$)/ => true,
		default     => false,
	}

	if $is64bitArch {
		$arch_repo_path = "i386"
		$arch_libdir = "lib64"
	} else {
		$arch_repo_path = "x86_64"
		$arch_libdir = "lib"
	}

	package { "newrelic-repo":
		provider => rpm,
		source => "http://yum.newrelic.com/pub/newrelic/el5/$arch_repo_path/newrelic-repo-5-3.noarch.rpm",
		ensure => present,
	}

	package { "newrelic-php5":
		ensure => present,
		require => Package["newrelic-repo"],
	}

	exec { "newrelic-install":
		command => "newrelic-install install",
		path => ["/usr/bin"],
		creates => "/usr/$arch_libdir/php/modules/newrelic.so",
#		environment => ["NR_INSTALL_SILENT=yes"],
		subscribe => Package["newrelic-php5", "php", "php-cli"],
	}

	file { "/etc/newrelic/newrelic.cfg":
		ensure => present,
		content => template("newrelic/newrelic.cfg.erb"),
		subscribe => Exec["newrelic-install"],
	}

	file { "/etc/php.d/newrelic.ini":
		ensure => present,
		content => template("newrelic/newrelic.ini.erb"),
		subscribe => Exec["newrelic-install"],
		notify => Service["httpd"],
	}

	service { "newrelic-daemon":
		enable => true,
		ensure => running,
		subscribe => [Package["newrelic-php5"], File["/etc/newrelic/newrelic.cfg"]],
		notify => Service["httpd"],
	}
}
