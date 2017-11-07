#####
#
# Copyright (c) 2016, #!/nixfixers
# All rights reserved.
#
# Redistribution and use in source and binary forms, with or without modification,
# are permitted provided that the following conditions are met:
#
# 1. Redistributions of source code must retain the above copyright notice,
#    this list of conditions and the following disclaimer.
#
# 2. Redistributions in binary form must reproduce the above copyright notice,
#    this list of conditions and the following disclaimer in the documentation
#    and/or other materials provided with the distribution.
#
# 3. Neither the name of the copyright holder nor the names of its contributors
#    may be used to endorse or promote products derived from this software
#    without specific prior written permission.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
# AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
# THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
# IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY
# DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
# (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
# LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
# HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
# (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
# EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
#
#####

use nixfixers_site_v_1;


insert into location (id, location) values
    ('1',  '#!/nixfixers'),
    ('2',  'Atlas Distribution Company'),
    ('3',  'T.actical A.wareness B.eacon S.ystems'),
    ('4',  'R.M.I. / G.E. Transportation'),
    ('5',  'jobTopia'),
    ('6',  'Sectra AB'),
    ('7',  'Cablevision'),
    ('8',  'Adeptra'),
    ('9',  'Micropatent / Thompson'),
    ('10', 'Protometrix / Invitrogen'),
    ('11', 'DSL.net'),
    ('12', 'Curagen'),
    ('13', 'AT&T'),
    ('14', 'SmartWorld Technologies'),
    ('15', 'Trak Systems'),
    ('16', 'E.R.S.'),
    ('17', 'The Wild Animal Sanctuary');

insert into reviewer (id, last_name, first_name, title, orig_location_id, orig_role, curr_location, curr_role) values
    ('1', 'Lewis', 'Michael', null, '14', 'Head of Application Development', 'JPMorgan Chase', 'Managing Director, CTO'),
    ('2', 'Zhou', 'Fang', 'Dr.', '10', 'Senior Scientist', 'BioResource International Inc', 'Director of R&D'),
    ('3', 'DeSapio', 'Scott', null, '2', 'CIO', null, null),
    ('4', 'Thompson', 'Joanna', null, '5', 'Senior Partner', null, null),
    ('5', 'Sarjeant', 'Dean', null, '3', 'CEO', null, null),
    ('6', 'Ruisi', 'Brian', null, '6', 'Director of Customer Support', null, null);


insert into review (reviewer_id, review) values
    ('1', 'Rick is one of the best technologists I have had the pleasure of working with. I ran development for a small start up and I hired Rick to assist me in developing a point of sales system for our sales team. Rick focused on the overall architecture and front end of the application and I worked on the backend. Throughout this process, Rick and I worked incredibly well together and Rick developed an application that was a great example of form and function. The application worked out of gate flawlessly which is a testament to Rick''s technical skills and attention to detail. I would hire Rick again anytime - any organization would be fortunate to have him.'),
    ('2', 'I worked closely with Rick when we were building a start-up as one of the first few employees. He showed a tremendous amount of energy, initiative, and dedication, and his work set the foundation for the IT infrastructure in the early days. I was especially impressed by his ability to communicate with non-IT colleagues, understand their needs, and provide the right solutions. Instead of confusing people with the latest technology, Rick focused on applying proven methods to develop simple and effective solutions. I learned a great deal while working with him.'),
    ('3', 'Rick is an outstanding team member with top notch communication skills and a knack for getting to the core of an issue and addressing it directly. He''s a great listener and with incredible depth of knowledge and experience to draw on. Rick is an invaluable asset and I look forward to working with him again very soon.'),
    ('3', 'Rick is extremely knowledgeable, fast, and results oriented. His communication skills are top notch and his product undeniably solid; flawless execution and superb deliverables. HIGHLY recommend.'),
    ('4', 'Rick is one heck of a strong developer. He always performed at the top of his peers and consistently produced great quality code. My client, GE Transpiration (formerly RMI) was highly impressed with him and extended his contract several times. He is an excellent remote resource that is highly dependable and hard-working. I highly recommend him to any organization that values superior software development.'),
    ('5', 'Rick''s integrity is unmatched. Rick came to work for us without a clear understanding of his role and built his job into far more than we could have anticipated. He never complained when resources were lean and stuck with us through thin and thinner. If Rick says he''ll do something, you can take it off your plate. It will get done.'),
    ('6', 'Rick was extremely qualified and professional. He was able to quickly understand our needs and provide on-time solutions that exceeded our expectations.');


insert into skill (id, skill) values
    ('1',  'PHP'),
    ('2',  'Perl'),
    ('3',  'Python'),
    ('4',  'AngularJS'),
    ('5',  'RequireJS'),
    ('6',  'jQuery'),
    ('7',  'Javascript'),
    ('8',  'HTML5'),
    ('9',  'HTML'),
    ('10', 'CSS'),
    ('11', 'MySQL'),
    ('12', 'SQL'),
    ('13', 'Git'),
    ('14', 'Gimp'),
    ('15', 'steghide'),
    ('16', 'Unix'),
    ('17', 'Linux'),
    ('18', 'Ubuntu'),
    ('19', 'bash'),
    ('20', 'ftp'),
    ('21', 'Apache'),
    ('22', 'Sendmail'),
    ('23', 'GPG'),
    ('24', 'Subversion'),
    ('25', 'CVS'),
    ('26', 'ksh'),
    ('27', 'OpenBSD'),
    ('28', 'NFS'),
    ('29', 'DNS'),
    ('30', 'Bind'),
    ('31', 'pf'),
    ('32', 'Firewall'),
    ('33', 'NAT'),
    ('34', 'DHCP'),
    ('35', 'ssh'),
    ('36', 'GAE'),
    ('37', 'Google App Engine'),
    ('38', 'NoSQL'),
    ('39', 'Werkzeug'),
    ('40', 'Jinja2'),
    ('41', 'Flask'),
    ('42', 'MVP'),
    ('43', 'Minimum Viable Product'),
    ('44', 'Telecommute'),
    ('45', 'Radio'),
    ('46', 'Internet Radio'),
    ('47', 'Presentation'),
    ('48', 'Public Speaking'),
    ('49', 'Promotion'),
    ('50', 'Copy Writing'),
    ('51', 'Ebay'),
    ('52', 'Education'),
    ('53', 'C'),
    ('54', 'Perl DBIx'),
    ('55', 'Perl TemplateToolkit'),
    ('56', 'Mercurial'),
    ('57', 'Agile/Scrum'),
    ('58', 'Mac OS X'),
    ('59', 'LaTeX'),
    ('60', 'Nagios'),
    ('61', 'C++'),
    ('62', 'Java'),
    ('63', 'JSP'),
    ('64', 'Tomcat'),
    ('65', 'Samba'),
    ('66', 'Jabber'),
    ('67', 'cron'),
    ('68', 'Solaris'),
    ('69', 'SNMP'),
    ('70', 'FreeBSD'),
    ('71', 'BSD'),
    ('72', 'Perl DBI/DBD'),
    ('73', 'Oracle'),
    ('74', 'Oracle PL/SQL'),
    ('75', 'PL/SQL'),
    ('76', 'Bioinformatics'),
    ('77', 'System Administration'),
    ('78', 'Sysadmin'),
    ('79', 'Radius'),
    ('80', 'LDAP'),
    ('81', 'RCS'),
    ('82', 'Security'),
    ('83', 'Red Hat'),
    ('84', 'ClearCase'),
    ('85', 'SVN');

