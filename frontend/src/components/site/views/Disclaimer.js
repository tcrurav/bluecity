import React, { useEffect } from 'react';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  image: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "2em"
  },
  description: {
    [theme.breakpoints.down('xs')]: {
      marginRight: "1em",
      marginLeft: "1em"
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: "2em",
      marginRight: "2em"
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: "20em",
      marginRight: "16em"
    }
  },
  titleHeader: {
    marginTop: "1em"
  }
}));

const Disclaimer = ({ extraMargin }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const classes = useStyles();

  const outerClasses = classNames(
    'hero section',
    // topOuterDivider && 'has-top-divider',
    // bottomOuterDivider && 'has-bottom-divider',
    // hasBgColor && 'has-bg-color',
    // invertColor && 'invert-color',
    "illustration-section-01"
  );

  return (
    <section
      className={outerClasses}
    >
      {/* <div className={classes.titleHeader}>
        <Typography align="center" variant="h2" component="p">Política de Privacidad, Aviso Legal y Política de Cookies</Typography>
        {/* <Typography align="center" variant="h4" color="textSecondary" component="p">El centro</Typography> 
      </div> */}
      <div className={classes.description}>
        <Grid container className={classes.root}>

          <Grid item sm={12}>
            {extraMargin ?
              <Typography variant="h4" component="p" style={{ color: "darkblue", marginTop: "2em" }}>
                Política de Privacidad, Aviso Legal y Política de Cookies
              </Typography>
              :
              <Typography variant="h4" component="p" style={{ color: "darkblue", marginTop: "1em" }}>
                Política de Privacidad, Aviso Legal y Política de Cookies
              </Typography>
            }

          </Grid>

          <Grid item sm={12}>
            <Typography variant="h4" component="p">
              Política de Privacidad
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Typography>
              Bienvenido a nuestra Política de Privacidad. Está política le ayudará a tomar decisiones sobre los datos que nos facilita a través de esta aplicación. Por ello, le recomendamos que la lea atentamente.<br /><br />

              Nos reservamos el derecho a modificar o adaptar la presente Política de Privacidad en cualquier momento. Le recomendamos revisar la misma, y si se ha registrado y accede a su cuenta o perfil, se le informará de las modificaciones.<br /><br />

              Conforme al Reglamento (UE) 2016/679 del parlamento europeo y del consejo de 27 de abril de 2016 relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos le informamos de lo siguiente:<br /><br />
            </Typography>
          </Grid>

          <Grid item sm={12}>
            <Typography variant="h6" component="p">
              1. ¿Quién es el responsable del tratamiento de sus datos?
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Typography>
              IES El Rincón<br />

              Avda. José Sánchez Peñate, s/n<br />

              35010, Las Palmas de Gran Canaria, Las Palmas.
            </Typography>
          </Grid>

          <Grid item sm={12}>
            <Typography variant="h6" component="p">
              2. ¿Con qué finalidades vamos a tratar sus datos personales?
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Typography>
              Desde IES El Rincón vamos a tratar sus datos personales con las siguientes finalidades:
            </Typography>
            <ul>
              <li>Gestionar el alta en el área de registro de usuario y su acceso a la aplicación.</li>
              <li>Proporcionar, personalizar y mejorar tu experiencia con la Aplicación y con el servicio puesto a tu disposición a través de la misma. Concretamente se guarda su elección de idioma para que no tenga elegirlo cada vez que accede a la aplicación.</li>
            </ul>
          </Grid>

          <Grid item sm={12}>
            <Typography variant="h6" component="p">
              3. Permisos de la app
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Typography>
              Para prestar estos servicios, IES El Rincón requiere una conexión a Internet y los siguientes permisos para acceder al Teléfono:
            </Typography>
            <ul>
              <li>Ubicación: Utilizamos la ubicación para poder mostrarle las estaciones más próximas a su situación y la disponibilidad de patinetes en las mismas.</li>
              <li>Redes Wi-Fi: Para obtener y actualizar la conexión a Internet.</li>
            </ul>
            <Typography>
              Puede gestionar los permisos a través de la configuración de permisos de su teléfono móvil. Puede encontrar más información en los siguientes enlaces:
            </Typography>
            <ul>
              <li><a href="https://support.google.com/googleplay/answer/6270602?hl=es">Android</a></li>
              <li><a href="https://support.apple.com/es-es/guide/iphone/welcome/ios">iPhone</a></li>
            </ul>
          </Grid>

          <Grid item sm={12}>
            <Typography variant="h6" component="p">
              4. ¿Durante cuánto tiempo vamos a mantener los datos personales?
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Typography>
              Los datos personales serán mantenidos mientras siga de alta en la App. Puede borrar su cuenta desde el menú principal ("3 rayitas horizontales"), haciendo click en su usuario y finalmente haciendo click en el botón "borrar cuenta".
            </Typography>
          </Grid>

          <Grid item sm={12}>
            <Typography variant="h6" component="p">
              5. ¿A qué destinatarios se comunicarán sus datos?
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Typography>
              Sus datos solo son necesarios para el acceso a la App, y para guardar su selección de idioma para facilitar el uso de la App. No se comunicarán sus datos a nadie.
            </Typography>
          </Grid>

          <Grid item sm={12}>
            <Typography variant="h6" component="p">
              6. Cambios en la Política de Privacidad
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Typography>
              Nos reservamos el derecho a modificar o adaptar la presente Política de Privacidad en cualquier momento. Si efectuamos cualquier cambio que consideremos importante, le informaremos a través del Servicio.
            </Typography>
          </Grid>

          <Grid item sm={12}>
            <Typography variant="h4" component="p">
              Aviso Legal
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Typography>
              Las presentes Condiciones tienen por objeto establecer y regular las normas de uso de la app.<br /><br />

              El acceso y la navegación en la app/web, o el uso de los servicios del mismo, implican la aceptación expresa e íntegra de todas y cada una de las presentes Condiciones Generales de uso recogidas en este Aviso Legal, incluidas las Condiciones Generales y Particulares de Contratación así como la Política de Privacidad y Cookies, relativa a las finalidades de los tratamientos de los datos que nos facilite. Por favor, le recomendamos que las leas atentamente.
            </Typography>
          </Grid>

          <Grid item sm={12}>
            <Typography variant="h6" component="p">
              1. Titular
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Typography>
              En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, los datos identificativos del titular del Portal Web o app en el que estás navegando son:<br />
              IES El Rincón<br />
              Avda. José Sánchez Peñate, s/n<br />
              35010, Las Palmas de Gran Canaria, Las Palmas.
            </Typography>
          </Grid>

          <Grid item sm={12}>
            <Typography variant="h6" component="p">
              2. Utilización de la página
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Typography>
              El Usuario se compromete a utilizar la app/web, los contenidos y servicios de conformidad con la legalidad vigente y el presente Aviso Legal.<br /><br />

              Del mismo modo, el Usuario se obliga a no utilizar la app/web o los servicios que se presten a través de ella con fines o efectos ilícitos o contrarios al contenido del presente Aviso Legal, lesivos de los intereses o derechos de terceros, o que de cualquier forma puedan dañar, inutilizar o deteriorar la app/web o sus servicios, o impedir un normal disfrute de la app/web por otros Usuarios.<br /><br />

              Asimismo, el Usuario se compromete expresamente a no destruir, alterar, inutilizar o, de cualquier otra forma, dañar los datos, programas o documentos electrónicos y demás que se encuentren en la presente app/web.<br /><br />

              El Usuario se compromete a no obstaculizar el acceso de otros Usuarios al servicio de acceso mediante el consumo masivo de los recursos informáticos a través de los cuales el titular de la app/web presta el servicio, así como a no realizar acciones que dañen, interrumpan o generen errores en dichos sistemas.<br /><br />

              El Usuario se compromete a no introducir programas, virus, macros, applets, controles ActiveX o cualquier otro dispositivo lógico o secuencia de caracteres que causen o sean susceptibles de causar cualquier tipo de alteración en los sistemas informáticos del titular de la app/web o de terceros.<br /><br />

              El Usuario es responsable de la adecuada custodia y confidencialidad de cualesquiera identificadores y/o contraseñas que le sean suministradas por la app/web, y se compromete a no ceder su uso a terceros, ya sea temporal o permanente, ni a permitir su acceso a personas ajenas.<br /><br />

              Será responsabilidad del Usuario la utilización ilícita de los servicios por cualquier tercero ilegítimo que emplee a tal efecto una contraseña a causa de una utilización no diligente o de la pérdida de la misma por el Usuario.<br /><br />

              En virtud de lo anterior, es obligación del Usuario notificar de forma inmediata a los gestores de la app/web, cualquier hecho que permita el uso indebido de los identificadores y/o contraseñas, tales como el robo, extravío, o el acceso no autorizado a los mismos, con el fin de proceder a su inmediata cancelación.<br /><br />

              Mientras no se comuniquen tales hechos, IES El Rincón quedará eximido de cualquier responsabilidad que pudiera derivarse del uso indebido de los identificadores o contraseñas por terceros no autorizados.
            </Typography>
          </Grid>

          <Grid item sm={12}>
            <Typography variant="h6" component="p">
              3. Funcionamiento de la APP/WEB
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Typography>
              Esta APP/WEB forma parte de un prototipo desarrollado por alumnado del IES El Rincón.<br /><br />

              Por tanto IES El Rincón excluye toda responsabilidad que se pudiera derivar de interferencias, omisiones, interrupciones, virus informáticos, averías telefónicas o desconexiones en el funcionamiento operativo del sistema electrónico.<br /><br />

              Asimismo, IES El Rincón también excluye cualquier responsabilidad que pudiera derivarse por retrasos o bloqueos en el funcionamiento operativo de este sistema electrónico causado por deficiencias o sobrecarga en las líneas telefónicas o en Internet, así como de daños causados por terceras personas mediante intromisiones ilegítimas fuera del control de IES El Rincón.<br /><br />

              IES El Rincón está facultado para suspender temporal o definitavamente, y sin previo aviso, el acceso a la app/web con motivo de operaciones de mantenimiento, reparación, actualización o mejora. Así como por el cese del proyecto.<br /><br />
            </Typography>
          </Grid>

          <Grid item sm={12}>
            <Typography variant="h6" component="p">
              4. RÉGIMEN DE RESPONSABILIDAD
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Typography>
              IES El Rincón no garantiza la licitud, fiabilidad, utilidad, veracidad o exactitud de los servicios o de la información que se presten por terceros a través de la app/web.<br /><br />

              El Usuario es el único responsable de las infracciones en las que pueda incurrir o de los perjuicios que pueda causar por la mala utilización de la app/web, quedando IES El Rincón exonerado de cualquier clase de responsabilidad que se pudiera derivar por las acciones del Usuario.<br /><br />

              IES El Rincón empleará todos los esfuerzos y medios razonables para facilitar información actualizada y fehaciente en la app/web, no obstante, el titular de la app/web no garantiza la inexistencia de errores, o de posibles inexactitudes y/u omisiones en los contenidos publicados por terceros accesibles a través de esta app/web.<br /><br />

              El Usuario es el único responsable frente a cualquier reclamación o acción legal, judicial o extrajudicial, iniciada por terceras personas contra el titular de la app/web basada en una mala utilización por parte del Usuario de la app/web. En su caso, el Usuario asumirá cuantos gastos, costes e indemnizaciones sean solicitados a IES El Rincón con motivo de tales reclamaciones o acciones legales.<br /><br />
            </Typography>
          </Grid>

          <Grid item sm={12}>
            <Typography variant="h6" component="p">
              5. Jurisdicción y Ley Aplicable
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Typography>
              El presente Aviso Legal se regirá e interpretará conforme a la legislación española.<br /><br />

              IES El Rincón y el Usuario, con renuncia expresa a cualquier otro fuero que pudiera corresponderles, se someten a los Juzgados y Tribunales de la ciudad de Las Palmas de Gran Canaria, Las Palmas (España), salvo que la normativa aplicable según el caso impida a las partes someterse a un fuero específico.<br /><br />
            </Typography>
          </Grid>

          <Grid item sm={12}>
            <Typography variant="h4" component="p">
              Política de Cookies
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Typography>
              POLÍTICA DE COOKIES DE http://somosbluecity.es<br /><br />

              Esta Política de Cookies es parte integrante del Aviso Legal y la Política de Privacidad de IES El Rincón. El acceso y la navegación en el sitio, o el uso de los servicios del mismo, implican la aceptación de las Condiciones Generales establecidas en nuestro Aviso Legal (y por tanto de la Política de Privacidad y Política de Cookies). Por favor, léalas atentamente.<br /><br />

              Le agradecemos que haya decidido visitarnos. Queremos que su experiencia en el sitio sea lo mejor posible, y por ese motivo hemos escrito esta Política de Cookies de la forma más transparente posible.
            </Typography>
          </Grid>

          <Grid item sm={12}>
            <Typography variant="h6" component="p">
              1. ¿Qué es una Cookie?
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Typography>
              Las cookies son archivos que contienen pequeñas cantidades de información que se descargan en el dispositivo del usuario que se utiliza cuando visita un sitio web. Su finalidad principal es reconocer al usuario cada vez que accede a IES El Rincón. y nos permite, además, mejorar la calidad y la usabilidad de nuestra web.<br /><br />

              Las cookies son esenciales para el funcionamiento de Internet; no pueden dañar el equipo/dispositivo del usuario y, si se encuentran activadas en la configuración de su navegador, nos ayudan a identificar y resolver posibles errores de funcionamiento de http://somosbluecity.es.
            </Typography>
          </Grid>

          <Grid item sm={12}>
            <Typography variant="h6" component="p">
              2. Tipos de Cookies
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Typography>
              Hay diferentes tipos de cookies. Todas ellos trabajan de la misma manera, pero tienen pequeñas diferencias:
            </Typography>
            <ul>
              <li>Cookies de Sesión. Las cookies de sesión perduran solamente por la duración de su visita y se borran cuando se cierra el navegador. Su finalidad principal es identificar el tipo de dispositivo, apoyar la seguridad del sitio web o su funcionalidad básica. No contienen información personal que nos permita identificar a una persona.</li>
              <li>Cookies Persistentes o Permanentes: Se almacenan en el disco duro del dispositivo y la web las lee cada vez que se realiza una nueva visita; posee una fecha de caducidad o expiración determinada, cumplida la cual la cookie deja de funcionar. Permiten identificar sus acciones y preferencias; analizar las visitas y ayudan a comprender cómo llegan los usuarios a una página y mejorar servicios.</li>
              <li>Cookies de Funcionalidad: Permiten recordar decisiones adoptadas por el usuario, como su login o identificador. La información que estas cookies recogen se anonimiza (es decir, no contiene ni su nombre, dirección, u otros datos)</li>
              <li>Cookies de Terceros. Las cookies de terceros son las cookies que instala un sitio web que no es el que está visitando; por ejemplo, las usadas por redes sociales (como Facebook) o por complementos externos de contenido (como Google Maps). Además, algunas empresas de publicidad usan este tipo de archivos para realizar un seguimiento de sus visitas en cada sitio en el que se anuncian.</li>
              <li>Cookies Analíticas: Son cookies que tienen por finalidad el mantenimiento periódico y garantizar el mejor funcionamiento y servicio al usuario; recopilando datos de su actividad.</li>
            </ul>
          </Grid>

          <Grid item sm={12}>
            <Typography variant="h6" component="p">
              2. Uso de Cookies por parte de https://somosbluecity.es
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Typography>
              Mediante el acceso a https://somosbluecity.es, acepta de manera expresa que podamos usar este tipo de cookies en sus dispositivos. Si desactiva las cookies, puede que su navegación por https://somosbluecity.es no sea óptima y algunas de las utilidades que dispone https://somosbluecity.es no funcionen correctamente.<br /><br />

              https://somosbluecity.es usa Cookies de funcionalidad para la autenticación, y para guardar su preferencia de idioma. Concretamente usa un tipo avanzado de Cookies llamadas LocalStorage (para la preferencia de idioma) y SessionStorage (para la autenticación).<br /><br />
            
              https://somosbluecity.es también usa cookies de terceros. Concretamente de Google para la atenticación.
            </Typography>
          </Grid>

          <Grid item sm={12}>
            <Typography variant="h6" component="p">
              3. Configuración del usuario para evitar Cookies
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Typography style={{ wordWrap: "break-word", display: "inline-block" }}>
              Desde https://somosbluecity.es y en cumplimiento de la normativa legal vigente, ponemos a su disposición la información que le permita configurar su navegador/navegadores de Internet para mantener su privacidad y seguridad en relación a las cookies. Por ello, le facilitamos la información y enlaces a los sitos de soporte oficiales de los principales navegadores para que pueda decidir si desea o no aceptar el uso de cookies.<br /><br />

              Así, puede bloquear las cookies a través de las herramientas de configuración del navegador o bien puede configurar su navegador para que le avise cuando un servidor quiera guardar una cookie:
            </Typography>
            <ul>
              <li>Si utiliza Microsoft Internet Explorer, en la opción de menú Herramientas &gt; Opciones de Internet &gt; Privacidad &gt; Configuración. Para saber más visite http://windows.microsoft.com/es-es/windows-vista/block-or-allow-cookies y http://windows.microsoft.com/es-es/windows7/how-to-manage-cookies-in-internet-explorer-9</li>
              <li>Si utiliza Firefox, en la opción de menú Herramientas &gt; Opciones &gt; Privacidad &gt; Cookies. Para saber más visite http://support.mozilla.org/es/products/firefox/cookies.</li>
              <li>Si utiliza Chrome, en la sección de Opciones &gt; Opciones avanzadas &gt; Privacidad. Para saber más http://support.google.com/chrome/bin/answer.py?hl=es&answer=95647</li>
              <li>Si utiliza Opera, en la opción de Seguridad y Privacidad, podrá configurar el navegador. Para saber más visite http://www.opera.com/help/tutorials/security/cookies/</li>
            </ul>
          </Grid>

        </Grid>
      </div>
    </section>
  );
}

export default Disclaimer;