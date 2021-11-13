DELIMITER //
CREATE PROCEDURE k7(v_K int)
BEGIN
TRUNCATE groups_match;
-- initialize cluster centers
INSERT INTO groups_match (email,lat, lng,profession,age) SELECT email_ID,lat, lng ,profession, age FROM users1 LIMIT v_K;
REPEAT
    -- assign clusters to data points
    UPDATE users1 d SET grp_id = (SELECT grp_id FROM groups_match c 
        ORDER BY POW(d.lat-c.lat,2)+POW(d.lng-c.lng,2)+pow(d.age-c.age,2)+pow(d.profession-c.profession,2) ASC LIMIT 1);
    -- calculate new cluster center
    UPDATE groups_match C, (SELECT grp_id, 
        AVG(lat) AS lat, AVG(lng) AS lng ,avg(age) as age,avg(profession) as profession
        FROM users1 GROUP BY grp_id) D 
    SET C.lat=D.lat, C.lng=D.lng,C.age=D.age,C.profession=D.profession WHERE C.grp_id=D.grp_id;
UNTIL ROW_COUNT() = 0 END REPEAT;
END //
DELIMITER;

<b> This code would be responsible to create the groups </b>
<b>Currently its not complete and we are still working on it</b>
