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

var updateRecord = (e, form) => {
    e.preventDefault();
    var formData = new FormData(form);
    $.ajax({
        type: 'PUT',
        url: '/products/edit',
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

var confirm = (key) => {
    swal({
        title: "¿Estás seguro?",
        text: "Estás por eliminar el producto",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            deleteRecord(key);
            
        }
    });
}

var deleteRecord = (key) => {
    console.log(key);
    var formData = new FormData();
    formData.append('key', key);
    $.ajax({
        type: 'put',
        url: '/products/delete',
        data: formData,
        async: false,
        success: (data) => {
            if (data){
                swal({
                    title: "Excelente!",
                    text: "El registro se ha eliminado con exito",
                    icon: "success",
                }).then(()=>{
                    location.reload();
                })
            }else{
                swal({
                    title: "Error!",
                    text: "Algo ha salido mal!",
                    icon: "error",
                });
            }
        },
        //cache: false,
        contentType: false,
        processData: false
    })
}