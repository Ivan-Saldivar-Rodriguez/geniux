use `geniux_db`;

DROP TABLE IF EXISTS `geniux_localizacion_portal`;

CREATE TABLE `geniux_localizacion_portal` (
  `id_registro` int(11) NOT NULL AUTO_INCREMENT,
  `639-3` char(3) NOT NULL,
  `seccion_app` varchar(100) NOT NULL,
  `id_object` varchar(500) NOT NULL,
  `type_object` varchar(500) NOT NULL,
  `attribute_object` varchar(500) NOT NULL,
  `gls_lengua` text NOT NULL,
  PRIMARY KEY (`id_registro`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

/*
TRUNCATE TABLE `geniux_localizacion_portal`;

-- ////////////////////////////////////////
--  PORTAL

INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('spa','span_titulo_equipo1','span','innerHTML','Nuestro equipo ','portal'),
('spa','span_titulo_equipo2','span','innerHTML','te apoyar&aacute;','portal'),
('spa','span_mensaje_equipo','span','innerHTML','Un equipo de profesionales y especialistas en el &aacute;rea educativa estar&aacute; disponible para todas tus consultas.','portal'),
('spa','span_titulo_proyeduca1','span','innerHTML','Los proyectos educativos','portal'),
('spa','span_titulo_proyeduca2','span','innerHTML',' que conf&iacute;an en nosotros.','portal'),
('spa','span_mensaje_proyeduca','span','innerHTML','Pronto desplegaremos aquellos proyectos educativos que est&aacute;n usando GENIUX, si ellos nos autorizan, podr&aacute;s saber de primera mano la experiencia de ellos con la plataforma.','portal'),
('spa','span_titulo_contacto1','span','innerHTML','Cont&aacute;ctanos','portal'),
('spa','span_titulo_contacto2','span','innerHTML',' cuando lo necesites','portal'),
('spa','span_mensaje_contacto','span','innerHTML','Estamos disponibles para que te comuniques con nosotros cuando lo desees. Queremos que formes parte de nuestra comunidad, mientras m&aacute;s experiencias e investigaciones compartamos en torno GENIUX, haremos de esta herramienta una plataforma de mayor calidad para todos.<br/>GENIUX nace para ser colaborativo, global y respetuoso de la identidad e idiosincracia propia de cada pueblo.','portal'),
('spa','span_txt_contact_name','span','innerHTML','Nombre','portal'),
('spa','span_txt_contact_email','span','innerHTML','Email','portal'),
('spa','span_txt_contact_msg','span','innerHTML','Mensaje','portal'),
('spa','span_texto_splas1','span','innerHTML','GENIUX | Plataforma educacional - powered by NativeCodex','portal'),
('spa','span_texto_splas2','span','innerHTML','SIMPLE, EFICIENTE y EFICAZ.','portal'),
('spa','span_texto_menu1','span','innerHTML','Inicio','portal'),
('spa','span_texto_menu2','span','innerHTML','M&oacute;dulos','portal'),
('spa','span_texto_menu3','span','innerHTML','Caracter&iacute;sticas','portal'),
('spa','span_texto_menu4','span','innerHTML','Equipo','portal'),
('spa','span_texto_menu5','span','innerHTML','Instituciones','portal'),
('spa','span_texto_menu6','span','innerHTML','Contacto','portal'),
('spa','span_texto_menu7','span','innerHTML','Ingreso Usuario','portal'),
('spa','span_text_banner1','span','innerHTML','Bienvenido a la plataforma educacional GENIUX','portal'),
('spa','span_text_banner2','span','innerHTML','Entregamos a la comunidad educacional una nueva herramienta de evaluaci&oacute;n<br/>totalmente gratuita y basada en un modelo centrado en el progreso de la adquisici&oacute;n<br/>de habilidades de cada niño, te invitamos a conocernos.','portal'),
('spa','span_text_banner3','span','innerHTML','Simple, autoexplicativa, eficiente.','portal'),
('spa','span_text_title_opc1','span','innerHTML','EXPERIENCIA DE USUARIO','portal'),
('spa','span_text_title_opc2','span','innerHTML','C&Oacute;DIGO ABIERTO','portal'),
('spa','span_text_title_opc3','span','innerHTML','GLOBAL','portal'),
('spa','span_text_msg_opc1','span','innerHTML','Dise&ntilde;ada para que el trabajo administrativo en las instituciones educacionales sea una labor f&aacute;cil y simple.<br/>Deseamos que GENIUX cumpla con las expectativas que todo usuario busca: simplicidad, eficiencia y eficacia.','portal'),
('spa','span_text_msg_opc2','span','innerHTML','Cuando definimos GENIUX, todo el equipo estuvo de acuerdo en hacer de esta plataforma una iniciativa de c&oacute;digo abierto, la que permita el desarrollo de muchas m&aacute;s herramientas que apoyen directamente la labor docente.','portal'),
('spa','span_text_msg_opc3','span','innerHTML','Somos una iniciativa de alcance GLOBAL, esperamos que la informaci&oacute;n de an&aacute;lisis que genere GENIUX sea<br/>compartida por toda la comunidad, permitiendo el desarrollo de investigación en esta &aacute;rea ...','portal'),
('spa','span_text_mod_menu1','span','innerHTML','M&Oacute;DULOS','portal'),
('spa','span_text_mod_menu2_1','span','innerHTML','Muchas caracter&iacute;sticas','portal'),
('spa','span_text_mod_menu2_2','span','innerHTML',' para descubrir en GENIUX','portal'),
('spa','span_tit_seccion_mod_1','span','innerHTML','Registro de usuario e Instituiones Educativas','portal'),
('spa','span_det_seccion_mod_1','span','innerHTML','En este m&oacute;dulo los usuarios se podr&aacute;n registrar para poder hacer uso de GENIUX. El registro es totalmente gratuito, nadie puede solicitarte un pago para acceder a usar esta plataforma.<br/>Tambi&eacute;n, podr&aacute;n suscribirse instituciones educativas, y en ellas sus docente tendr&aacute;n cuentas de usuario para registrar las evaluaciones de los alumnos que asistan a estas.','portal'),
('spa','span_tit_seccion_mod_2','span','innerHTML','Estad&iacute;sticas','portal'),
('spa','span_det_seccion_mod_2','span','innerHTML','GENIUX tendr&aacute; disponible un conjunto de reportes estad&iacute;sticos que te ayudar&aacute;n a analizar los resultados de los datos registrados.','portal'),
('spa','span_tit_seccion_mod_3','span','innerHTML','Registro de alumnos','portal'),
('spa','span_det_seccion_mod_3','span','innerHTML','A trav&eacute;s de este m&oacute;dulo, el usuario o instituciones suscritas a GENIUX podr&aacute; registrar al alumno o grupo de alumnos a los cuales desea evaluar con esta plataforma.<br/>En el caso de grupos de alumnos, se solicitar&aacute; indicar el colegio, curso y nivel de estos. Los datos entregados se mantendr&aacute;n bajo estricta confidencialidad. S&oacute;lo las estadísticas extra&iacute;das a partir de estos ser&aacute; de acceso p&uacute;blico.','portal'),
('spa','span_tit_seccion_mod_4','span','innerHTML','M&oacute;dulo Administrativo','portal'),
('spa','span_det_seccion_mod_4_1','span','innerHTML','En este, se ingresan las configuraciones de &aacute;mbitos, n&uacute;cleos, mapas o ejes y sus indicadores para cada localizaci&oacute;n espec&iacute;fica de GENIUX. Para ello, Corporacion COGNOX, colaborar&aacute; para establecer lazos con organismos educacionales y docentes en cada pa&iacute;s para lograr esta ambiciosa meta: ','portal'),
('spa','span_det_seccion_mod_4_2','span','innerHTML','GENIUX una plataforma de uso global, libre, colaborativa y de investigaci&oacute;n.','portal'),
('spa','span_tit_mod_menu_2_1','span','innerHTML','Capacitaciones','portal'),
('spa','span_det_mod_menu_2_1','span','innerHTML','Necesitas conocer m&aacute;s a fondo GENIUX, sus caracter&iacute;sticas y alcances. Agenda capacitaciones con nuestro equipo de soporte. Te apoyaremos y acompa&ntilde;aremos en todo el proceso de adopci&oacute;n de esta nueva plataforma.','portal'),
('spa','span_tit_mod_menu_2_2','span','innerHTML','Foros','portal'),
('spa','span_det_mod_menu_2_2','span','innerHTML','Ser colaborativo es parte integra de nuestro ADN, por ello, para difundir la investigaci&oacute;n y el tr&aacute;nsito libre de informaci&oacute;n en GENIUX, los foros de discusi&oacute;n abierta a la comunidad educativa suscrita, ser&aacute;n un m&eacute;todo a utilizar.','portal'),
('spa','span_btn_mod_menu_2_1','span','innerHTML','Leer m&aacute;s','portal'),
('spa','span_btn_mod_menu_2_2','span','innerHTML','Leer m&aacute;s','portal'),
('spa','span_txt_label_other_language','span','innerHTML','OTROS','portal'),
('spa','span_slogan_banner','span','innerHTML','POTENCIANDO TU GENIALIDAD','portal'),
('spa','span_post_logan_sec_1','span','innerHTML','Leer m&aacute;s','portal'),
('spa','span_post_logan_sec_2','span','innerHTML','Leer m&aacute;s','portal'),
('spa','span_post_logan_sec_3','span','innerHTML','Leer m&aacute;s','portal');

INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('spa','submit1_portal','object_button','value','Enviar mensaje','portal'),
('spa','name','object_input','placeholder','Tu nombre completo','portal'),
('spa','email','object_input','placeholder','usuario@ejemplo.com','portal'),
('spa','message','object_input','placeholder','Tu mensaje aqu&iacute;','portal');


INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('spa','span_title_page','title','title','GENIUX | Plataforma educacional - powered by NativeCodex','portal');



INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('eng','span_titulo_equipo1','span','innerHTML','Our team ','portal'),
('eng','span_titulo_equipo2','span','innerHTML','will support you','portal'),
('eng','span_mensaje_equipo','span','innerHTML','A team of professionals and specialists in the educational area will be available for all your questions.','portal'),
('eng','span_titulo_proyeduca1','span','innerHTML','The educational projects','portal'),
('eng','span_titulo_proyeduca2','span','innerHTML',' that trust us.','portal'),
('eng','span_mensaje_proyeduca','span','innerHTML','Soon we will deploy those educational projects that are using GENIUX, if they authorize us, you will be able to know firsthand the experience of them with the platform.','portal'),
('eng','span_titulo_contacto1','span','innerHTML','Contact us','portal'),
('eng','span_titulo_contacto2','span','innerHTML',' when you need it','portal'),
('eng','span_mensaje_contacto','span','innerHTML','We are available for you to contact us whenever you wish. We want you to be part of our community, as more experiences and research share around GENIUX, we will make this tool a higher quality platform for all. <br/> GENIUX is born to be collaborative, global and respectful of the identity and idiosyncrasy of each country.','portal'),
('eng','span_txt_contact_name','span','innerHTML','Name','portal'),
('eng','span_txt_contact_email','span','innerHTML','Email','portal'),
('eng','span_txt_contact_msg','span','innerHTML','Message','portal'),
('eng','span_texto_splas1','span','innerHTML','GENIUX | Educational platform - powered by NativeCodex','portal'),
('eng','span_texto_splas2','span','innerHTML','SIMPLE, EFFICIENT and EFFECTIVE.','portal'),
('eng','span_texto_menu1','span','innerHTML','Start','portal'),
('eng','span_texto_menu2','span','innerHTML','Modules','portal'),
('eng','span_texto_menu3','span','innerHTML','Features','portal'),
('eng','span_texto_menu4','span','innerHTML','Equipment','portal'),
('eng','span_texto_menu5','span','innerHTML','Institutions','portal'),
('eng','span_texto_menu6','span','innerHTML','Contact','portal'),
('eng','span_texto_menu7','span','innerHTML','User Login','portal'),
('eng','span_text_banner1','span','innerHTML','Welcome to the GENIUX educational platform','portal'),
('eng','span_text_banner2','span','innerHTML','We deliver to the educational community a new assessment tool <br/> totally free and based on a model focused on the progress of the acquisition of <br/> skills of each child, we invite you to know us.','portal'),
('eng','span_text_banner3','span','innerHTML','Simple, self-explanatory, efficient.','portal'),
('eng','span_text_title_opc1','span','innerHTML','USER EXPERIENCE','portal'),
('eng','span_text_title_opc2','span','innerHTML','OPEN SOURCE','portal'),
('eng','span_text_title_opc3','span','innerHTML','GLOBAL','portal'),
('eng','span_text_msg_opc1','span','innerHTML','Designed to make administrative work in educational institutions easy and simple. <br/> We hope that GENIUX meets the expectations that every user is looking for: simplicity, efficiency and effectiveness.','portal'),
('eng','span_text_msg_opc2','span','innerHTML','When we defined GENIUX, the whole team agreed to make this platform an open source initiative, which allows the development of many more tools that directly support the teaching work.','portal'),
('eng','span_text_msg_opc3','span','innerHTML','We are an initiative of GLOBAL scope, we hope that the analysis information generated by GENIUX will be <br/> shared by the whole community, allowing the development of research in this area ...','portal'),
('eng','span_text_mod_menu1','span','innerHTML','MODULES','portal'),
('eng','span_text_mod_menu2_1','span','innerHTML','Many features','portal'),
('eng','span_text_mod_menu2_2','span','innerHTML',' to discover in GENIUX','portal'),
('eng','span_tit_seccion_mod_1','span','innerHTML','User Registration and Educational Institutions','portal'),
('eng','span_det_seccion_mod_1','span','innerHTML','In this module, users can register to use GENIUX. The registration is totally free, no one can request a payment to accede to use this platform. <br/> Also, they will be able to subscribe educational institutions, and in them their teachers will have user accounts to register the evaluations of the students that attend these.','portal'),
('eng','span_tit_seccion_mod_2','span','innerHTML','Statistics','portal'),
('eng','span_det_seccion_mod_2','span','innerHTML','GENIUX will have Available a set of statistical reports that will help you analyze the results of the recorded data.','portal'),
('eng','span_tit_seccion_mod_3','span','innerHTML','Student registration','portal'),
('eng','span_det_seccion_mod_3','span','innerHTML','Through this module, the user or institutions subscribed to GENIUX will be able to register the student or group of students to whom he / she wishes to evaluate with this platform. <br/> In the case of groups of students, Indicate the school, course and level of these. The data provided will be kept under strict confidentiality. Only the statistics extracted from these will be publicly accessible.','portal'),
('eng','span_tit_seccion_mod_4','span','innerHTML','Administrative Module','portal'),
('eng','span_det_seccion_mod_4_1','span','innerHTML','In this, enter the settings of scopes, cores, axes and their indicators for each specific location of GENIUX. For this, Corporacion COGNOX, will collaborate to establish ties with educational organizations in each country to achieve this ambitious goal: ','portal'),
('eng','span_det_seccion_mod_4_2','span','innerHTML','GENIUX a platform for global, free, collaborative and investigative use.','portal'),
('eng','span_tit_mod_menu_2_1','span','innerHTML','Training','portal'),
('eng','span_det_mod_menu_2_1','span','innerHTML','You need to know more about GENIUX, its characteristics and scope. Schedule training with our support team. We will support and accompany you throughout the process of adoption of this new platform.','portal'),
('eng','span_tit_mod_menu_2_2','span','innerHTML','Forums','portal'),
('eng','span_det_mod_menu_2_2','span','innerHTML','Being a collaborative is an integral part of our DNA, therefore, to spread the research and free traffic of information in GENIUX, discussion forums open to the subscribed educational community, will be a method to use.','portal'),
('eng','span_btn_mod_menu_2_1','span','innerHTML','Read more','portal'),
('eng','span_btn_mod_menu_2_2','span','innerHTML','Read more','portal'),
('eng','span_txt_label_other_language','span','innerHTML','MORE','portal'),
('eng','span_slogan_banner','span','innerHTML','EMPOWERING YOUR GENIALITY','portal'),
('eng','span_post_logan_sec_1','span','innerHTML','Read more','portal'),
('eng','span_post_logan_sec_2','span','innerHTML','Read more','portal'),
('eng','span_post_logan_sec_3','span','innerHTML','Read more','portal');

INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('eng','submit1_portal','object_button','value','Send message','portal'),
('eng','name','object_input','placeholder','Your complete name','portal'),
('eng','email','object_input','placeholder','user@example.com','portal'),
('eng','message','object_input','placeholder','Your message here','portal');


INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('eng','span_title_page','title','title','GENIUX | Educational platform - powered by NativeCodex','portal');

-- ////////////////////////////////////////
--  LOGIN
INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('spa','span_saludo_login_ingreso','span','innerHTML','POR FAVOR INGRESE','login'),
('spa','span_name_usuario_login','span','innerHTML','Nombre de usuario','login'),
('spa','span_txt_name_usuario_login','span','innerHTML','Su nombre de usuario &uacute;nico para Geniux','login'),
('spa','span_pass_usuario_login','span','innerHTML','Contrase&ntilde;a','login'),
('spa','span_txt_pass_usuario_login','span','innerHTML','Su contrase&ntilde;a','login'),
('spa','span_button_login_ingreso','span','innerHTML','Ingresar','login'),
('spa','span_button_volver','span','innerHTML','Volver al portal','login');

INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('eng','span_saludo_login_ingreso','span','innerHTML','PLEASE ENTER','login'),
('eng','span_name_usuario_login','span','innerHTML','Username','login'),
('eng','span_txt_name_usuario_login','span','innerHTML','Your unique username for Geniux','login'),
('eng','span_pass_usuario_login','span','innerHTML','Password','login'),
('eng','span_txt_pass_usuario_login','span','innerHTML','Your password','login'),
('eng','span_button_login_ingreso','span','innerHTML','Sign in','login'),
('eng','span_button_volver','span','innerHTML','Back to portal','login');


INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('spa','span_title_page','title','title','GENIUX | Plataforma educativa - powered by NativeCodex','login');

INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('eng','span_title_page','title','title','GENIUX | Educational platform - powered by NativeCodex','login');



INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('spa','spanLic_CC_01','span','innerHTML','Excepto cuando se indique lo contrario, el contenido y código de esta aplicación están bajo dos licencias de uso: ','portal');
INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('spa','spanLic_CC_03','span','innerHTML','Excepto cuando se indique lo contrario, el contenido y código de esta aplicación están bajo dos licencias de uso: ','portal');

INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('spa','spanLic_CC_02','span','innerHTML',concat('<a onclick=',"'",'licenseCC(1);',"'",'>una licencia de Creative Commons Reconocimiento-NoComercial-CompartirIgual 4.0 Internacional</a>'),'portal');
INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('spa','spanLic_CC_04','span','innerHTML',concat('<a onclick=',"'",'licenseCC(1);',"'",'>una licencia de Creative Commons Reconocimiento-NoComercial-CompartirIgual 4.0 Internacional</a>'),'portal');


INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('eng','spanLic_CC_01','span','innerHTML','Except where otherwise noted, content and code on this application are under two licenses: ','portal');
INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('eng','spanLic_CC_03','span','innerHTML','Except where otherwise noted, content and code on this application are under two licenses: ','portal');

INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('eng','spanLic_CC_02','span','innerHTML',concat('<a onclick=',"'",'licenseCC(2);',"'",'>a Creative Commons Attribution 4.0 International license</a>'),'portal');
INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('eng','spanLic_CC_04','span','innerHTML',concat('<a onclick=',"'",'licenseCC(2);',"'",'>a Creative Commons Attribution 4.0 International license</a>'),'portal');


INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('spa','spanLic_CC_02_1','span','innerHTML',' y una ','portal');
INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('spa','spanLic_CC_04_1','span','innerHTML',' y una ','portal');

INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('spa','spanLic_CC_02_2','span','innerHTML','Licencia Pública General GNU (GPLv3)','portal');
INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('spa','spanLic_CC_04_2','span','innerHTML','Licencia Pública General GNU (GPLv3)','portal');


INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('eng','spanLic_CC_02_1','span','innerHTML',' and a ','portal');
INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('eng','spanLic_CC_04_1','span','innerHTML',' and a ','portal');

INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('eng','spanLic_CC_02_2','span','innerHTML','GNU General Public License (GPLv3)','portal');
INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('eng','spanLic_CC_04_2','span','innerHTML','GNU General Public License (GPLv3)','portal');


INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('spa','span_text_title_opc_4','span','innerHTML','LICENCIA DE CÓDIGO ABIERTO','portal');
INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('eng','span_text_title_opc_4','span','innerHTML','OPEN SOURCE LICENSE','portal');


INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('spa','span_text_msg_opc4','span','innerHTML','La licencia de código abierto está diseñada para que usted pueda usar Geniux para crear proyectos de código abierto y personales. La licencia de código abierto Geniux es CC BY-NC-SA 4.0 y GPLv3. La GPLv3 tiene muchos términos. De la GPL FAQ: <b>Si libera la versión modificada al público de alguna manera, la GPL requiere que usted haga el código fuente modificado disponible para los usuarios del programa, bajo la GPL</b>.<br />Liberar su proyecto que usa Geniux bajo licencias CC BY-NC-SA 4.0 y GPLv3, a su vez, requiere que su proyecto sea licenciado bajo CC BY-NC-SA 4.0 y GPLv3. Si está de acuerdo con esto, no dude en usar Geniux bajo CC BY-NC-SA 4.0 y GPLv3, sin necesidad de adquirir una licencia comercial, de lo contrario contacta a COGNOX para lograr el acuerdo de uso correspondiente.','portal');
INSERT INTO `geniux_localizacion_portal`(
	`639-3`,
	`id_object`,
	`type_object`,
	`attribute_object`,
	`gls_lengua`,
    `seccion_app`
)
VALUES
('eng','span_text_msg_opc4','span','innerHTML','The open source license is designed for you to use Geniux to build open source and personal projects. The Geniux open source license is  CC BY-NC-SA 4.0 and GPLv3. The GPLv3 has many terms. From the GPL FAQ:<b>If you release the modified version to the public in some way, the GPL requires you to make the modified source code available to the program´s users, under the GPL</b>.<br />Releasing your project that uses Geniux under CC BY-NC-SA 4.0 and GPLv3, in turn, requires your project to be licensed under  CC BY-NC-SA 4.0 and GPLv3. If you are okay with this, feel free to use Geniux under CC BY-NC-SA 4.0 and GPLv3, without purchasing a commercial license, , otherwise contact COGNOX to achieve the corresponding usage agreement.','portal');


*/