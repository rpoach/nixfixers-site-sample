#!/usr/bin/env perl
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
use strict;
use CGI;
use JSON;
use DBI;
use lib ('lib');
use nfSiteJson;
use nfSiteMysqlConn;


#  Get the default JSON response
my $responseObj = NfJsonResponse->new
    or die 'Can not get a new JSON response object.';
my $response = $responseObj->getNewResponse
    or die 'Can not get a new JSON response.';

#  Get a new db connection
my $connObj = NfDbConnection->new
    or die 'Can not get a new database connection object.';
my $conn = $connObj->getNewConnection
    or die 'Can not get a new database connection.';

#  Select all of the skill info
my $query = 'SELECT a.id, a.skill ' .
            'FROM skill AS a ' .
            'ORDER BY a.skill';

#  Run the query
my $prep = $conn->prepare($query)
    or die 'Skill fetch prep failed: ' . $DBI::errstr;
$prep->execute()
    or die 'Skill fetch prep failed: ' . $DBI::errstr;

#  Process each returned row
my @skills = ();
my $row;
while ($row = $prep->fetchrow_hashref) {
    push(@skills, $row);
}

#  Add the skills array to the response
$response->{'data'}->{'numRecords'} = $prep->rows;
$response->{'data'}->{'skills'} = \@skills;

#  Disconnect
$conn->disconnect;

#  Return the data
my $q = CGI->new;
print $q->header('application/json');
print to_json($response);

