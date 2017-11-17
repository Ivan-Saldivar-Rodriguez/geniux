use `geniux_db`;

DROP PROCEDURE IF EXISTS `test`;

DELIMITER $$
CREATE PROCEDURE `test`()
BEGIN
	DECLARE body_ text;
    
    /*
    -- suppose that variable body_ is result to query your table in field indicated, example:
    
    SELECT `field_data_body`.`body_sumary`
    INTO body_
    FROM `field_data_body`
    WHERE ...
    
    -- this replace process can to apply direct to query:

    SELECT REPLACE(
				REPLACE(`field_data_body`.`body_sumary`,
						'https://www.example.com/hello-world.html',
                        'http://www.example.com/hello-world.html'
				),
				'https://www.example.com/hello-world-two.html',
                'http://www.example.com/hello-world-two.html'
			)
    INTO body_
    FROM `field_data_body`
    WHERE ...
    
    */
    SET body_ = CONCAT('<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
					'</p>',
					'<p> Cras tempus fringilla ipsum sit amet tristique.',
					'</p>',
					'<p>Nulla facilisi. Cras a purus nibh.</p>',
					'<p>Sed euismod ut varius. <a href="https://www.example.com/hello-world.html">click here</a>.',
					'</p>',
					'<p align="center"><a href="https://www.example.com/hello-world-two.html"><img src="https://www.example.com/img/image.jpg" class="img-responsive"></a></p>',
					'<p align="center"><a href="https://www.example.com/hello-world-three" class="btn btn-primary">click here</a></p>');
                    
    CREATE TEMPORARY TABLE field_data_body(
		`body_summary` varchar(8000) NOT NULL
	) ENGINE = MEMORY DEFAULT CHARSET=utf8;
    
    INSERT INTO field_data_body( `body_summary`)
    VALUES(body_);
    
    SELECT `body_summary` FROM field_data_body
    where  field_data_body.`body_summary` like '%https://%.html%';
    
    SELECT 
			`regex_replace`(
				'https://[^a-zA-Z0-9\-].html',
                'http://[^a-zA-Z0-9\-].html',
				field_data_body.`body_summary`
			)
    FROM field_data_body
    where  field_data_body.`body_summary` like '%https://%.html%';
    
    drop TABLE field_data_body;
    
						
	-- SET body_ = REPLACE(body_,'https://www.example.com/hello-world.html','http://www.example.com/hello-world.html');
    -- SET body_ = REPLACE(body_,'https://www.example.com/hello-world-two.html','http://www.example.com/hello-world-two.html');
    -- SELECT body_ as bodyreplace;
    
END$$
DELIMITER ;


call test();


SELECT * FROM geniux_nivel_logro;
SELECT * FROM geniux_nivel_logro_rangos;

truncate table geniux_nivel_logro;
truncate table geniux_nivel_logro_rangos;

   SELECT 
		`geniux_nivel_logro`.`id_nivel_logro`,
		`geniux_nivel_logro`.`alpha_2_code_pais`,
        `geniux_nivel_logro`.`year_nivel_logro`,
        `geniux_nivel_logro`.`nivel_logro_scope`,
        `geniux_nivel_logro`.`descrip_cfg_nivel_logro`
	FROM
		`geniux_nivel_logro`
	WHERE `geniux_nivel_logro`.`nivel_logro_scope` = 0;


-- ///////////////////////////////////////////////////////

use geniux_db;


DROP FUNCTION IF EXISTS `regex_replace`;

DELIMITER $$

