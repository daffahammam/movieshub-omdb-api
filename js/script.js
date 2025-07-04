function searchMovie() {
  $("#movie-list").html(""); // Clear previous results

  $.ajax({
    url: "https://www.omdbapi.com", // gunakan https agar aman
    dataType: "json",
    type: "get",
    data: {
      apikey: "589af46c",
      s: $("#search-input").val(),
    },
    success: function (result) {
      if (result.Response === "True") {
        let movies = result.Search;

        $.each(movies, function (i, data) {
          $("#movie-list").append(
            `
              <div class="col-md-4 mb-3">
                <div class="card">
                  <img src="${data.Poster}" class="card-img-top" alt="${data.Title}">
                  <div class="card-body">
                    <h5 class="card-title">${data.Title}</h5>
                    <p class="card-text">Year: ${data.Year}</p>
                    <a href="detail.html?id=${data.imdbID}" class="btn btn-primary detail" data-bs-toggle="modal"
                        data-bs-target="#exampleModal" data-id="` +
              data.imdbID +
              `">Detail</a>
                  </div>
                </div>
              </div>
            `
          );
        });
        $("#search-input").val("");
      } else {
        $("#movie-list").html(
          `<h1 class="text-center">${result.Error}</h1>` // ✅ perbaikan di sini
        );
      }
    },
  });
}

// ✅ Jalankan saat DOM siap
$(document).ready(function () {
  $("#search-button").on("click", function () {
    searchMovie();
  });

  $("#search-input").on("keyup", function (e) {
    if (e.keyCode === 13) {
      searchMovie();
    }
  });

  $("#movie-list").on("click", ".detail", function () {
    $.ajax({
      url: "https://www.omdbapi.com",
      dataType: "json",
      type: "get",
      data: {
        apikey: "589af46c",
        i: $(this).data("id"),
      },
      success: function (movie) {
        if (movie.Response === "True") {
          $(".modal-body").html(
            `
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-4">
                    <img src="${movie.Poster}" class="img-fluid" alt="${movie.Title}">
                  </div>
                  <div class="col-md-8">
                    <h3>${movie.Title}</h3>
                    <ul class="list-group">
                      <li class="list-group-item">Released: ${movie.Released}</li>
                      <li class="list-group-item">Genre: ${movie.Genre}</li>
                      <li class="list-group-item">Director: ${movie.Director}</li>
                      <li class="list-group-item">Actors: ${movie.Actors}</li>
                      <li class="list-group-item">Plot: ${movie.Plot}</li>
                      <li class="list-group-item">Language: ${movie.Language}</li>
                      <li class="list-group-item">Country: ${movie.Country}</li> 
                      <li class="list-group-item">Awards: ${movie.Awards}</li>
                    </ul>
                  </div>    
                </div>
              </div>
            `
          );
        } else {
          $(".modal-body").html(
            `<h1 class="text-center">${movie.Error}</h1>` // ✅ perbaikan di sini
          );
        }
      },
    });
  });
});
