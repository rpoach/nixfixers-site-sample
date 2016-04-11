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

    //  Get a new db connection
    try {
        $connObj = new NfDbConnection();
        $conn = $connObj->getNewConnection();
    }
    catch (Exception $e) {
        error_log('Can not get a new database connection: ' . $e->getMessage() .
                  ' - ' . $conn->connect_error);
    }

    //  Select all of the review info
    $query = 'SELECT a.review, ' .
                    'b.last_name, b.first_name, b.title, b.orig_role, b.curr_location, b.curr_role, ' .
                    'c.location ' .
             'FROM review AS a ' .
             'INNER JOIN reviewer AS b ON a.reviewer_id = b.id ' .
             'INNER JOIN location AS c ON b.orig_location_id = c.id ' .
             'ORDER BY RAND()';

    //  Run the query
    try {
        $result = $conn->query($query);
    }
    catch (Exception $e) {
        error_log('Review fetch failed: ' . $e->getMessage() .
                  ' - ' . $conn->connect_error);
    }

    //  Process each returned row
    $reviews = array();
    while($row = $result->fetch_assoc()) {
        //  Define a new review
        $review = array();

        //  Copy the values
        foreach ($row as $key => $val) {
            $review[$key] = $val;
        }

        //  Add the review
        array_push($reviews, $review);
    }

    //  Add the reviews array to the response
    $response['data']['numRecords'] = $result->num_rows;
    $response['data']['reviews'] = $reviews;

    //  Disconnect
    $conn->close();

    //  Return the data
    header('Content-type: application/json');
    echo json_encode($response);
?>