insert into project (id, project) values
    ('1',  'Designed and built the #!/nixfixers public facing website.'),
    ('2',  'Set up the #!/nixfixers email relay.'),
    ('3',  'Implemented GPG for all #!/nixfixers email accounts.'),
    ('4',  'Converted #!/nixfixers CVS repositories to Subversion.'),
    ('5',  'Committed all internal #!/nixfixers source code to Subversion.'),
    ('6',  'Committed all internal #!/nixfixers source code to CVS.'),
    ('7',  'System administration of all internal #!/nixfixers servers.'),
    ('8',  'Defined and maintained all internal #!/nixfixers firewalls.'),
    ('9',  'Maintained the Galt''s Gulch Online Internet discussion board for the Atlas Shrugged Movie trilogy.'),
    ('10', 'Assisted in the development of site advertising sales and display software.'),
    ('11', 'Assisted in the development of site user directory searchable by geolocation.'),
    ('12', 'Recovered lost historical user data from web page cache.'),
    ('13', 'Hosted the Galt''s Gulch Online daily, hour long, call-in internet radio program Radio Interrupted.'),
    ('14', 'Edited the Galt''s Gulch Online morning Daily Digest email.'),
    ('15', 'Managed the Atlas Shrugged Movie weekly movie prop auctions on Ebay.'),
    ('16', 'Lead presenter and educator of TABS geotracking hardware and software.'),
    ('17', 'Scripting for system administration and monitoring.'),
    ('18', 'Implemented GPG for company email accounts.'),
    ('19', 'Occasional QA of C firmware.'),
    ('20', 'Developed parser to determine format of incorrectly documented binary files.'),
    ('21', 'Maintained scripts for syncing proprietary handheld devices.'),
    ('22', 'Assisted in development of web based tracking of clients and their calendars.'),
    ('23', 'Maintained multiple installations of Nagios servers which monitored hundreds of clients.'),
    ('24', 'Developed the test and deployment scripts for all Nagios configuration files.'),
    ('25', 'Repaired a legacy C++ CGI parser which provided the company branded skin for the Nagios web interface.'),
    ('26', 'Maintained custom web based applications for tracking employee productivity.'),
    ('27', 'Installed and maintained Tomcat, Apache, MySQL, Subversion, Samba, and Jabber servers.'),
    ('28', 'Implemented prod/beta/alpha revision control and environment separation.'),
    ('29', 'Developed distribution scripts from Subversion to prod/beta/alpha environments.'),
    ('30', 'Developed scripts and implemented procedures for nightly backup of all code repositories and databases.'),
    ('31', 'Implemented web based lottery application to award early time off to customer service employees during slow shifts.'),
    ('32', 'Nagios monitoring of daily fraud notifications from national credit companies.'),
    ('33', 'High demand Nagios maintenance and scripting.'),
    ('34', 'Assisted in maintaining Mircopatent''s Internet patent search service.'),
    ('35', 'Assisted in production deployment of new code revisions.'),
    ('36', 'Installed and maintained Nagios servers for checking production servers and NOC temperature sensors.'),
    ('37', 'Developed web session recorder for QA regression testing.'),
    ('38', 'Tuned daily database backup scripts.'),
    ('39', 'Lead R&D presenter for the IT department.'),
    ('40', 'Installed and maintained internal Apache and CVS servers.'),
    ('41', 'Developed scripts to manage CVS repositories.'),
    ('42', 'Developed a web based quality analyzer of lab sample DNA sequences.'),
    ('43', 'Designed and developed the initial Drug Development department code base.'),
    ('44', 'Member of the Curagen IT Architecture Board.'),
    ('45', 'Developed Perl wrapper to provide LOB support to defective Oracle DBI/DBD layer.'),
    ('46', 'Assisted in the maintenance of internal Oracle PL/SQL web pages.'),
    ('47', 'Developed script and schema to text encode/compress genetic sequences as both nucleotide and amino acid sequences.'),
    ('48', 'Assisted in the redesign of the Smartworld web based account ordering and fulfillment suite.'),
    ('49', 'Developed web based network outage notification scripts.'),
    ('50', 'Updated Radius authentication server to incorporate LDAP protocols.'),
    ('51', 'Redesigned Nagios configuration to provide tiered levels of monitoring service.'), ##  Sectra
    ('52', 'Updated Nagios email notification to reference internal trouble tickets.'),
    ('53', 'Security audited and hardened all MySQL databases and Java/JSP code bases and API calls.'), ##  Cablevision
    ('54', 'Rebuilt OpenBSD kernel to enable USB communication with uninterruptible power supplies.'),
    ('55', 'Managed installation of Red Hat servers used in benchmarking Apache throughput.'), ##  Micropatent
    ('56', 'Developed a web based workflow tracker of lab samples.'), ##  Protometrix
    ('57', 'Developed a mail merge application for notifying customers of their order status.'), ##  DSL
    ('58', 'Developed scripts to parse early Drug Development spreadsheet data into Oracle.'), ##  Curagen
    ('59', 'Developed scripts to install and updated internal Perl package libraries.'), ##  AT&T
    ('60', 'Assisted in developing user configured multi-lingual web pages for small business clients.'),
    ('61', 'Ported entire code base to compile under GNU.'),
    ('62', 'Debugged and rewrote internal flat file database routines.'),
    ('63', 'Maintained and redesigned the Record Trak record/book/video store P.O.S. software suite.'),
    ('64', 'Developed a unit price integrity module with reliable precision to fourteen decimal places.'), ##  ERS
    ('65', 'Assisted in the development of the Electronic Price Management System application suite.'),
    ('66', 'Developed nightly Nagios configuration backup Perl scripts.'), ## TWAS
    ('67', 'Installed and configured Nagios and Apache servers.');

