<?php

/*
Valor 	Constante 	
1 	    E_ERROR (integer) 	Errores Fatales en tiempo de ejecución. Éstos indican errores que no se pueden recuperar, tales como un problema de asignación de memoria. La ejecución del script se interrumpe. 	 
2 	    E_WARNING (integer) 	Advertencias en tiempo de ejecución (errores no fatales). La ejecución del script no se interrumpe. 	 
4 	    E_PARSE (integer) 	Errores de análisis en tiempo de compilación. Los errores de análisis deberían ser generados únicamente por el analizador. 	 
8 	    E_NOTICE (integer) 	Avisos en tiempo de ejecución. Indican que el script encontró algo que podría señalar un error, pero que también podría ocurrir en el curso normal al ejecutar un script. 	 
16 	    E_CORE_ERROR (integer) 	Errores fatales que ocurren durante el arranque incial de PHP. Son como un E_ERROR, excepto que son generados por el núcleo de PHP. 	 
32 	    E_CORE_WARNING (integer) 	Advertencias (errores no fatales) que ocurren durante el arranque inicial de PHP. Son como un E_WARNING, excepto que son generados por el núcleo de PHP. 	 
64 	    E_COMPILE_ERROR (integer) 	Errores fatales en tiempo de compilación. Son como un E_ERROR, excepto que son generados por Motor de Script Zend. 	 
128 	E_COMPILE_WARNING (integer) 	Advertencias en tiempo de compilación (errores no fatales). Son como un E_WARNING, excepto que son generados por Motor de Script Zend. 	 
256 	E_USER_ERROR (integer) 	Mensaje de error generado por el usuario. Es como un E_ERROR, excepto que es generado por código de PHP mediante el uso de la función de PHP trigger_error(). 	 
512 	E_USER_WARNING (integer) 	Mensaje de advertencia generado por el usuario. Es como un E_WARNING, excepto que es generado por código de PHP mediante el uso de la función de PHP trigger_error(). 	 
1024 	E_USER_NOTICE (integer) 	Mensaje de aviso generado por el usuario. Es como un E_NOTICE, excepto que es generado por código de PHP mediante el uso de la función de PHP trigger_error(). 	 
2048 	E_STRICT (integer) 	Habilítelo para que PHP sugiera cambios en su código, lo que asegurará la mejor interoperabilidad y compatibilidad con versiones posteriores de PHP de su código. 	Desde PHP 5 pero no incluidoen E_ALL hasta PHP 5.4.0
4096 	E_RECOVERABLE_ERROR (integer) 	Error fatal capturable. Indica que ocurrió un error probablemente peligroso, pero no dejó al Motor en un estado inestable. Si no se captura el error mediante un gestor definido por el usuario (vea también set_error_handler()), la aplicación se abortará como si fuera un E_ERROR. 	Desde PHP 5.2.0
8192 	E_DEPRECATED (integer) 	Avisos en tiempo de ejecución. Habilítelo para recibir avisos sobre código que no funcionará en futuras versiones. 	Desde PHP 5.3.0
16384 	E_USER_DEPRECATED (integer) 	Mensajes de advertencia generados por el usuario. Son como un E_DEPRECATED, excepto que es generado por código de PHP mediante el uso de la función de PHP trigger_error(). 	Desde PHP 5.3.0
32767 	E_ALL (integer) 	Todos los errores y advertencias soportados, excepto del nivel E_STRICT antes de PHP 5.4.0. 	32767 en PHP 5.4.x, 30719 en PHP 5.3.x, 6143 en PHP 5.2.x, 2047 anteriormente

Los valores de arriba (numéricos o simbólicos) se usan para construir una máscara de bits que especifica qué errores notificar. 
Se pueden usar los operadores a nivel de bit para combinar estos valores o para enmascarar ciertos tipos de errores. 
Observe que sólo serán interpretados '|', '~', '!', '^' y '&' dentro de php.ini. 
*/

error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE | E_CORE_ERROR | E_CORE_WARNING | E_COMPILE_ERROR | E_COMPILE_WARNING | E_USER_ERROR  | E_USER_WARNING | E_USER_NOTICE | E_STRICT | E_RECOVERABLE_ERROR | E_DEPRECATED);

?>