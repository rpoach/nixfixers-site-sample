#!/usr/bin/env python
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
import json
import logging
import sys

sys.path.insert(0, './lib')
from nfSiteJson import NfJsonResponse
from nfSiteMysqlConn import NfDbConnection

logger = logging.getLogger()

#  Get the default JSON response
try:
    response = NfJsonResponse.getNewResponse()
except Exception as err:
    logger.error('Can not get a new JSON response: ' + str(err))

#  Get a new db connection
try:
    conn = NfDbConnection.getNewConnection()
    cursor = conn.cursor()
except Exception as err:
    logger.error('Can not get a new database connection: ' + str(err))

#  Select all of the skill info
query =  'SELECT a.id, a.skill '
query += 'FROM skill AS a '
query += 'ORDER BY a.skill'

#  Run the query
try:
    cursor.execute(query)
except Exception as err:
    logger.error('Skill fetch failed: ' + str(err))

#  Add the skills array to the response
response['data']['skills'] = [row for row in cursor]
response['data']['numRecords'] = cursor.rowcount

#  Disconnect
conn.close()

#  Return the data
print 'Content-Type: application/json;charset=utf-8\n\n'
print json.dumps(response)
