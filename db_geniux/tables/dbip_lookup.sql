USE geniux_db;

DROP TABLE `dbip_lookup`;

CREATE TABLE `dbip_lookup` (
  `addr_type` enum('ipv4','ipv6') NOT NULL,
  `ip_start` varbinary(16) NOT NULL,
  `ip_end` varbinary(16) NOT NULL,
  `country` char(2) NOT NULL,
  `stateprov` varchar(80) NOT NULL,
  `district` varchar(80) NULL,
  `city` varchar(80) NOT NULL,
  `zipcode` varchar(20) NULL,
  `latitude` float  NULL,
  `longitude` float  NULL,
  `geoname_id` int(11) DEFAULT NULL,
  `timezone_offset` float  NULL,
  `timezone_name` varchar(64)  NULL,
  `isp_name` varchar(128)  NULL,
  `connection_type` enum('dialup','isdn','cable','dsl','fttx','wireless') DEFAULT NULL,
  `organization_name` varchar(128)  NULL,
  PRIMARY KEY (`addr_type`,`ip_start`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
