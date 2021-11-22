$("#add-main-category").click(() => {
  $("#add-main-category-form").validate({
    rules: {
      main_category: {
        required: true,
      },
    },
    highlight: function (element) {
      $(element).css("border-color", "red");
      $(element).parent().addClass("error");
    },
    unhighlight: function (element) {
      $(element).css("border-color", "green");
      $(element).parent().removeClass("error");
    },
    submitHandler: (form) => {
      let mainUrl = document.getElementById("main-category").value;
      $.ajax({
        url: "add-category/" + mainUrl,
        type: form.method,
        data: $(form).serialize(),
        success: (resp) => {
          if (resp === true) {
            alert("category addedd successfully");
          } else if (resp.cat === true) {
            alert("category already exist");
          } else {
            alert("something went wrong");
          }
        },
      });
    },
  });
});

$("#add-sub-category").click(() => {
  $("#add-sub-category-form").validate({
    rules: {
      main_category: {
        required: true,
      },
    },
    highlight: function (element) {
      $(element).css("border-color", "red");
      $(element).parent().addClass("error");
    },
    unhighlight: function (element) {
      $(element).css("border-color", "green");
      $(element).parent().removeClass("error");
    },
    submitHandler: (form) => {
      const subUrl = document.getElementById("sub-category").value;
      const mainUrl = document.getElementById("main-select").value;
      $.ajax({
        url: "/add-category/" + mainUrl + "/" + subUrl,
        type: form.method,
        data: $(form).serialize(),
        success: (resp) => {
          if (resp === true) {
            alert("category addedd successfully");
          } else if (resp.cat === true) {
            alert("category already exist");
          } else {
            alert("something went wrong");
          }
        },
      });
    },
  });
});

$('#mainSel').change(()=>{
  let mainCat = document.getElementById('mainSel').value
  $.ajax({
    url:'/get-subcat',
    method:'post',
    data:{
      mainCat
    },
    success:(data)=>{
      console.log(data)
      data.forEach(element => {
        console.log(element.category_name)
        let html = ' <option value="'+element.category_name+'">'+element.category_name+'</option>'
        $('#sub-select').append(html)
      });
  
    }
  })
})


$('#add-product').click((e)=>{
  e.preventDefault()
  let main_category = document.getElementById('mainSel').value
  let sub_category = document.getElementById('sub-select').value
  let product = document.getElementById('product_name').value
  $.ajax({
    url:'/add-products/'+main_category+'/'+sub_category+'/'+product,
   type:'post',
   data:{
     main_category,
     sub_category,
     product
   },
    success:(resp)=>{
      if (resp === true) {
        alert("category addedd successfully");
      } else if (resp.cat === true) {
        alert("category already exist");
      } else {
        alert("something went wrong");
      }
    }
  })
  return false;
})