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
            if (data == 1){
                this.location.href = '/products';
            }else{
                if (data == 0){
                    this.location.href = '/';
                }else{
                    swal({
                        title: 'Error!',
                        text: 'Algo ha salido mal!',
                        icon: 'error',
                    });
                }
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

var addComment = (e, form) => {
    e.preventDefault();
    var formData = new FormData(form);
    $.ajax({
        url: '/comments',
        type: 'post',
        data: formData,
        async: false,
        success: (data) => {
            if (data){
                swal({
                    icon: 'success',
                    title: 'Exito!',
                    text: 'El comentario ha sido agregado'
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
        cache: false,
        contentType: false,
        processData: false
    })
}

var addCart = (key) => {
    var formData = new FormData();
    formData.append('key', key);
    $.ajax({
        url: '/cart',
        type: 'post',
        data: formData,
        async: false,
        success: (data) => {
            if (data){
                swal({
                    icon: 'success',
                    title: 'Exito!',
                    text: 'Se ha agregado el producto al carrito'
                }).then(() => {
                    location.href = '/cart';
                })
            }else{
                swal({
                    title: 'Error!',
                    text: 'El producto se encuentra en el carrito!',
                    icon: 'error',
                });
            }
        },
        cache: false,
        contentType: false,
        processData: false
    })
}

var spliceProduct = (key) =>{
    var formData = new FormData();
    formData.append('key', key);
    $.ajax({
        url: '/cart',
        type: 'put',
        data: formData,
        async: false,
        success: (data) => {
            if (data){
                swal({
                    icon: 'success',
                    title: 'Exito!',
                    text: 'Se ha eliminado el producto del carrito'
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
        cache: false,
        contentType: false,
        processData: false
    })
}

var pagar = (costo, descripcion) => {
    paypal.Button.render({
        style: {
            size: 'responsive'
        },
        env: 'sandbox', // Optional: specify 'sandbox' environment
        client: {
            sandbox:    'AU_dQSUGznHPKV4BxMWsnsEQ3_HbEmwRQT5NVha28mKRe5VyTy42A-DLjZR2e_Q-RT3pulThunhW7am1'
        },
        commit: true, // Optional: show a 'Pay Now' button in the checkout flow
        payment: (data, actions) => {
            return actions.payment.create({
            payment: {
                transactions: [
                {
                    amount: {
                        total: costo,
                        currency: 'MXN'
                    },
                    description: descripcion,
                }
                ]
            }
            });
        },
        onAuthorize: (data, actions) => {
            return actions.order.capture().then((details) => {
                // Show a success message to the buyer
                //alert('Transaction completed by ' + details.payer.name.given_name + '!');
                if (data.orderID){
                    //console.log(data.orderID);
                    processOrder(data.orderID);
                }else{
                    swal({
                        title: 'Error!',
                        text: 'Algo ha salido mal!',
                        icon: 'error'
                    })
                }
            });
        },
        onError: (err) => {
            console.log(err)
        }
    }, '#paypal-button'); 
}

var processOrder = (orderID) => {
    var formData = new FormData();
    formData.append('orderID', orderID);
    $.ajax({
        url: '/payment',
        type: 'POST',
        async: false,
        data: formData,
        success: (data) => {
            console.log(data)
            swal({
                title: 'Pago exitoso',
                icon:'success', 
                text: 'A continuación será redirigido para descargar sus archivos'
            }).then((response) => {
                location.href = '/mis-cursos';
            })
        },
        cache: false,
        contentType: false,
        processData: false
    })
}
