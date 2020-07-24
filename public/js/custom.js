var dataEntry = (e, form) => {
    e.preventDefault();
    var formData = new FormData(form);
    $.ajax({
        type: 'post',
        url: '/products/add',
        data: formData,
        async: false,
        success: (data) => {
            if (data){
                swal({
                    title: 'Excelente!',
                    text: 'Se ha registrado el producto!',
                    icon: 'success',
                });
                $(form).trigger('reset');
            }else{
                swal({
                    title: 'Error!',
                    text: 'Algo ha salido mal!',
                    icon: 'error',
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
        success: (data) => {
            if (data){
                swal({
                    title: 'Excelente!',
                    text: 'Se ha registrado el producto!',
                    icon: 'success',
                });
            }else{
                swal({
                    title: 'Error!',
                    text: 'Algo ha salido mal!',
                    icon: 'error',
                });
            }
        },
        cache: false,
        contentType: false,
        processData: false
    })
}

var redirect = (key) => {
    // , '_blank'
    $.redirect('/products/edit', {key: key}, 'POST');
}

var confirm = (key) => {
    swal({
        title: '¿Estás seguro?',
        text: 'Estás por eliminar el producto',
        icon: 'warning',
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
                    title: 'Excelente!',
                    text: 'El registro se ha eliminado con exito',
                    icon: 'success',
                }).then(() => {
                    location.reload();
                })
            }else{
                swal({
                    title: 'Error!',
                    text: 'Algo ha salido mal!',
                    icon: 'error',
                });
            }
        },
        //cache: false,
        contentType: false,
        processData: false
    })
}

var pdfPreview = (file) => {
    var fileExt = file.split('.').pop();
    if (fileExt.toLowerCase() === 'pdf'){
        $('#preview').modal('show');
        $('#frame').attr('src', `/storage/${file}`);
    }else{
        swal({
            title: 'Advertencia!',
            text: `Los archivos ${fileExt} no se pueden previsualizar`,
            icon: 'warning',
        });
    }
}

var inicioSesion = (e, form) => {
    e.preventDefault();
    var formData = new FormData(form);
    $.ajax({
        type: 'post',
        url: '/login',
        data: formData,
        async: false,
        success: (data) => {
            //data = JSON.parse(data)
            console.log(data)
            if (data == true){
                this.location.href = '/products';
            }else{
                swal({
                    title: 'Error!',
                    text: 'Algo ha salido mal!',
                    icon: 'error',
                });
            }
        },
        cache: false,
        contentType: false,
        processData: false
    });
}

var registroUsuario = (e, form) => {
    e.preventDefault();
    var formData = new FormData(form);
    var match = false;
    if ($('#pwd').val() === $('#password').val()){
        match = true;
    }
    if (match === true){
        $.ajax({
            type: 'post',
            url: '/login/registro',
            data: formData,
            async: false,
            success: (data) => {
                console.log(data)
                if (data > 0){
                    $(form).trigger('reset');
                    swal({
                        title: 'Exito',
                        text: 'Se ha registrado satisfactoriamente',
                        icon: 'success'
                    }).then(() =>{
                        location.href = '/login'
                    })
                }else{
                    swal({
                        title: 'Algo ha salido mal!',
                        text: 'Verifique que el correo ingresado no se encuentre registrado',
                        icon: 'error',
                    });
                }
            },
            cache: false,
            contentType: false,
            processData: false
        });
    }else{
        swal({
            title: 'Error!',
            text: 'La contraseña ingresada no coincide',
            icon: 'error',
        });
    }
}