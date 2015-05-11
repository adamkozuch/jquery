
$(document).ready(function (){

	//$('#imie').inputText( {topic: "Podaj swoje imię"});
	//$('#nazwisko').inputText().addClass("mycolor");

	// $('#imie').testText('aaaaa');
	// $('#imie').testText('aaaaa');
	$('#email').walidacja({},"email");
	$('#regex').walidacja({},"regex");
	$('#entropia').walidacja({},"passwordEnthropy");
	$('#zlożoność').walidacja({},"passwordComplexity");
	$('#kod').walidacja({},"postCode");
	// $('#imie').testText('hide', 'hideContent');

});
