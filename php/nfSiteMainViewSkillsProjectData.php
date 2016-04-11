<?php
    /*

    Copyright (c) 2016, #!/nixfixers
    All rights reserved.

    Redistribution and use in source and binary forms, with or without modification,
    are permitted provided that the following conditions are met:

    1. Redistributions of source code must retain the above copyright notice,
       this list of conditions and the following disclaimer.

    2. Redistributions in binary form must reproduce the above copyright notice,
       this list of conditions and the following disclaimer in the documentation
       and/or other materials provided with the distribution.

    3. Neither the name of the copyright holder nor the names of its contributors
       may be used to endorse or promote products derived from this software
       without specific prior written permission.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
    AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
    THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
    IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY
    DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
    (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
    LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
    HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
    (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
    EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

    */

    include('lib/nfSiteJson.php');
    include('lib/nfSiteMysqlConn.php');

    //  Get the default JSON response
    try {
        $responseObj = new NfJsonResponse();
        $response = $responseObj->getNewResponse();
    }
    catch (Exception $e) {
        error_log('Can not get a new JSON response: ' . $e->getMessage());
    }

    //  If a valid skill posted
    $skill = $_POST['skill'];

    //  Get a new db connection
    try {
        $connObj = new NfDbConnection();
        $conn = $connObj->getNewConnection();
    }
    catch (Exception $e) {
        error_log('Can not get a new database connection: ' . $e->getMessage() .
                  ' - ' . $conn->connect_error);
    }

    //  Select all of the resume info related to skill
    $query = 'SELECT c.id, c.location, ' .
                    'd.project ' .
             'FROM skill AS a ' .
             'INNER JOIN resume AS b ON a.id = b.skill_id ' .
             'INNER JOIN location AS c ON c.id = b.location_id ' .
             'INNER JOIN project AS d ON d.id = b.project_id ' .
             'WHERE a.skill = ? ' .
             'ORDER BY c.id, d.project';

    //  Prepare the query and bind the variable
    $statement = $conn->prepare($query);
    $statement->bind_param('s', $skill);

    //  Run the query
    try {
        $statement->execute();
    }
    catch (Exception $e) {
        error_log('Skill fetch failed: ' . $e->getMessage() .
                  ' - ' . $conn->connect_error);
    }

    //  Process each returned row
    $locations = array();
    $statement->bind_result($dbId, $locName, $project);
    $location = NULL;
    $lastDbId = '';
    $rows = 0;
    while($statement->fetch()) {
        //  If a new location
        if ($lastDbId !== $dbId) {
            $lastDbId = $dbId;
            if ($location) {
                array_push($locations, $location);
            }
            $location = array();
            $location['dbId'] = $dbId;
            $location['location'] = $locName;
            $location['projects'] = array();
        }
        array_push($location['projects'], $project);
        $rows++;
    }
    //  Push the last project
    if ($location) {
        array_push($locations, $location);
    }

    //  Add the project array to the response
    $response['data']['numRecords'] = $rows;
    $response['data']['locations'] = $locations;

    //  Disconnect
    $conn->close();

    //  Return the data
    header('Content-type: application/json');
    echo json_encode($response);
?>
