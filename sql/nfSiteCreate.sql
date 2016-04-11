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

create database if not exists nixfixers_site_v_1;


use nixfixers_site_v_1;


create table location (
    id int(10) not null,
    location varchar(64) not null,
    sort_order int(10) not null,
    primary key (id)
);


create table reviewer (
    id int(10) not null,
    last_name varchar(64) not null,
    first_name varchar(64) not null,
    title varchar(4),
    orig_location_id int(10) not null,
    orig_role varchar(64) not null,
    curr_location varchar(64),
    curr_role varchar(64),
    primary key (id),
    foreign key (orig_location_id) references location(id)
);


create table review (
    id int(10) not null auto_increment,
    review text not null,
    reviewer_id int(10) not null,
    primary key (id),
    foreign key (reviewer_id) references reviewer(id)
);


create table skill (
    id int(10) not null,
    skill varchar(64) not null,
    primary key (id),
    unique key (skill)
);


create table project (
    id int(10) not null,
    project text not null,
    primary key (id)
);


create table resume (
    id int(10) not null auto_increment,
    location_id int(10) not null,
    project_id int(10) not null,
    skill_id int(10) not null,
    primary key (id),
    foreign key (location_id) references location(id),
    foreign key (project_id) references project(id),
    foreign key (skill_id) references skill(id)
);
