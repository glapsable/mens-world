(function(){

    // cache DOM
    const $window = $(window);
    const $document = $(document);

    // bind events
    // $window.on('scroll', minimizeHeader);
    $document.ready(function() {
        formValidation();
    });

    // functions
    function formValidation() {

        var $contactForm = $('.contact-form__form');
        var $inputText = $('input[type=text]');
        var $inputEmail = $('input[type=email]');
        var $inputRadio = $('input[type=radio]');
        var $inputCheckbox = $('input[type=checkbox]');
        var $inputTextarea = $('textarea');
        var $button = $('button[type=submit]');
        var $confirmation = $('.contact-form__confirmation');

        $inputText.on('keyup blur', checkIfEmpty);
        $inputEmail.on('keyup blur', checkIfEmail);
        $inputRadio.on('change', checkIfRadioChecked);
        $inputCheckbox.on('change', checkIfChecked);
        $inputTextarea.on('keyup blur', checkIfEmpty);
        $contactForm.on('click', findBlanks);
        $contactForm.on('submit', sendForm);

        function checkIfEmpty() {
            if($(this).val().trim() == '') {
                $(this).addClass('-error');
                $(this).removeClass('-pass');
                submitCheck();
            } else {
                $(this).removeClass('-error');
                $(this).addClass('-pass');
                submitCheck();
            }
        }
    
        function checkIfEmail() {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
            if($(this).val() == '') {
                $(this).addClass('-error');
                $(this).removeClass('-pass');
                submitCheck();
            } else {
                if(re.test($(this).val())) {
                    $(this).removeClass('-error');
                    $(this).addClass('-pass');
                    submitCheck();
                } else {
                    $(this).addClass('-error');
                    $(this).removeClass('-pass');
                    submitCheck();
                }
            }
        }

        function checkIfRadioChecked() {
            if( $('input[name=plec]:checked').length <= 0){
                $(this).parent().parent().addClass('-error');
                $(this).parent().parent().removeClass('-pass');
            } else {
                $(this).parent().parent().removeClass('-error');
                $(this).parent().parent().addClass('-pass');
            }
        }
    
        function checkIfChecked() {
            if(!$(this).is(':checked')) {
                $(this).parent().parent().addClass('-error');
                $(this).parent().parent().removeClass('-pass');
                submitCheck();
            } else {
                $(this).parent().parent().removeClass('-error');
                $(this).parent().parent().addClass('-pass');
                submitCheck();
            }
        }
    
        function submitCheck() {
            $button.attr('disabled', 'disabled');
            if($('.-error').length) {
                $button.attr('disabled', 'disabled');
            } else {
                $button.removeAttr('disabled');
            }
        }

        function findBlanks() {
            $inputText.trigger('keyup');
            $inputEmail.trigger('keyup');
            $inputRadio.trigger('change');
            $inputCheckbox.trigger('change');
            $inputTextarea.trigger('keyup');
        }

        function sendForm(e) {
            e.preventDefault();
            $confirmation.css({
                'display': 'block'
            });
        }
    }

    function minimizeHeader() {
        const $scroll = $(document).scrollTop();
        if($scroll > 80) {
            $('.main-header').stop().animate({
                paddingTop: '0px',
                paddingBottom: '0px',
                opacity: '.9'
            }, 100);
        } else {
            $('.main-header').stop().animate({
                paddingTop: '20px',
                paddingBottom: '20px',
                opacity: '1'
            }, 100);
        }
    }

})();