insert into resume (location_id, project_id, skill_id) values
    ##  Nixfixers
    ('1',  '1',  '1' ), # NF - Site - PHP
    ('1',  '1',  '2' ), # NF - Site - Perl
    ('1',  '1',  '3' ), # NF - Site - Python
    ('1',  '1',  '4' ), # NF - Site - AngularJS
    ('1',  '1',  '5' ), # NF - Site - RequireJS
    ('1',  '1',  '6' ), # NF - Site - jQuery
    ('1',  '1',  '7' ), # NF - Site - Javascript
    ('1',  '1',  '8' ), # NF - Site - HTML5
    ('1',  '1',  '9' ), # NF - Site - HTML
    ('1',  '1',  '10'), # NF - Site - CSS
    ('1',  '1',  '11'), # NF - Site - MySQL
    ('1',  '1',  '12'), # NF - Site - SQL
    ('1',  '1',  '13'), # NF - Site - Git
    ('1',  '1',  '14'), # NF - Site - Gimp
    ('1',  '1',  '15'), # NF - Site - steghide
    ('1',  '1',  '16'), # NF - Site - Unix
    ('1',  '1',  '17'), # NF - Site - Linux
    ('1',  '1',  '18'), # NF - Site - Ubuntu
    ('1',  '1',  '19'), # NF - Site - Bash
    ('1',  '1',  '20'), # NF - Site - ftp
    ('1',  '1',  '21'), # NF - Site - Apache
    ('1',  '2',  '22'), # NF - Relay - Sendmail
    ('1',  '2',  '77'), # NF - Relay - Sys Adm
    ('1',  '2',  '78'), # NF - Relay - Sysadmin
    ('1',  '2',  '82'), # NF - Relay - Security
    ('1',  '3',  '23'), # NF - GPG - GPG
    ('1',  '3',  '77'), # NF - GPG - Sys Adm
    ('1',  '3',  '78'), # NF - GPG - Sysadmin
    ('1',  '3',  '82'), # NF - GPG - Security
    ('1',  '4',  '24'), # NF - CVS/Subversion - Subversion
    ('1',  '4',  '85'), # NF - CVS/Subversion - SVN
    ('1',  '4',  '25'), # NF - CVS/Subversion - CVS
    ('1',  '4',  '77'), # NF - CVS/Subversion - Sys Adm
    ('1',  '4',  '78'), # NF - CVS/Subversion - Sysadmin
    ('1',  '5',  '24'), # NF - Subversion - Subversion
    ('1',  '5',  '85'), # NF - Subversion - SVN
    ('1',  '5',  '77'), # NF - Subversion - Sys Adm
    ('1',  '5',  '78'), # NF - Subversion - Sysadmin
    ('1',  '6',  '25'), # NF - CVS - CVS
    ('1',  '6',  '77'), # NF - CVS - Sys Adm
    ('1',  '6',  '78'), # NF - CVS - Sysadmin
    ('1',  '7',  '11'), # NF - Sysadmin - MySQL
    ('1',  '7',  '16'), # NF - Sysadmin - Unix
    ('1',  '7',  '17'), # NF - Sysadmin - Linux
    ('1',  '7',  '18'), # NF - Sysadmin - Ubuntu
    ('1',  '7',  '19'), # NF - Sysadmin - bash
    ('1',  '7',  '20'), # NF - Sysadmin - ftp
    ('1',  '7',  '21'), # NF - Sysadmin - Apache
    ('1',  '7',  '22'), # NF - Sysadmin - Sendmail
    ('1',  '7',  '24'), # NF - Sysadmin - Subversion
    ('1',  '7',  '85'), # NF - Sysadmin - SVN
    ('1',  '7',  '25'), # NF - Sysadmin - CVS
    ('1',  '7',  '26'), # NF - Sysadmin - ksh
    ('1',  '7',  '27'), # NF - Sysadmin - OpenBSD
    ('1',  '7',  '71'), # NF - Sysadmin - BSD
    ('1',  '7',  '28'), # NF - Sysadmin - NFS
    ('1',  '7',  '29'), # NF - Sysadmin - DNS
    ('1',  '7',  '30'), # NF - Sysadmin - Bind
    ('1',  '7',  '31'), # NF - Sysadmin - pf
    ('1',  '7',  '32'), # NF - Sysadmin - Firewall
    ('1',  '7',  '33'), # NF - Sysadmin - NAT
    ('1',  '7',  '34'), # NF - Sysadmin - DHCP
    ('1',  '7',  '35'), # NF - Sysadmin - ssh
    ('1',  '7',  '77'), # NF - Sysadmin - Sys Adm
    ('1',  '7',  '78'), # NF - Sysadmin - Sysadmin
    ('1',  '7',  '82'), # NF - Sysadmin - Security
    ('1',  '8',  '31'), # NF - Firewalls - pf
    ('1',  '8',  '32'), # NF - Firewalls - Firewall
    ('1',  '8',  '33'), # NF - Firewalls - NAT
    ('1',  '8',  '77'), # NF - Firewalls - Sys Adm
    ('1',  '8',  '78'), # NF - Firewalls - Sysadmin
    ('1',  '8',  '82'), # NF - Firewalls - Security

    ##  Atlas
    ('2',  '9',  '3' ), # Atlas - Board - Python
    ('2',  '9',  '7' ), # Atlas - Board - Javascript
    ('2',  '9',  '40'), # Atlas - Board - Jinja2
    ('2',  '9',  '39'), # Atlas - Board - Werkzeug
    ('2',  '9',  '41'), # Atlas - Board - Flask
    ('2',  '9',  '9' ), # Atlas - Board - HTML
    ('2',  '9',  '10'), # Atlas - Board - CSS
    ('2',  '9',  '13'), # Atlas - Board - Git
    ('2',  '9',  '36'), # Atlas - Board - GAE
    ('2',  '9',  '37'), # Atlas - Board - Google App Engine
    ('2',  '9',  '38'), # Atlas - Board - NoSQL
    ('2',  '9',  '16'), # Atlas - Board - Unix
    ('2',  '9',  '17'), # Atlas - Board - Linux
    ('2',  '9',  '18'), # Atlas - Board - Ubuntu
    ('2',  '9',  '19'), # Atlas - Board - bash
    ('2',  '9',  '42'), # Atlas - Board - MVP
    ('2',  '9',  '43'), # Atlas - Board - Minimum Viable Prod
    ('2',  '9',  '44'), # Atlas - Board - Telecommute
    ('2',  '10', '3' ), # Atlas - Ad - Python
    ('2',  '10', '7' ), # Atlas - Ad - Javascript
    ('2',  '10', '40'), # Atlas - Ad - Jinja2
    ('2',  '10', '39'), # Atlas - Ad - Werkzeug
    ('2',  '10', '41'), # Atlas - Ad - Flask
    ('2',  '10', '9' ), # Atlas - Ad - HTML
    ('2',  '10', '10'), # Atlas - Ad - CSS
    ('2',  '10', '13'), # Atlas - Ad - Git
    ('2',  '10', '36'), # Atlas - Ad - GAE
    ('2',  '10', '37'), # Atlas - Ad - Google App Engine
    ('2',  '10', '38'), # Atlas - Ad - NoSQL
    ('2',  '10', '16'), # Atlas - Ad - Unix
    ('2',  '10', '17'), # Atlas - Ad - Linux
    ('2',  '10', '18'), # Atlas - Ad - Ubuntu
    ('2',  '10', '19'), # Atlas - Ad - bash
    ('2',  '10', '42'), # Atlas - Ad - MVP
    ('2',  '10', '43'), # Atlas - Ad - Minimum Viable Prod
    ('2',  '10', '44'), # Atlas - Ad - Telecommute
    ('2',  '11', '3' ), # Atlas - UserDir - Python
    ('2',  '11', '7' ), # Atlas - UserDir - Javascript
    ('2',  '11', '40'), # Atlas - UserDir - Jinja2
    ('2',  '11', '39'), # Atlas - UserDir - Werkzeug
    ('2',  '11', '41'), # Atlas - UserDir - Flask
    ('2',  '11', '9' ), # Atlas - UserDir - HTML
    ('2',  '11', '10'), # Atlas - UserDir - CSS
    ('2',  '11', '13'), # Atlas - UserDir - Git
    ('2',  '11', '36'), # Atlas - UserDir - GAE
    ('2',  '11', '37'), # Atlas - UserDir - Google App Engine
    ('2',  '11', '38'), # Atlas - UserDir - NoSQL
    ('2',  '11', '16'), # Atlas - UserDir - Unix
    ('2',  '11', '17'), # Atlas - UserDir - Linux
    ('2',  '11', '18'), # Atlas - UserDir - Ubuntu
    ('2',  '11', '19'), # Atlas - UserDir - bash
    ('2',  '11', '42'), # Atlas - UserDir - MVP
    ('2',  '11', '43'), # Atlas - UserDir - Minimum Viable Prod
    ('2',  '11', '44'), # Atlas - UserDir - Telecommute
    ('2',  '12', '2' ), # Atlas - History  - Perl
    ('2',  '12', '44'), # Atlas - History - Telecommute
    ('2',  '13', '45'), # Atlas - Radio - Radio
    ('2',  '13', '46'), # Atlas - Radio - IRadio
    ('2',  '13', '47'), # Atlas - Radio - Presentation
    ('2',  '13', '48'), # Atlas - Radio - Public Speaking
    ('2',  '13', '49'), # Atlas - Radio - Promotion
    ('2',  '13', '44'), # Atlas - Radio - Telecommute
    ('2',  '14', '49'), # Atlas - Daily D - Promotion
    ('2',  '14', '50'), # Atlas - Daily D - Copy Writing
    ('2',  '14', '44'), # Atlas - Daily D - Telecommute
    ('2',  '15', '49'), # Atlas - Ebay - Promotion 
    ('2',  '15', '50'), # Atlas - Ebay - Copy Writing
    ('2',  '15', '51'), # Atlas - Ebay - Ebay

    ##  TABS
    ('3',  '16', '47'), # TABS - Edu - Presentation
    ('3',  '16', '48'), # TABS - Edu - Public Speaking
    ('3',  '16', '52'), # TABS - Edu - Education
    ('3',  '17', '2' ), # TABS - Sysadmin - Perl
    ('3',  '17', '16'), # TABS - Sysadmin - Unix
    ('3',  '17', '17'), # TABS - Sysadmin - Linux
    ('3',  '17', '18'), # TABS - Sysadmin - Ubuntu
    ('3',  '17', '19'), # TABS - Sysadmin - Bash
    ('3',  '17', '77'), # TABS - Sysadmin - Sys Adm
    ('3',  '17', '78'), # TABS - Sysadmin - Sysadmin
    ('3',  '18', '16'), # TABS - GPG - Unix
    ('3',  '18', '17'), # TABS - GPG - Linux
    ('3',  '18', '18'), # TABS - GPG - Ubuntu
    ('3',  '18', '19'), # TABS - GPG - Bash
    ('3',  '18', '23'), # TABS - GPG - GPG
    ('3',  '18', '77'), # TABS - GPG - Sys Adm
    ('3',  '18', '78'), # TABS - GPG - Sysadmin
    ('3',  '18', '82'), # TABS - GPG - Security
    ('3',  '19', '17'), # TABS - QA - Linux
    ('3',  '19', '16'), # TABS - QA - Unix
    ('3',  '19', '18'), # TABS - QA - Ubuntu
    ('3',  '19', '19'), # TABS - QA - Bash
    ('3',  '19', '53'), # TABS - QA - C
    ('3',  '19', '13'), # TABS - QA - Git

    ##  RMI
    ('4',  '20', '2' ), # RMI - Parser - Perl
    ('4',  '20', '19'), # RMI - Parser - bash
    ('4',  '20', '35'), # RMI - Parser - ssh
    ('4',  '20', '13'), # RMI - Parser - Mercurial
    ('4',  '20', '57'), # RMI - Parser - Agile
    ('4',  '20', '44'), # RMI - Parser - Telecommute
    ('4',  '21', '2' ), # RMI - Sync - Perl
    ('4',  '21', '54'), # RMI - Sync - Perl DBIx
    ('4',  '21', '55'), # RMI - Sync - Perl Template Toolkit
    ('4',  '21', '7' ), # RMI - Sync - Javascript
    ('4',  '21', '9' ), # RMI - Sync - HTML
    ('4',  '21', '10'), # RMI - Sync - CSS
    ('4',  '21', '11'), # RMI - Sync - MySQL
    ('4',  '21', '12'), # RMI - Sync - SQL
    ('4',  '21', '16'), # RMI - Sync - Unix
    ('4',  '21', '17'), # RMI - Sync - Linux
    ('4',  '21', '18'), # RMI - Sync - Ubuntu
    ('4',  '21', '58'), # RMI - Sync - Mac OS X
    ('4',  '21', '56'), # RMI - Sync - Mercurial
    ('4',  '21', '19'), # RMI - Sync - bash
    ('4',  '21', '35'), # RMI - Sync - ssh
    ('4',  '21', '57'), # RMI - Sync - Agile
    ('4',  '21', '44'), # RMI - Sync - Telecommute
    ('4',  '22', '2' ), # RMI - Client - Perl
    ('4',  '22', '54'), # RMI - Client - Perl DBIx
    ('4',  '22', '55'), # RMI - Client - Perl Template Toolkit
    ('4',  '22', '7' ), # RMI - Client - Javascript
    ('4',  '22', '9' ), # RMI - Client - HTML
    ('4',  '22', '10'), # RMI - Client - CSS
    ('4',  '22', '59'), # RMI - Client - LaTeX
    ('4',  '22', '11'), # RMI - Client - MySQL
    ('4',  '22', '12'), # RMI - Client - SQL
    ('4',  '22', '16'), # RMI - Client - Unix
    ('4',  '22', '17'), # RMI - Client - Linux
    ('4',  '22', '18'), # RMI - Client - Ubuntu
    ('4',  '22', '58'), # RMI - Client - Mac OS X
    ('4',  '22', '56'), # RMI - Client - Mercurial
    ('4',  '22', '19'), # RMI - Client - bash
    ('4',  '22', '35'), # RMI - Client - ssh
    ('4',  '22', '57'), # RMI - Client - Agile
    ('4',  '22', '44'), # RMI - Client - Telecommute

    ##  Sectra
    ('6',  '23', '60'), # Sectra - Sysadmin - Nagios
    ('6',  '23', '2' ), # Sectra - Sysadmin - Perl
    ('6',  '23', '16'), # Sectra - Sysadmin - Unix
    ('6',  '23', '17'), # Sectra - Sysadmin - Linux
    ('6',  '23', '18'), # Sectra - Sysadmin - Ubuntu
    ('6',  '23', '27'), # Sectra - Sysadmin - OpenBSD
    ('6',  '23', '71'), # Sectra - Sysadmin - BSD
    ('6',  '23', '19'), # Sectra - Sysadmin - bash
    ('6',  '23', '35'), # Sectra - Sysadmin - ssh
    ('6',  '23', '77'), # Sectra - Sysadmin - Sys Adm
    ('6',  '23', '78'), # Sectra - Sysadmin - Sysadmin
    ('6',  '24', '60'), # Sectra - Deploy - Nagios
    ('6',  '24', '2' ), # Sectra - Deploy - Perl
    ('6',  '24', '16'), # Sectra - Deploy - Unix
    ('6',  '24', '17'), # Sectra - Deploy - Linux
    ('6',  '24', '18'), # Sectra - Deploy - Ubuntu
    ('6',  '24', '27'), # Sectra - Deploy - OpenBSD
    ('6',  '24', '71'), # Sectra - Deploy - BSD
    ('6',  '24', '19'), # Sectra - Deploy - bash
    ('6',  '24', '35'), # Sectra - Deploy - ssh
    ('6',  '24', '77'), # Sectra - Deploy - Sys Adm
    ('6',  '24', '78'), # Sectra - Deploy - Sysadmin
    ('6',  '25', '60'), # Sectra - Skin - Nagios
    ('6',  '25', '61'), # Sectra - Skin - C++
    ('6',  '25', '16'), # Sectra - Skin - Unix
    ('6',  '25', '17'), # Sectra - Skin - Linux
    ('6',  '25', '18'), # Sectra - Skin - Ubuntu
    ('6',  '25', '27'), # Sectra - Skin - OpenBSD
    ('6',  '25', '71'), # Sectra - Skin - BSD
    ('6',  '25', '19'), # Sectra - Skin - bash
    ('6',  '25', '35'), # Sectra - Skin - ssh
    ('6',  '51', '60'), # Sectra - Tiered - Nagios
    ('6',  '51', '2' ), # Sectra - Tiered - Perl
    ('6',  '51', '16'), # Sectra - Tiered - Unix
    ('6',  '51', '17'), # Sectra - Tiered - Linux
    ('6',  '51', '18'), # Sectra - Tiered - Ubuntu
    ('6',  '51', '27'), # Sectra - Tiered - OpenBSD
    ('6',  '51', '71'), # Sectra - Tiered - BSD
    ('6',  '51', '19'), # Sectra - Tiered - bash
    ('6',  '51', '35'), # Sectra - Tiered - ssh
    ('6',  '51', '77'), # Sectra - Tiered - Sys Adm
    ('6',  '51', '78'), # Sectra - Tiered - Sysadmin
    ('6',  '52', '60'), # Sectra - Links - Nagios
    ('6',  '52', '2' ), # Sectra - Links - Perl
    ('6',  '52', '16'), # Sectra - Links - Unix
    ('6',  '52', '17'), # Sectra - Links - Linux
    ('6',  '52', '18'), # Sectra - Links - Ubuntu
    ('6',  '52', '27'), # Sectra - Links - OpenBSD
    ('6',  '52', '71'), # Sectra - Links - BSD
    ('6',  '52', '19'), # Sectra - Links - bash
    ('6',  '52', '35'), # Sectra - Links - ssh
    ('6',  '52', '77'), # Sectra - Links - Sys Adm
    ('6',  '52', '78'), # Sectra - Links - Sysadmin

    ##  Cablevision
    ('7',  '26', '62'), # Cablevision - Sigma - Java
    ('7',  '26', '63'), # Cablevision - Sigma - JSP
    ('7',  '26', '7' ), # Cablevision - Sigma - Javascript
    ('7',  '26', '11'), # Cablevision - Sigma - MySQL
    ('7',  '26', '12'), # Cablevision - Sigma - SQL
    ('7',  '26', '2' ), # Cablevision - Sigma - Perl
    ('7',  '26', '17'), # Cablevision - Sigma - Linux
    ('7',  '26', '18'), # Cablevision - Sigma - Ubuntu
    ('7',  '26', '16'), # Cablevision - Sigma - Unix
    ('7',  '26', '27'), # Cablevision - Sigma - OpenBSD
    ('7',  '26', '71'), # Cablevision - Sigma - BSD
    ('7',  '26', '19'), # Cablevision - Sigma - bash
    ('7',  '26', '26'), # Cablevision - Sigma - ksh
    ('7',  '26', '24'), # Cablevision - Sigma - Subversion
    ('7',  '26', '85'), # Cablevision - Sigma - SVN
    ('7',  '27', '11'), # Cablevision - Sysadmin - MySQL
    ('7',  '27', '17'), # Cablevision - Sysadmin - Linux
    ('7',  '27', '18'), # Cablevision - Sysadmin - Ubuntu
    ('7',  '27', '16'), # Cablevision - Sysadmin - Unix
    ('7',  '27', '27'), # Cablevision - Sysadmin - OpenBSD
    ('7',  '27', '71'), # Cablevision - Sysadmin - BSD
    ('7',  '27', '19'), # Cablevision - Sysadmin - bash
    ('7',  '27', '26'), # Cablevision - Sysadmin - ksh
    ('7',  '27', '24'), # Cablevision - Sysadmin - Subversion
    ('7',  '27', '85'), # Cablevision - Sysadmin - SVN
    ('7',  '27', '64'), # Cablevision - Sysadmin - Tomcat
    ('7',  '27', '21'), # Cablevision - Sysadmin - Apache
    ('7',  '27', '65'), # Cablevision - Sysadmin - Samba
    ('7',  '27', '66'), # Cablevision - Sysadmin - Jabber
    ('7',  '27', '77'), # Cablevision - Sysadmin - Sys Adm
    ('7',  '27', '78'), # Cablevision - Sysadmin - Sysadmin
    ('7',  '27', '82'), # Cablevision - Sysadmin - Security
    ('7',  '28', '62'), # Cablevision - EnvSep - Java
    ('7',  '28', '63'), # Cablevision - EnvSep - JSP
    ('7',  '28', '7' ), # Cablevision - EnvSep - Javascript
    ('7',  '28', '11'), # Cablevision - EnvSep - MySQL
    ('7',  '28', '2' ), # Cablevision - EnvSep - Perl
    ('7',  '28', '17'), # Cablevision - EnvSep - Linux
    ('7',  '28', '18'), # Cablevision - EnvSep - Ubuntu
    ('7',  '28', '16'), # Cablevision - EnvSep - Unix
    ('7',  '28', '27'), # Cablevision - EnvSep - OpenBSD
    ('7',  '28', '71'), # Cablevision - EnvSep - BSD
    ('7',  '28', '19'), # Cablevision - EnvSep - bash
    ('7',  '28', '26'), # Cablevision - EnvSep - ksh
    ('7',  '28', '24'), # Cablevision - EnvSep - Subversion
    ('7',  '28', '85'), # Cablevision - EnvSep - SVN
    ('7',  '28', '64'), # Cablevision - EnvSep - Tomcat
    ('7',  '28', '21'), # Cablevision - EnvSep - Apache
    ('7',  '28', '77'), # Cablevision - EnvSep - Sys Adm
    ('7',  '28', '78'), # Cablevision - EnvSep - Sysadmin
    ('7',  '29', '2' ), # Cablevision - Distro - Perl
    ('7',  '29', '17'), # Cablevision - Distro - Linux
    ('7',  '29', '18'), # Cablevision - Distro - Ubuntu
    ('7',  '29', '16'), # Cablevision - Distro - Unix
    ('7',  '29', '27'), # Cablevision - Distro - OpenBSD
    ('7',  '29', '71'), # Cablevision - Distro - BSD
    ('7',  '29', '19'), # Cablevision - Distro - bash
    ('7',  '29', '26'), # Cablevision - Distro - ksh
    ('7',  '29', '24'), # Cablevision - Distro - Subversion
    ('7',  '29', '85'), # Cablevision - Distro - SVN
    ('7',  '29', '64'), # Cablevision - Distro - Tomcat
    ('7',  '29', '21'), # Cablevision - Distro - Apache
    ('7',  '29', '77'), # Cablevision - Distro - Sys Adm
    ('7',  '29', '78'), # Cablevision - Distro - Sysadmin
    ('7',  '30', '11'), # Cablevision - Backup - MySQL
    ('7',  '30', '2' ), # Cablevision - Backup - Perl
    ('7',  '30', '17'), # Cablevision - Backup - Linux
    ('7',  '30', '18'), # Cablevision - Backup - Ubuntu
    ('7',  '30', '16'), # Cablevision - Backup - Unix
    ('7',  '30', '27'), # Cablevision - Backup - OpenBSD
    ('7',  '30', '71'), # Cablevision - Backup - BSD
    ('7',  '30', '19'), # Cablevision - Backup - bash
    ('7',  '30', '26'), # Cablevision - Backup - ksh
    ('7',  '30', '24'), # Cablevision - Backup - Subversion
    ('7',  '30', '85'), # Cablevision - Backup - SVN
    ('7',  '30', '67'), # Cablevision - Backup - cron
    ('7',  '30', '77'), # Cablevision - Backup - Sys Adm
    ('7',  '30', '78'), # Cablevision - Backup - Sysadmin
    ('7',  '31', '62'), # Cablevision - Lottery - Java
    ('7',  '31', '63'), # Cablevision - Lottery - JSP
    ('7',  '31', '7' ), # Cablevision - Lottery - Javascript
    ('7',  '31', '11'), # Cablevision - Lottery - MySQL
    ('7',  '31', '12'), # Cablevision - Lottery - SQL
    ('7',  '31', '2' ), # Cablevision - Lottery - Perl
    ('7',  '31', '17'), # Cablevision - Lottery - Linux
    ('7',  '31', '18'), # Cablevision - Lottery - Ubuntu
    ('7',  '31', '16'), # Cablevision - Lottery - Unix
    ('7',  '31', '27'), # Cablevision - Lottery - OpenBSD
    ('7',  '31', '71'), # Cablevision - Lottery - BSD
    ('7',  '31', '19'), # Cablevision - Lottery - bash
    ('7',  '31', '26'), # Cablevision - Lottery - ksh
    ('7',  '31', '24'), # Cablevision - Lottery - Subversion
    ('7',  '31', '85'), # Cablevision - Lottery - SVN
    ('7',  '53', '62'), # Cablevision - Security - Java
    ('7',  '53', '63'), # Cablevision - Security - JSP
    ('7',  '53', '11'), # Cablevision - Security - MySQL
    ('7',  '53', '12'), # Cablevision - Security - SQL
    ('7',  '53', '17'), # Cablevision - Security - Linux
    ('7',  '53', '18'), # Cablevision - Security - Ubuntu
    ('7',  '53', '16'), # Cablevision - Security - Unix
    ('7',  '53', '27'), # Cablevision - Security - OpenBSD
    ('7',  '53', '71'), # Cablevision - Security - BSD
    ('7',  '53', '19'), # Cablevision - Security - bash
    ('7',  '53', '26'), # Cablevision - Security - ksh
    ('7',  '53', '24'), # Cablevision - Security - Subversion
    ('7',  '53', '85'), # Cablevision - Security - SVN
    ('7',  '53', '82'), # Cablevision - Security - Security
    ('7',  '54', '16'), # Cablevision - Kernel - Unix
    ('7',  '54', '27'), # Cablevision - Kernel - OpenBSD
    ('7',  '54', '71'), # Cablevision - Kernel - BSD
    ('7',  '54', '19'), # Cablevision - Kernel - bash
    ('7',  '54', '26'), # Cablevision - Kernel - ksh

    ##  Adeptra
    ('8',  '32', '2' ), # Adeptra - NagiosMonitor - Perl
    ('8',  '32', '16'), # Adeptra - NagiosMonitor - Unix
    ('8',  '32', '17'), # Adeptra - NagiosMonitor - Linux
    ('8',  '32', '18'), # Adeptra - NagiosMonitor - Ubuntu
    ('8',  '32', '27'), # Adeptra - NagiosMonitor - OpenBSD
    ('8',  '32', '71'), # Adeptra - NagiosMonitor - BSD
    ('8',  '32', '19'), # Adeptra - NagiosMonitor - bash
    ('8',  '32', '26'), # Adeptra - NagiosMonitor - ksh
    ('8',  '32', '35'), # Adeptra - NagiosMonitor - ssh
    ('8',  '32', '60'), # Adeptra - NagiosMonitor - Nagios
    ('8',  '32', '44'), # Adeptra - NagiosMonitor - Telecommute
    ('8',  '33', '2' ), # Adeptra - NagiosScript - Perl
    ('8',  '33', '16'), # Adeptra - NagiosScript - Unix
    ('8',  '33', '17'), # Adeptra - NagiosScript - Linux
    ('8',  '33', '18'), # Adeptra - NagiosScript - Ubuntu
    ('8',  '33', '27'), # Adeptra - NagiosScript - OpenBSD
    ('8',  '33', '71'), # Adeptra - NagiosScript - BSD
    ('8',  '33', '19'), # Adeptra - NagiosScript - bash
    ('8',  '33', '26'), # Adeptra - NagiosScript - ksh
    ('8',  '33', '35'), # Adeptra - NagiosScript - ssh
    ('8',  '33', '60'), # Adeptra - NagiosScript - Nagios
    ('8',  '33', '44'), # Adeptra - NagiosScript - Telecommute
    ('8',  '33', '77'), # Adeptra - NagiosScript - Sys Adm
    ('8',  '33', '78'), # Adeptra - NagiosScript - Sysadmin

    ##  Micropatent
    ('9',  '34', '2' ), # Micropatent - Search - Perl
    ('9',  '34', '16'), # Micropatent - Search - Unix
    ('9',  '34', '17'), # Micropatent - Search - Linux
    ('9',  '34', '19'), # Micropatent - Search - bash
    ('9',  '34', '26'), # Micropatent - Search - ksh
    ('9',  '34', '25'), # Micropatent - Search - CVS
    ('9',  '35', '2' ), # Micropatent - Deploy - Perl
    ('9',  '35', '16'), # Micropatent - Deploy - Unix
    ('9',  '35', '17'), # Micropatent - Deploy - Linux
    ('9',  '35', '68'), # Micropatent - Deploy - Solaris
    ('9',  '35', '19'), # Micropatent - Deploy - bash
    ('9',  '35', '26'), # Micropatent - Deploy - ksh
    ('9',  '35', '25'), # Micropatent - Deploy - CVS
    ('9',  '35', '77'), # Micropatent - Deploy - Sys Adm
    ('9',  '35', '78'), # Micropatent - Deploy - Sysadmin
    ('9',  '36', '2' ), # Micropatent - Nagios - Perl
    ('9',  '36', '16'), # Micropatent - Nagios - Unix
    ('9',  '36', '17'), # Micropatent - Nagios - Linux
    ('9',  '36', '68'), # Micropatent - Nagios - Solaris
    ('9',  '36', '19'), # Micropatent - Nagios - bash
    ('9',  '36', '26'), # Micropatent - Nagios - ksh
    ('9',  '36', '60'), # Micropatent - Nagios - Nagios
    ('9',  '36', '69'), # Micropatent - Nagios - SNMP
    ('9',  '36', '77'), # Micropatent - Nagios - Sys Adm
    ('9',  '36', '78'), # Micropatent - Nagios - Sysadmin
    ('9',  '37', '2' ), # Micropatent - Recorder - Perl
    ('9',  '37', '16'), # Micropatent - Recorder - Unix
    ('9',  '37', '17'), # Micropatent - Recorder - Linux
    ('9',  '37', '19'), # Micropatent - Recorder - bash
    ('9',  '37', '26'), # Micropatent - Recorder - ksh
    ('9',  '37', '25'), # Micropatent - Recorder - CVS
    ('9',  '37', '9' ), # Micropatent - Recorder - HTML
    ('9',  '37', '10'), # Micropatent - Recorder - CSS
    ('9',  '37', '7' ), # Micropatent - Recorder - Javascript
    ('9',  '38', '16'), # Micropatent - Backup - Unix
    ('9',  '38', '17'), # Micropatent - Backup - Linux
    ('9',  '38', '19'), # Micropatent - Backup - bash
    ('9',  '38', '26'), # Micropatent - Backup - ksh
    ('9',  '38', '77'), # Micropatent - Backup - Sys Adm
    ('9',  '38', '78'), # Micropatent - Backup - Sysadmin
    ('9',  '55', '16'), # Micropatent - Backup - Unix
    ('9',  '55', '17'), # Micropatent - Backup - Linux
    ('9',  '55', '83'), # Micropatent - Backup - Red Hat
    ('9',  '55', '19'), # Micropatent - Backup - bash
    ('9',  '55', '26'), # Micropatent - Backup - ksh
    ('9',  '55', '21'), # Micropatent - Backup - Apache
    ('9',  '55', '77'), # Micropatent - Backup - Sys Adm
    ('9',  '55', '78'), # Micropatent - Backup - Sysadmin

    ##  Protometrix
    ('10', '39', '47'), # Protometrix - R&D - Presentation
    ('10', '39', '49'), # Protometrix - R&D - Public Speaking
    ('10', '40', '16'), # Protometrix - Servers - Unix
    ('10', '40', '70'), # Protometrix - Servers - FreeBSD
    ('10', '40', '71'), # Protometrix - Servers - BSD
    ('10', '40', '26'), # Protometrix - Servers - ksh
    ('10', '40', '25'), # Protometrix - Servers - CVS
    ('10', '40', '21'), # Protometrix - Servers - Apache
    ('10', '40', '77'), # Protometrix - Servers - Sys Adm
    ('10', '40', '78'), # Protometrix - Servers - Sysadmin
    ('10', '40', '82'), # Protometrix - Servers - Security
    ('10', '41', '2' ), # Protometrix - CVS - Perl
    ('10', '41', '16'), # Protometrix - CVS - Unix
    ('10', '41', '70'), # Protometrix - CVS - FreeBSD
    ('10', '41', '71'), # Protometrix - CVS - BSD
    ('10', '41', '26'), # Protometrix - CVS - ksh
    ('10', '41', '25'), # Protometrix - CVS - CVS
    ('10', '41', '77'), # Protometrix - CVS - Sys Adm
    ('10', '41', '78'), # Protometrix - CVS - Sysadmin
    ('10', '42', '2' ), # Protometrix - DNA QA - Perl
    ('10', '42', '9' ), # Protometrix - DNA QA - HTML
    ('10', '42', '16'), # Protometrix - DNA QA - Unix
    ('10', '42', '70'), # Protometrix - DNA QA - FreeBSD
    ('10', '42', '71'), # Protometrix - DNA QA - BSD
    ('10', '42', '26'), # Protometrix - DNA QA - ksh
    ('10', '42', '25'), # Protometrix - DNA QA - CVS
    ('10', '42', '76'), # Protometrix - DNA QA - Bioinformatics
    ('10', '56', '2' ), # Protometrix - DNA Track - Perl
    ('10', '56', '9' ), # Protometrix - DNA Track - HTML
    ('10', '56', '16'), # Protometrix - DNA Track - Unix
    ('10', '56', '70'), # Protometrix - DNA Track - FreeBSD
    ('10', '56', '71'), # Protometrix - DNA Track - BSD
    ('10', '56', '26'), # Protometrix - DNA Track - ksh
    ('10', '56', '25'), # Protometrix - DNA Track - CVS
    ('10', '56', '76'), # Protometrix - DNA Track - Bioinformatics

    ##  DSL
    ('11', '57', '2' ), # DSL - Merge - Perl
    ('11', '57', '16'), # DSL - Merge - Unix
    ('11', '57', '71'), # DSL - Merge - BSD
    ('11', '57', '70'), # DSL - Merge - FreeBSD
    ('11', '57', '26'), # DSL - Merge - ksh
    ('11', '57', '25'), # DSL - Merge - CVS

    ##  Curagen
    ('12', '43', '2' ), # Curagen - Codebase - Perl
    ('12', '43', '16'), # Curagen - Codebase - Unix
    ('12', '43', '17'), # Curagen - Codebase - Linux
    ('12', '43', '26'), # Curagen - Codebase - ksh
    ('12', '43', '73'), # Curagen - Codebase - Oracle
    ('12', '43', '12'), # Curagen - Codebase - SQL
    ('12', '43', '25'), # Curagen - Codebase - CVS
    ('12', '43', '76'), # Curagen - Codebase - Bioinformatics
    ('12', '44', '47'), # Curagen - Board - Presentation
    ('12', '44', '48'), # Curagen - Board - Public Speaking
    ('12', '45', '2' ), # Curagen - LOB - Perl
    ('12', '45', '72'), # Curagen - LOB - DBI
    ('12', '45', '16'), # Curagen - LOB - Unix
    ('12', '45', '17'), # Curagen - LOB - Linux
    ('12', '45', '26'), # Curagen - LOB - ksh
    ('12', '45', '73'), # Curagen - LOB - Oracle
    ('12', '45', '12'), # Curagen - LOB - SQL
    ('12', '45', '25'), # Curagen - LOB - CVS
    ('12', '46', '16'), # Curagen - PL/SQL - Unix
    ('12', '46', '17'), # Curagen - PL/SQL - Linux
    ('12', '46', '26'), # Curagen - PL/SQL - ksh
    ('12', '46', '73'), # Curagen - PL/SQL - Oracle
    ('12', '46', '12'), # Curagen - PL/SQL - SQL
    ('12', '46', '74'), # Curagen - PL/SQL - Oracle PL/SQL
    ('12', '46', '75'), # Curagen - PL/SQL - PL/SQL
    ('12', '46', '25'), # Curagen - PL/SQL - CVS
    ('12', '46', '76'), # Curagen - PL/SQL - Bioinformatics
    ('12', '47', '2' ), # Curagen - DNA - Perl
    ('12', '47', '16'), # Curagen - DNA - Unix
    ('12', '47', '17'), # Curagen - DNA - Linux
    ('12', '47', '26'), # Curagen - DNA - ksh
    ('12', '47', '73'), # Curagen - DNA - Oracle
    ('12', '47', '12'), # Curagen - DNA - SQL
    ('12', '47', '25'), # Curagen - DNA - CVS
    ('12', '47', '76'), # Curagen - DNA - Bioinformatics
    ('12', '58', '2' ), # Curagen - DNA - Perl
    ('12', '58', '16'), # Curagen - DNA - Unix
    ('12', '58', '17'), # Curagen - DNA - Linux
    ('12', '58', '26'), # Curagen - DNA - ksh
    ('12', '58', '73'), # Curagen - DNA - Oracle
    ('12', '58', '12'), # Curagen - DNA - SQL
    ('12', '58', '76'), # Curagen - DNA - Bioinformatics

    ##  AT&T
    ('13', '45', '2' ), # AT&T - LOB - Perl
    ('13', '45', '72'), # AT&T - LOB - DBI
    ('13', '45', '16'), # AT&T - LOB - Unix
    ('13', '45', '68'), # AT&T - LOB - Solaris
    ('13', '45', '26'), # AT&T - LOB - ksh
    ('13', '45', '73'), # AT&T - LOB - Oracle
    ('13', '45', '12'), # AT&T - LOB - SQL
    ('13', '45', '84'), # AT&T - LOB - ClearCase
    ('13', '59', '2' ), # AT&T - Package - Perl
    ('13', '59', '16'), # AT&T - Package - Unix
    ('13', '59', '68'), # AT&T - Package - Solaris
    ('13', '59', '26'), # AT&T - Package - ksh
    ('13', '59', '84'), # AT&T - Package - ClearCase
    ('13', '60', '2' ), # AT&T - Pages - Perl
    ('13', '60', '16'), # AT&T - Pages - Unix
    ('13', '60', '68'), # AT&T - Pages - Solaris
    ('13', '60', '26'), # AT&T - Pages - ksh
    ('13', '60', '73'), # AT&T - Pages - Oracle
    ('13', '60', '12'), # AT&T - Pages - SQL
    ('13', '60', '84'), # AT&T - Pages - ClearCase

    ##  Smartworld
    ('14', '48', '2' ), # Smartworld - Order - Perl
    ('14', '48', '9' ), # Smartworld - Order - HTML
    ('14', '48', '11'), # Smartworld - Order - MySQL
    ('14', '48', '12'), # Smartworld - Order - SQL
    ('14', '48', '16'), # Smartworld - Order - Unix
    ('14', '48', '68'), # Smartworld - Order - Solaris
    ('14', '48', '19'), # Smartworld - Order - bash
    ('14', '48', '81'), # Smartworld - Order - RCS
    ('14', '49', '2' ), # Smartworld - Outage - Perl
    ('14', '49', '9' ), # Smartworld - Outage - HTML
    ('14', '49', '16'), # Smartworld - Outage - Unix
    ('14', '49', '68'), # Smartworld - Outage - Solaris
    ('14', '49', '19'), # Smartworld - Outage - bash
    ('14', '49', '81'), # Smartworld - Outage - RCS
    ('14', '50', '11'), # Smartworld - Radius - MySQL
    ('14', '50', '12'), # Smartworld - Radius - SQL
    ('14', '50', '16'), # Smartworld - Radius - Unix
    ('14', '50', '68'), # Smartworld - Radius - Solaris
    ('14', '50', '19'), # Smartworld - Radius - bash
    ('14', '50', '81'), # Smartworld - Radius - RCS
    ('14', '50', '53'), # Smartworld - Radius - C
    ('14', '50', '79'), # Smartworld - Radius - Radius
    ('14', '50', '80'), # Smartworld - Radius - LDAP
    ('14', '50', '82'), # Smartworld - Radius - Security

    ##  Trak
    ('15', '61', '53'), # Trak - GNU - C
    ('15', '61', '16'), # Trak - GNU - Unix
    ('15', '61', '26'), # Trak - GNU - ksh
    ('15', '62', '53'), # Trak - Flat - C
    ('15', '62', '16'), # Trak - Flat - Unix
    ('15', '62', '26'), # Trak - Flat - ksh
    ('15', '63', '53'), # Trak - Trak - C
    ('15', '63', '16'), # Trak - Trak - Unix
    ('15', '63', '26'), # Trak - Trak - ksh

    ##  ERS
    ('16', '64', '61'), # ERS - Unit - C++
    ('16', '65', '61'), # ERS - EPMS - C++

    ##  TWAS
    ('17', '66', '2'),  # TWAS - Nagios Backup - Perl
    ('17', '66', '67'), # TWAS - Nagios Backup - cron
    ('17', '66', '26'), # TWAS - Nagios Backup - ksh
    ('17', '66', '60'), # TWAS - Nagios Backup - Nagios
    ('17', '67', '16'), # TWAS - Nagios - Unix
    ('17', '67', '27'), # TWAS - Nagios - OpenBSD
    ('17', '67', '71'), # TWAS - Nagios - BSD
    ('17', '67', '21'), # TWAS - Nagios - Apache
    ('17', '67', '60'), # TWAS - Nagios - Nagios
    ('17', '67', '77'), # TWAS - Nagios - System Administration
    ('17', '67', '78'); # TWAS - Nagios - Sysadmin
