var listaArtigos = [];
var pdfIcon = "<img src='icones/pdf-icon.png' style='width:2.3em; height:2.8em'/>"

function addPapers( divItemForm, arrayDados )			{

	var nPapers = arrayDados.length;
	var anosTitulos = [];
	var j=0;
	
	for ( i=0; i<nPapers; i++ )		{

		 if ( !anosTitulos.includes( arrayDados[i].ano ) )	{
			  var paragAno = document.createElement('p'); 
			  paragAno.innerHTML = arrayDados[i].ano;
			  paragAno.classList.add("titulo", "barraTitulo");
			  divItemForm.appendChild( paragAno );
			  
			  anosTitulos[j++] = arrayDados[i].ano;
			  // console.log(anosTitulos);
		 }
		
		var paperTxt = document.createElement('p'); // createElement('p')  // paragraph
		paperTxt.innerHTML = listaArtigos[i];
		paperTxt.className = "textoNormal";
		divItemForm.appendChild( paperTxt );
	}
}


function formataCitacao( dados )	{
	for( i=0; i<dados.length; i++ )	{
		// console.log( dados[i].ano + ", " + dados[i].autores + ", " + dados[i].titulo + ", " + dados[i].publicacao );	
		listaArtigos[ i ] = (i+1) + ". " + pdfIcon + "&nbsp;";
		listaArtigos[ i ] += dados[i].autores + " (" + dados[i].ano + ") ";
		listaArtigos[ i ] += "<b>" + dados[i].titulo + "</b> " + dados[i].publicacao;
	}
}

function loadJson()				{
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	  if ( this.readyState == 4 && this.status == 200 ) {
		   var arrayDados = JSON.parse( this.responseText );
		   formataCitacao( arrayDados );
		   criaArtigosHTML( arrayDados );
	  } 
	};
	xmlhttp.open("GET", "./content/papers.json", true);
	xmlhttp.send();
}

function criaArtigosHTML( arrayDados )			{
	
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
		
		addPapers( divItemForm, arrayDados );
		
		// ---------------- Final ------------------
		var divEnd = document.createElement('div');
		divEnd.innerHTML = " &nbsp;&nbsp; ";
		divEnd.className = "endFormacao";
		divLine.appendChild( divEnd );
		
		var br = document.createElement("br");
		divLine.appendChild( br );
   }
	
}