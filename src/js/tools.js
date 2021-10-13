$(function () {
    //ajax get and confirm
    $.ajaxGet();

    //ajax form post
    $.ajaxForm({
        success: (data) => {
            if (data.status === 'success') {
                Fancybox.getInstance().close();
            }
        },
        ajax:{
            headers:{
                'X-CSRF-TOKEN':''
            }
        }
    });

    //form validation
    $('form[novalidate]').jbvalidator();

    //form input mask
    //mobile phone
    $('input[data-type=mobile]').each(function () {
        IMask(this, {mask: '+{9\\0} ({5}00) 000 0000'});
    })
    //phone
    $('input[data-type=phone]').each(function () {
        IMask(this, {mask: '+{9\\0} (000) 000 0000'});
    })
    //money
    $('input[data-type=money]').each(function () {
        IMask(this, {
            mask: Number,
            normalizeZeros:false,
            radix: '.',
            mapToRadix: [',']
        });
    })
    //credit card
    $('input[data-type=card]').each(function () {
        IMask(this, {
            mask: '0000 0000 0000 0000',
            // placeholderChar: '_',
            // lazy: false
        });
    })
    $('input[data-type=cvv]').each(function () {
        IMask(this, {
            mask: '000[0]',
            // placeholderChar: '_',
            // lazy: false
        });
    })
    //number
    $('input[data-v-min],input[data-v-max]').each(function () {
        IMask(this, {
            mask: Number,
            scale: 8,
            radix: '.',
            mapToRadix: [',']
        });
    })

    //fancybox modal
    Fancybox.bind('[data-fancybox][data-type=ajax]', {
        mainClass: 'fancybox-modal',
        dragToClose: false,
        click: 'next',
        on: {
            done: () => {
                $('.fancybox-modal form[novalidate]').jbvalidator();
                //form input mask
                //mobile phone
                $('.fancybox-modal input[data-type=mobile]').each(function () {
                    IMask(this, {mask: '+{9\\0} ({5}00) 000 0000'});
                })
                //phone
                $('.fancybox-modal input[data-type=phone]').each(function () {
                    IMask(this, {mask: '+{9\\0} (000) 000 0000'});
                })
                //money
                $('.fancybox-modal input[data-type=money]').each(function () {
                    IMask(this, {
                        mask: Number,
                        normalizeZeros:false,
                        radix: '.',
                        mapToRadix: [',']
                    });
                })
                //credit card
                $('.fancybox-modal input[data-type=card]').each(function () {
                    IMask(this, {
                        mask: '0000 0000 0000 0000',
                        // placeholderChar: '_',
                        // lazy: false
                    });
                })
                $('.fancybox-modal input[data-type=cvv]').each(function () {
                    IMask(this, {
                        mask: '000[0]',
                        // placeholderChar: '_',
                        // lazy: false
                    });
                })
                //number
                $('.fancybox-modal input[data-v-min],input[data-v-max]').each(function () {
                    IMask(this, {
                        mask: Number,
                        scale: 8,
                        radix: '.',
                        mapToRadix: [',']
                    });
                })
            }
        }
    });
});
