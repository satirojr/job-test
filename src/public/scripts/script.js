$(document).ready(function(){
  
  $(document).click(() => {
    $(".obj2").hide();
  });

  $(".obj2").click((e) => {
    e.stopPropagation();
  });
  $(".option-button").click((e) => {
    e.stopPropagation();
    $(".obj2").toggle();
  });

  var currentPage = 0;
  var limit;
  var pages;
  var item;

  function fetch () {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", `/?page=${currentPage+1}&limit=${limit}&item=${item}`);
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
  }

  function render () {

    if (limit == '' || $("#item-menu option:selected").val() == 'choose' || parseInt(limit) >= 200) {
      return;
    }

    let request = fetch();
    request
      .then((html) => {
        $(".obj3").prepend(html);
      })
      .catch(() => {
        console.log("Some problema occured!");
      });
  }

  render();

  function checkLimit () {
    if (limit == undefined) {
      return;
    }
  }

  function changeQuantity () {
    $(".items-quantity input").removeClass("required");
    currentPage = 0;
    limit = $(".items-quantity input").val();
    pages = Math.ceil(limit/3);
    $(".item").remove();
    render();
  }

  $(".items-quantity input")
    .change(changeQuantity)
    .keyup(changeQuantity);

  $("#item-menu").change(() => {
    
    let $quantity = $(".items-quantity input");

    item = $("#item-menu option:selected").val();
    if ($quantity.val() == '') {
      $quantity
        .focus()
        .addClass("required");
      return;
    }

    $(".item").remove();
    render();
  })

  $("#previous").click(() => {
    if (currentPage <= 0) {
      return 
    }
    currentPage--;
    checkLimit();
    $(".item").remove();
    render();
  });

  $("#next").click(() => {
    if (currentPage == pages-1) {
      return;
    }
    currentPage++;
    checkLimit();
    $(".item").remove();
    render();
  });
});

