var listaArtigos = [];
var pdfIcon = "<img src='icones/pdf-icon.png' style='width:2.3em; height:2.8em'/>"

function addPapers( divItemForm, nPapers )			{
	
	for ( i=0; i<nPapers; i++ )	{
		var paperTxt = document.createElement('p'); // createElement('p')  // paragraph
		paperTxt.innerHTML = listaArtigos[i];
		paperTxt.className = "textoNormal";
		divItemForm.appendChild( paperTxt );
	}
}


function formataCitacao( dados )	{
	for( i=0; i<dados.length; i++ )	{
		// console.log( dados[i].ano + ", " + dados[i].autores + ", " + dados[i].titulo + ", " + dados[i].publicacao );	
		listaArtigos[ i ] = (i+1) + ". " + pdfIcon;
		listaArtigos[ i ] += dados[i].autores + " (" + dados[i].ano + ") ";
		listaArtigos[ i ] += "<b>" + dados[i].titulo + "</b> " + dados[i].publicacao;
	}
}

function loadJson()				{
	
	alert("OI LOAD!!");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	  if ( this.readyState == 4 && this.status == 200 ) {
		   var arrayDados = JSON.parse( this.responseText );
		   formataCitacao( arrayDados );
		   criaArtigosHTML( arrayDados );
	  } 
	};
	xmlhttp.open("GET", "./papers-v1.json", true);
	xmlhttp.send();
}

function criaArtigosHTML( arrayDados )			{
	
	alert( "teste= " + arrayDados[0].ano );
	
	var i=0;
	
	var rootDiv = document.getElementById("artigosId"); // .innerHTML
    if ( rootDiv != null )		{
		// Nova Linha (Row)
		var divLine = document.createElement('div'); 
		divLine.className = 'row';
		rootDiv.appendChild( divLine );
		
		// Novo espaçamento do logoFormação
		var divLogo = document.createElement('div'); 
		divLogo.innerHTML = ' &nbsp;&nbsp; ';
		divLogo.className = 'logoFormacao';
		divLine.appendChild( divLogo );
		
		// Novo espaço para o item
		var divItemForm = document.createElement('div'); 
		divItemForm.className = 'itemFormacao';
		divLine.appendChild( divItemForm );
		
		// Adiciona Ano
		var paragAno = document.createElement('p'); 
		paragAno.innerHTML = '2019';
		paragAno.classList.add("titulo", "barraTitulo");
		divItemForm.appendChild( paragAno );
		
		addPapers( divItemForm, listaArtigos.length );
		
		/*/Adiciona Ano
		var paragAno = document.createElement('p'); 
		paragAno.innerHTML = '2022';
		paragAno.classList.add("titulo", "barraTitulo");
		divItemForm.appendChild( paragAno );
		addPapers( divItemForm, 3 );*/
		
		// ---------------- Final ------------------
		var divEnd = document.createElement('div');
		divEnd.innerHTML = " &nbsp;&nbsp; ";
		divEnd.className = "endFormacao";
		divLine.appendChild( divEnd );
		
		var br = document.createElement("br");
		divLine.appendChild( br );
   }
	
}