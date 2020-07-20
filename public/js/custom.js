var dataEntry = (e, form) => {
    e.preventDefault();
    var formData = new FormData(form);
    $.ajax({
        type: 'post',
        url: '/products/add',
        data: formData,
        async: false,
        success: (data)=>{
            if (data){
                swal({
                    title: "Excelente!",
                    text: "Se ha registrado el producto!",
                    icon: "success",
                });
            }else{
                swal({
                    title: "Error!",
                    text: "Algo ha salido mal!",
                    icon: "error",
                });
            }
        },
        cache: false,
        contentType: false,
        processData: false
    })
}
var redirect = (key) =>{
    $.redirect('/products/edit', {key: key}, "POST", "_blank");
}