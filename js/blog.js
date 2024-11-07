let noticia=new Array();
noticia.push({"titulo":"Los 70 mejores cómics de 2023 según la Asociación de Críticos y Divulgadores","img":"70 mejores comic.jpg","descripcion":"La Asociación de Críticos y Divulgadores de Cómic de España (ACDCómic) ha hecho pública la segunda ronda de sus Esenciales 2023, una selección de cómics con la que esta organización pretende llamar la atención sobre algunas de las obras más destacadas de entre las muchas editadas en nuestro mercado. Está formada por 35 obras publicadas entre julio y diciembre de 2023 elegidas mediante votación interna entre los integrantes de la ACDCómic. Esta selección se presenta como una herramienta para animar a lectores, bibliotecas, librerías y otro tipo de colectivos culturales a descubrir obras destacadas.","fecha":new Date(2024,1,9)});
noticia.push({"titulo":"Selección chilena de vóleibol femenino vuelve a la Casa del Deporte","img":"Deporte.jpeg","descripcion":"Este sábado 14 de octubre, desde las 19:00 horas, el representativo nacional jugará ante su símil de México, equipo con el que compartirá grupo en los Juegos Panamericanos Santiago 2023.","fecha":new Date(2023,9,12)});
noticia.push({"titulo":"Voleibol, fútbol sala, baloncesto y mucho más deporte durante este fin de semana","img":"voleibol.jpg","descripcion":"A las competiciones deportivas habtituales del fin de semana se suman dos eventos que sitúan a Pinto en el centro del deporte regional y nacional","detalle":"El fin de semana del 15 al 17 de marzo estará lleno de actividades deportivas en Pinto. Están previstas distintas competiciones que congregan a los equipos de la ciudad. Desde el fútbol, fútbol sala o fútbol 7, al baloncesto, pasando por balonmano, voleibol o el ajedrez, las instalaciones municipales acogen diversas ligas y confrontaciones, en una nueva jornada.","fecha":new Date(2024,3,9)});
noticia.push({"titulo":"Cuidado: ¡noticias falsas!","img":"Cuidado noticias falsas.jpeg","descripcion":"En junio de 2015, un joven de California colgó en Facebook una foto de lo que parecía una rata empanada, servida en un restaurante de la cadena Kentucky Fried Chicken.<br>La foto se compartió miles de veces por las redes sociales y el post original tuvo millones de visitas. En cuestión de días, la historia fue publicada en medios de comunicación de todo el mundo… Pero al final, todo era una noticia falsa o ‘fake news’.","fecha":new Date(2017,5,6)});
noticia.push({"titulo":"Recetas de medicamentos con Clonazepam","img":"Recetas de medicamentos con Clonazepam.png","descripcion":"El Ministerio de Sanidad ha modificado a partir del 1 de enero del presente año las condiciones de la prescripción de medicamentos que contienen el principio activo CLONAZEPAM (RIVOTRIL©) dentro del Sistema Nacional de Salud (SNS) para optimizar su uso.  En orden a garantizar la vigilancia y control en todos los ámbitos de MUFACE, y evitar falsificaciones, se ha establecido una validación sanitaria a partir del 1 de enero de 2024, para asegurar y controlar que la prescripción sea correcta cuando no existe posibilidad de receta electrónica.","fecha":new Date(2024,0,1)});
var tagDialog;

function nuevaNoticia() {
	tagDialog.dialog("open");
}

$(document).ready(function(){
    cargarPagina();
    AbrirDialogo();

    VueltaAlIndex();
    
    Filtrado();
   
    AbrirDetalles();

    CerrarDetalles();

    GuardarNoticiaSinDialogo();
   
   

    
});

function GuardarNoticiaSinDialogo() {
    $("#guardar").click(function (event) {
        event.preventDefault();
        if ($("#nombre").val() != "") {
            var noticia_nombre = $("#nombre").val();
        } else {
            alert("Tienes que introducir en algo en nombre");
            return;
        }
        if ($("#descripcion").val() != "") {
            var noticia_descipcion = $("#descripcion").val();
        } else {
            alert("Tienes que introducir en algo en descripcion");
            return;
        }
        var noticia_fecha = new Date($("#fecha").val());
        if (isNaN(noticia_fecha)) {
            alert("Es obligatorio poner una fecha");
            return;
        }
        GuardarNoticiaLocal(noticia_nombre, noticia_descipcion, noticia_fecha);
        pintar_blogs();
    });
}

function CerrarDetalles() {
    $("#caja_informacion").on("click", "#volver", function () {
        $("#btndialogo").show();
        $(".formulario_historia").show();
        $("#caja_informacion").hide();
        $("#caja_blog").show();
        $("#titulo").show();
    });
}

