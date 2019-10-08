$(document).ready(function () {
  const lista = [];
  const nombres = [];
  const statescities = [];
  $('input[type="checkbox"]').click(function () {
    if ($(this).prop('checked') === true) {
        if ($(this).attr('name') == 'states') {
            statescities.push($(this).attr('data-name'));
        } else {
     nombres.push($(this).attr('data-name'));
      }
      lista.push($(this).attr('data-id'));
    } else if ($(this).prop('checked') === false) {
        if ($(this).attr('name')== 'states') {
       statescities.splice($.inArray($(this).attr('data-name'),statescities), 1); 
        } else {
      nombres.splice($.inArray($(this).attr('data-name'),nombres), 1);
        }
      lista.splice($.inArray($(this).attr('data-id'), lista), 1);
      }
    $(".amenities h4").text(nombres);
    $(".locations h4").text(statescities);
  });
  let jqxhr = $.get( "http://0.0.0.0:5001/api/v1/status/", function() {
    $("DIV#api_status").addClass("available");
  })
  .fail(function() {
    $("DIV#api_status").removeClass("available");
  })
  const url = "http://0.0.0.0:5001/api/v1/places_search/";
  $.ajax({
          type : "POST",
          url : url,
          contentType : "application/json",
          data : "{}",
          success : function(data) {
             $.each(data, function(key, value) {
                 
                 $('.places').append('<article><div class="title"><h2>' + value.name + '</h2><div class="price_by_night">' + value.price_by_night + '</div></div><div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + value.max_guest + 'Guests </div> <div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />'+ value.number_rooms + ' Bedrooms </div> <div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + value.number_bathrooms +'Bathroom </div> </div><div class="description">' + value.description + '</div></article>'); 
              });
            },
          error : function(error) {
          },
        });
  $("button").click(function() {
      $(".places article").remove();
    console.log(lista);
      $.ajax({
              type : "POST",
              url : "http://0.0.0.0:5001/api/v1/places_search/",
              contentType: "application/json",
              data : JSON.stringify({amenities: lista, cities: lista, states: lista}),
              success : function(data) {
                $.each(data, function(key, value) {
                  $('.places').append('<article><div class="title"><h2>' + value.name + '</h2><div class="price_by_night">' + value.price_by_night + '</div></div><div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + value.max_guest + 'Guests </div> <div class="number_roo    ms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />'+ value.number_rooms + ' Bedrooms </div> <div class="number_bathrooms"><i class="fa fa-bath fa-3x" ari    a-hidden="true"></i><br />' + value.number_bathrooms +'Bathroom </div> </div><div class="description">' + value.description + '</div></article>');
                });
            },
      });
              
});
});
