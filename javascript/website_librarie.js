var btnTopClicked = false; 

alert("Ok!!");
  
/* 1) Função usada pelo menu drop-down para ir aos elementos âncoras (subitens) */
function rolar_para(elemento) 			{
	
	var str = window.location.href;
	var barraPos = str.lastIndexOf("/") + 1;
	var htmlPos = str.lastIndexOf(".html");
	var pageName = str.substring( barraPos , htmlPos );
	
	if ( pageName == "index" )		{
		 $('html, body').animate( { scrollTop: $(elemento).offset().top }, 2000);
	}	 else 	{
		 location.replace("index.html");
	}
	$('html, body').animate( { scrollTop: $(elemento).offset().top }, 2000);
	
}

/* 2) ---- Fade-In das Imagens dos projetos ------ 
/* 2.1. Objetivo: Detecta quando um elemento está na Viewport */
$.fn.isInViewport = function() 				{
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

// 2.2. Objetivo: Quando realizar o scroll
$(window).on('resize scroll', function() 	{	
  $('.imgproj').each(function() {
	  var idAtivo = $(this).attr('id'); // Id ativos id="IMG1", "IMG2", "IMG3", "IMG4"
	  
	  // Caso a div atual esteja na viewport
	  if ($(this).isInViewport()) 	{	 
		 $('#' + idAtivo).removeClass('imgprojFadeOut'); // remove o fadeOut
		 $('#' + idAtivo).addClass('imgprojFadeIn');     // adiciona o fadeIn
	} else {
		 $('#' + idAtivo).removeClass('imgprojFadeIn');
		 $('#' + idAtivo).addClass('imgprojFadeOut');
	}
  });
  // Define visibilidade do botão de topo de acordo com o scroll
  showTopoBtn();
});  

/* 3) Exibe o botão para ir ao topo da página */
function showTopoBtn()		{
	
	 // Acessar Botão de Retorno para o topo da Página
	 var mybutton = document.getElementById("myTopoBtn");
	
	 if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		 mybutton.style.display = "block";
	 }  else  {
		if ( !btnTopClicked )	{
			  mybutton.style.display = "none";
		}
	 }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() 		{
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

/* 4) Verifica se rolagem foi ao topo e esconde o botão com fadeOut. */
function hideBtnOnTop()		{
	
	btnTopClicked = true;
	
	if ( window.scrollY == 0 )	{ // Caso topo	
		 $('#myTopoBtn').fadeOut( "slow", function() {
			// alert("END!");
			btnTopClicked = false;
		 });
	} else {	// Caso não topo, repete a função
		 setTimeout( hideBtnOnTop, 1000 );
	}
}


/* function loadScript()	{
	let myScript = document.createElement("script");
	myScript.setAttribute("src", "javascript/website_librarie.js");
	myScript.id = "scriptID";
	document.head.appendChild( myScript );
	document.head.removeChild( myScript ); 
	// Import code
	let myScript = document.getElementById('scriptID');
	myScript.setAttribute("src", "javascript/website_librarie.js");
	// document.head.appendChild( myScript );
		
	// Exclude code
	document.head.removeChild(myScript);
	system=undefined;
}*/