function AbrirDetalles() {
    $("#blog").on("click", ".noticia_div", function () {
        var posarray = $(this).index();
        mostrarinformacion(posarray);
    });
}

function VueltaAlIndex() {
    $("#logo").click(function () {
        window.location = "Index.html";
    });
}

function cargarPagina() {
    var storage = JSON.parse(localStorage.getItem("NoticiaBlog"));
    if (storage != undefined) {
        noticia = storage;
        noticia.forEach(elemento => {
            elemento.fecha = new Date(elemento.fecha);
        });
    }
    else {
        localStorage.setItem("NoticiaBlog", JSON.stringify(noticia));
    }
    pintar_blogs();

}

function AbrirDialogo() {
    tagDialog = $("#dialog-form").dialog({
        autoOpen: false,
        height: 700,
        width: 500,
        modal: true,
        buttons: {
            "Añadir": function () {
                if (guardarNoticiaConDialogo()) {
                    tagDialog.dialog("close");
                }
            },
            "Cancelar": function () {
                tagDialog.dialog("close");
            }
        }
    });
}

function guardarNoticiaConDialogo(){
    if($("#nombre_dialogo").val()!=""){
        var noticia_nombre=$("#nombre_dialogo").val();
    }else{
        alert("Tienes que introducir en algo en nombre");
        return false;
    }
    if($("#descripcion_dialogo").val()!=""){
        var noticia_descipcion=$("#descripcion_dialogo").val();
    }else{
        alert("Tienes que introducir en algo en descripcion");
        return false;
    }
    var noticia_fecha=new Date($("#fecha_dialogo").val());
    if(isNaN(noticia_fecha)){
        alert("Es obligatorio poner una fecha");
        return;
    }
    GuardarNoticiaLocal(noticia_nombre,noticia_descipcion,noticia_fecha);
    pintar_blogs();
    return true;
}

function Filtrado(){
    $("#filtro").change(function(){
        if($("#filtro").val()=="1"){
            noticia.sort((a,b)=>b.fecha-a.fecha);
        }
        if($("#filtro").val()=="2"){
            noticia.sort((a,b)=>a.fecha-b.fecha);
        }
       pintar_blogs();
    });

    
}

function GuardarNoticiaLocal(noticia_nombre,noticia_descipcion,noticia_fecha) {
    noticia.push({"titulo":noticia_nombre,"img":"./default.jpg","descripcion":noticia_descipcion,"fecha":new Date(noticia_fecha)});
    localStorage.setItem("NoticiaBlog", JSON.stringify(noticia));
}

function mostrarinformacion(posarray){
    MostrarDetalles();
    $("#caja_informacion").html("");
    var tagh1=$("<h1></h1>").addClass("titulo_noticias text-success").css({"font-size":"35px","text-align":"center","color":"rgb(214, 214, 97)"});
    tagh1.html(noticia[posarray].titulo); 
    var tagp=$("<p></p>").css({"font-size":"20px","margin-top": "15px"});
    tagp.html(noticia[posarray].descripcion);
    var tagspan=$("<span></span>").html(noticia[posarray].fecha.getFullYear()+"/"+(noticia[posarray].fecha.getMonth()+1)+"/"+noticia[posarray].fecha.getDate()).addClass("fecha_detalle");
    var tagimagen=$("<img/>").attr("src","./img/noticias/"+noticia[posarray].img).addClass("imagen").css({"height":"600px"}); 
    var tagdiv=$("<div></div>").addClass("noticia_div");
    var tagbutton=$("<button></button>").addClass("btn btn-success").attr("id","volver");
    tagbutton.html("Salir");
    tagdiv.append(tagh1,tagimagen,tagp,tagspan,tagbutton).css({"width":"90%"});
    $("#caja_informacion").append(tagdiv);         
}

function MostrarDetalles() {
    $("#btndialogo").hide();
    $(".formulario_historia").hide();
    $("#caja_blog").hide();
    $("#titulo").hide();
    $("#caja_informacion").show();
}

function pintar_blogs(){
        $("#blog").html("");
        $(noticia).each(function(){
            var tagh4=$("<h4></h4>").addClass("titulo_noticias");
            tagh4.html(this.titulo); 
            var tagspan=$("<span></span>").html(this.fecha.getFullYear()+"/"+(this.fecha.getMonth()+1)+"/"+this.fecha.getDate()).addClass("fecha");
            var tagimagen=$("<img/>").attr("src","./img/noticias/"+this.img).addClass("imagen"); 
            var tagdiv=$("<div></div>").addClass("noticia_div col-12 ");
            tagdiv.append(tagh4,tagimagen,tagspan);
            $("#blog").append(tagdiv);         
        });
}