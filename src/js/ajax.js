(function ($) {

        "use strict";

        $.ajaxForm = function (options) {

            let defaults = {
                selector: '.ajax-form',
                spinner: true,
                spinnerIconClass: 'spinner-border spinner-border-sm',
                inputError: true,
                toast: true,
                submitIconSelector: 'i',
                locationDelay: 3000,
                before: (jqXHR, settings) => {
                },
                success: (data, form, jqXHR) => {
                },
                error: (jqXHR, form, errorThrown) => {
                },
                complete: (jqXHR, _form) => {
                },
                ajax:{
                }
            };

            options = $.extend(defaults, options);

            $('body').on('submit', options.selector, function (e) {

                let _form = $(this);
                let _submitter = $(e.originalEvent.submitter) ?? $(this).find('[type=submit]') ?? _form.find('button');
                let _submitterName = _submitter.attr('name');
                let _submitterValue = _submitter.attr('value');
                let _icon = _submitter.find(options.submitIconSelector);
                let _method = _form.attr('method') ?? 'post';
                let _enctype = _form.attr('enctype') ?? 'application/x-www-form-urlencoded';
                let _action = _form.attr('action');
                let _formData = _form.serialize();
                let _contentType = 'application/x-www-form-urlencoded; charset=UTF-8';

                if (_enctype === 'multipart/form-data') {
                    _formData = new FormData(_form[0]);
                    _contentType = false;
                    if(_submitterName){
                        _formData.append(_submitterName, _submitterValue)
                    }
                }else{
                    if(_submitterName) {
                        _formData += '&' + _submitterName + '=' + _submitterValue
                    }
                }

                let AJAX_DEFAULT = {
                    type: _method,
                    enctype: _enctype,
                    url: _action,
                    data: _formData,
                    processData: false,
                    contentType: _contentType,
                    cache: false,
                    timeout: 120000,
                    beforeSend: (jqXHR, settings) => {

                        $(_submitter).prop('disabled', true);

                        if (options.spinner) {
                            $(_icon).attr('data-old-class', $(_icon).attr('class'));
                            $(_icon).attr('class', '');
                            $(_icon).addClass(options.spinnerIconClass);
                        }

                        if (options.inputError) {
                            hideErrors(_form);
                        }
                        //before callback
                        options.before(jqXHR, settings);
                    },
                    success: (data, textStatus, jqXHR) => {

                        if (options.inputError && data.status === 'error') {
                            showInputErrors(_form, data.message)
                        }else if(options.toast){
                            $.swToast({
                                icon: data.status,
                                html: parseMessage(data.message),
                                timer:  (data.data && data.data.delay) ? data.data.delay : options.locationDelay
                            }).then(() => {
                                //yönlendirme
                                if (data.location != null) {
                                    window.location = data.location;
                                }
                            });
                        }

                        //success callback
                        options.success(data, _form, jqXHR);
                    },
                    error: (jqXHR, textStatus, errorThrown) => {
                        options.error(jqXHR, _form, errorThrown);
                    },
                    complete: (jqXHR) => {

                        if (options.spinner) {
                            setTimeout(function () {
                                $(_icon).removeClass(options.spinnerIconClass);
                                $(_icon).attr('class', $(_icon).attr('data-old-class'))
                                $(_submitter).prop('disabled', false);
                            }, 1000);
                        }
                        //complate callback
                        options.complete(jqXHR, _form);
                    }
                };

                let AJAX_OPTIONS = $.extend(AJAX_DEFAULT, options.ajax)

                $.ajax(AJAX_OPTIONS);

                return false;
            });
        };


        $.ajaxGet = function (options) {

            let defaults = {
                selector: '.ajax-get',
                removeElement: false,
                confirm: false,
                confirmTitle: 'UYARI!',
                confirmText: 'Devam etmek istiyor musunuz?',
                confirmIcon: 'question',
                locationDelay: 3000,
                before: (jqXHR, el) => {
                },
                success: (data, el, jqXHR) => {
                },
                error: (jqXHR, el, errorThrown) => {
                },
                complete: (jqXHR, el) => {
                },
                ajax:{
                }
            };

            options = $.extend(defaults, options);

            $('body').on('click', options.selector, function () {

                let _this = $(this);
                let _href = $(this).attr("href");

                let _confirm = _this.attr('data-confirm') ?? options.confirm;
                _confirm = _confirm !== false && _confirm !== 'false';
                let _confirmTitle = _this.attr('data-confirm-title') ?? options.confirmTitle;
                let _confirmText = _this.attr('data-confirm-text') ?? options.confirmText;
                let _confirmIcon = _this.attr('data-confirm-icon') ?? options.confirmIcon;

                let AJAX_DEFAULT = {
                    type: 'GET',
                    url: _href,
                    cache: false,
                    timeout: 120000,
                    beforeSend: function (jqXHR){
                        options.before(jqXHR, _this);
                    },
                    success: function (data, textStatus, jqXHR){

                        // toast göster
                        $.swToast({
                            icon: data.status,
                            html: parseMessage(data.message),
                            timer:  (data.data && data.data.delay) ? data.data.delay : options.locationDelay
                        }).then(() => {
                            //yönlendirme
                            if (data.location != null) {
                                window.location = data.location;
                            }
                        });

                        if (removeElement && data.status === 'success') {
                            // silinen element
                            removeElement(_this);
                        }

                        options.success(data, _this, jqXHR);
                    },
                    error: function (jqXHR, textStatus, errorThrown){
                        options.error(jqXHR, _this, errorThrown);
                    },
                    complete: function (jqXHR, textStatus){
                        options.complete(jqXHR, _this);
                    }
                };

                let AJAX_OPTIONS = $.extend(AJAX_DEFAULT, options.ajax)

                if (_confirm) {
                    $.swConfirm({
                        title: _confirmTitle,
                        text: _confirmText,
                        icon: _confirmIcon,
                    }).then((result) => {
                        if(result.isConfirmed){
                            $.ajax(AJAX_OPTIONS)
                        }
                    });
                }else{
                    $.ajax(AJAX_OPTIONS)
                }
                return false;
            });
        };


        /**
         * Silinen elementi domdan kaldırır veya değiştirir
         * data-removable = [bool][id][DataTableRow]
         * data-changeable = [bool]
         * @param el
         */
        function removeElement(el) {
            let removable = $(el).data('removable');
            //remove item
            if (typeof removable !== "undefined") {
                let selectorType = removable.substr(0, 1);

                if (selectorType === '#') {
                    $(removable).remove();
                } else if (removable === 'datatable') {
                    let table = $(el).closest('table').DataTable();
                    table.row($(el).closest('tr')).remove().draw();
                } else {
                    $(el).closest(removable).remove();
                }
            }
        }

        // json mesajları text için biçimlendirir
        function parseMessage(message) {
            let result = '<ul>';
            if ($.isPlainObject(message)) {
                $.each(message, function (i, item) {
                    result += `<li>${item}</li>`;
                });
            } else {
                result += `<li>${message}</li>`;
            }
            return result + '</ul>';
        }


        //hata mesajları dizi ise input altına değilse toast ile ekrana basılır
        function showInputErrors(form, messages) {

            if ($.isPlainObject(messages)) {

                $.each(messages, function (i, item) {

                    let element = form.find('[name=' + i.replace(/([\[\]])/g, "\\$1") + ']');

                    if(element.length) {
                        element.addClass('is-invalid').after(`<div class="invalid-feedback">${item}</div>`);
                    }else{
                        $.swToast({icon: "error", html: parseMessage(item)});
                    }
                });

                return;
            }

            $.swToast({icon: "error", html: parseMessage(messages)});
        }

        //hataları gizleme
        function hideErrors(form) {
            form.find('.is-invalid').removeClass('is-invalid');
            form.find('.invalid-feedback').remove();
        }
    }
)(jQuery);
