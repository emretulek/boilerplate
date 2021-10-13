(function ($){
    "use strict";

    /**
     * Toast
     * @param options
     * @returns {*}
     */
    $.swToast = function (options) {

        let defaults = {
            customClass: {
                container: 'theme-met-toast'
            },
            toast: true,
            showConfirmButton: false,
            position: 'bottom-end',
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        };

        options = $.extend(defaults, options);

        return swal.fire(options);
    };

    /**
     * Confirm
     * @param options
     * @returns {*}
     */
    $.swConfirm = function (options) {

        let defaults = {
            customClass: {
                confirmButton: 'btn btn-lg btn-success',
                cancelButton: 'btn btn-lg btn-danger',
                container: 'theme-met'
            },
            confirmButtonText: 'Evet',
            cancelButtonText: 'Hayır',
            allowOutsideClick: false,
            showCloseButton: true,
            buttonsStyling: false,
            showCancelButton: true,
        };

        options = $.extend(defaults, options);

        return swal.fire(options);
    };

    /**
     * Alert
     * @param options
     * @returns {*}
     */
    $.swAlert = function (options) {

        let defaults = {
            customClass: {
                confirmButton: 'btn btn-lg btn-primary',
                container: 'theme-met'
            },
            confirmButtonText: 'Tamam',
            buttonsStyling: false,
        };

        options = $.extend(defaults, options);

        return swal.fire(options);
    };


    $.swPrompt = function (options) {

        let defaults = {
            customClass: {
                confirmButton: 'btn btn-lg btn-primary',
                cancelButton: 'btn btn-lg btn-danger',
                container: 'theme-met'
            },
            input: 'text',
            confirmButtonText: 'Tamam',
            cancelButtonText: 'Vazgeç',
            allowOutsideClick: false,
            showCloseButton: true,
            buttonsStyling: false,
            showCancelButton: true,
        };

        options = $.extend(defaults, options);

        return swal.fire(options);
    };
})(jQuery);
