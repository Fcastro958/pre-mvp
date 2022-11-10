DROP TABLE IF EXISTS cruise CASCADE;
DROP TABLE IF EXISTS passengers;


CREATE TABLE cruise(
    cruise_id serial,
    PRIMARY KEY(cruise_id),
    name varchar
);

CREATE TABLE passengers(
    passenger_id serial,
    PRIMARY KEY(passenger_id),
    name varchar,
    age integer,
    cruise_id integer,
    FOREIGN KEY(cruise_id)
    REFERENCES cruise(cruise_id) ON DELETE CASCADE
);