CREATE FUNCTION  `regex_replace`(patterBegin VARCHAR(500),patterEnd VARCHAR(500),replacement VARCHAR(1000),original VARCHAR(1000))
RETURNS text
DETERMINISTIC
BEGIN 
	DECLARE temp VARCHAR(1000); 
	DECLARE pos_1 int;
	DECLARE pos_2 int;
	DECLARE replacedText text;
	DECLARE replacement2 text;
    DECLARE original_out text default '';
	DECLARE V1 int;
    DECLARE length_ int;
    
    set patterBegin = reverse(patterBegin);
    set patterEnd = reverse(patterEnd);
    set replacement = reverse(replacement);
    set original = reverse(original);
    set length_ = length(original);
    

    set V1 = 1;
	set pos_1= instr(original,patterBegin);
	set pos_2= instr(original,patterEnd);
	    
    while (pos_1>0 and pos_2>0 and v1 <=3) do
    
		set replacedText= substring( original, pos_2, (pos_1+length(patterBegin)) );

		set replacement2 = REPLACE(replacedText,patterBegin,replacement);

		set original = REPLACE(original, replacedText, replacement2);

        set original_out = concat( original_out, substr(original, 1, pos_1+length(patterBegin)-1) );
        
		set original = substr(original,pos_1+length(patterBegin),length_);
        
	
		set V1 = V1+1;
        
		set pos_1= instr(original ,patterBegin);
		set pos_2= instr(original ,patterEnd);

        while pos_1 < pos_2 do

			set original_out = concat( original_out, substr(original, 1, pos_1+length(patterBegin)-1) );
            set original = substr(original,pos_1+length(patterBegin),length_);

			set pos_1= instr(original ,patterBegin);
			set pos_2= instr(original ,patterEnd);            

        end while;
    
    end while;
    
	set original_out = concat( original_out, original);

	RETURN reverse(original_out);
END$$

DELIMITER ;



select `regex_replace`('https','html','HTTP','<p align="center"><a href="https://www.example.com/hello-world-two.html"><img src="https://www.example.com/img/image.jpg"/>https://www.example.com/hello-world-three.html') as out_;

select `regex_replace`(
		'https',
        'html',
        'HTTP',
		CONCAT('<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
					'</p>',
					'<p> Cras tempus fringilla ipsum sit amet tristique.',
					'</p>',
					'<p>Nulla facilisi. Cras a purus nibh.</p>',
					'<p>Sed euismod ut varius. <a href="https://www.example.com/hello-world.html">click here</a>.',
					'</p>',
					'<p align="center"><a href="https://www.example.com/hello-world-two.html"><img src="https://www.example.com/img/image.jpg" class="img-responsive"></a></p>',
					'<p align="center"><a href="https://www.example.com/hello-world-three" class="btn btn-primary">click here</a></p>')
		) as out_;


use geniux_db;


DROP PROCEDURE IF EXISTS `regex_replace2`;

DELIMITER $$

CREATE PROCEDURE  `regex_replace2`(patterBegin VARCHAR(500),patterEnd VARCHAR(500),replacement VARCHAR(1000),original VARCHAR(1000))
BEGIN 
	DECLARE temp VARCHAR(1000); 
	DECLARE pos_1 int;
	DECLARE pos_2 int;
	DECLARE replacedText text;
	DECLARE replacement2 text;
    DECLARE original_out text default '';
	DECLARE V1 int;
    DECLARE length_ int;
    
    set patterBegin = reverse(patterBegin);
    set patterEnd = reverse(patterEnd);
    set replacement = reverse(replacement);
    set original = reverse(original);
    set length_ = length(original);
    
    select patterBegin, patterEnd,replacement, original;
    

    set V1 = 1;
	set pos_1= instr(original,patterBegin);
	set pos_2= instr(original,patterEnd);
	
    -- select pos_2 as pos_2, pos_1 as pos_1;
    
    while (pos_1>0 and pos_2>0 and v1 <=3) do
    
		set replacedText= substring( original, pos_2, (pos_1+length(patterBegin)) );

		set replacement2 = REPLACE(replacedText,patterBegin,replacement);

		set original = REPLACE(original, replacedText, replacement2);

        set original_out = concat( original_out, substr(original, 1, pos_1+length(patterBegin)-1) );
        
		set original = substr(original,pos_1+length(patterBegin),length_);
        
	
		set V1 = V1+1;
        
		set pos_1= instr(original ,patterBegin);
		set pos_2= instr(original ,patterEnd);

        while pos_1 < pos_2 do

			set original_out = concat( original_out, substr(original, 1, pos_1+length(patterBegin)-1) );
            set original = substr(original,pos_1+length(patterBegin),length_);

			set pos_1= instr(original ,patterBegin);
			set pos_2= instr(original ,patterEnd);            

        end while;
    
		-- select original_out, original , replacedText, replacement2, pos_2, pos_1;
    end while;
	set original_out = concat( original_out, original);
    
    select reverse(original_out) as out_;
END$$

DELIMITER ;

call `regex_replace2`('https','html','HTTP','<p align="center"><a href="https://www.example.com/hello-world-two.html"><img src="https://www.example.com/img/image.jpg"/>https://www.example.com/hello-world-three.html');


SELECT FLOOR(RAND()*20),RAND()*21;

select floor(21.864107852675122);

