$(document).ready(function (){
	swal("Ingresa el nombre del artista o banda");
	$("#search-form button").click(function(event){
		event.preventDefault();
		var term = cleanTerm($("#search-form input").val());
		var results = callItunesSearch(term, showResults, noResults, error);
	});

	function callItunesSearch(searchTerm, showResults, noResultsMessage, error){
		startLoading();
		var root ="https://itunes.apple.com/search?";
		$.ajax({
			url: root,
			method: "GET",
			data: {
				term: searchTerm,
				limit: 4
			},

			success: function(data){
				swal("Estás a punto de escuchar tu canción favorita!");
				showResults(JSON.parse(data));
			},
			error: function(data){
				console.log(data.status);
				noResultsMessage();
			},
			complete: function(data){
				stopLoading();
			}
        });
	}

  	// Imprime los resultados
	function showResults(data){
		console.log(data);
		data.results.map(function(cancion, index){
			var audioMusic = new Audio();
			audioMusic.src = cancion.previewUrl; 
			audioMusic.controls = true;
			var song  = document.createElement("div");
			var imgSong = document.createElement("img");
			$(imgSong).attr("src",cancion.artworkUrl30);
			$(song).append(audioMusic);
			$(song).append(imgSong);
			$(song).addClass("song");
			$("#search-results").append(song);
		});
	}
  
 	function noResults(){
       	$("#search-results").html(song);
    }
  	function error(){console.log("Error")}
	
	function cleanTerm(term){
        term = $.trim(term);
		return term.replace(/s/g, "+");
	}

	function startLoading(){
		var div = $(document.createElement("div")).addClass("spinner");
		var dot2 = $(document.createElement("div")).addClass("dot2");
		var dot1 = $(document.createElement("div")).addClass("dot1");
		div.append(dot1);
		div.append(dot2);
		$("#search-results").html("").append(div);
	}

	function stopLoading(){
		$(".spinner").remove();
	}
});
