var cvu_Validation = false;

function checkData(form){
    var error_text = [
        {'uk': 'Це поле обов\'язкове',               'ru': 'Это поле обязательное',              'en': 'This field is required'},
        {'uk': 'Введіть коректний номер телефону',   'ru': 'Введите корректный номер телефона',  'en': 'Please enter a valid phone number'},
        {'uk': 'Введіть коректний email',            'ru': 'Введите корректный e-mail',          'en': 'Please enter a valid email'}
    ];
    var bool = false;
    var lang = $('html').attr('lang');
    form.find('input').each(function (){
        if($(this).parent().data('required') && $(this).val() == ''){
            $(this).parent().addClass('cvu-input__invalid');
            $(this).next('span').text(error_text[0][lang]);
            bool = true;
        }else if($(this).parent('.cvu-input').data('required') && $(this).val() != ""){
            if($(this).attr('name').substr(0,5) == "phone" && $(this).val().length < 17){
                $(this).parent().addClass('cvu-input__invalid');
                $(this).next('span').text(error_text[1][lang]);
                bool = true;
            }else if($(this).attr('name').substr(0,5) == "phone" && $(this).val().length >= 17){
                $(this).parent().removeClass('cvu-input__invalid');
                $(this).next('span').text('');
            }
            if($(this).attr('name') == "email"){
                var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                if(!pattern.test($(this).val())){
                    $(this).next('span').text(error_text[2][lang]);
                    $(this).parent().addClass('cvu-input__invalid');
                    bool = true;
                }else{
                    $(this).parent().removeClass('cvu-input__invalid');
                    $(this).next('span').text('');
                }
            }
        }else{
            $(this).parent().removeClass('cvu-input__invalid');
        }
    });
    if(form.find('textarea').parent('.cvu-input').data('required') && form.find('textarea').val() == ''){
        form.find('textarea').parent().addClass('cvu-input__invalid');
        form.find('textarea').next('span').text(error_text[0][lang]);
        bool = true;
    }else{
        form.find('textarea').parent().removeClass('cvu-input__invalid');
        form.find('textarea').next('span').text('');
    }
    return bool;
}

function cvu_ac(o, c){
    o.addClass(c);
}

function cvu_rc(o, c){
    if(o.hasClass(c)) o.removeClass(c);
}

function cvu_Input(o){
    i = o.children('input');
    if($.trim(i.val()) == ""){
        cvu_ac(o, 'cvu-input__empty');
        if(!i.is(":focus")) i.val('');
    }else{
        cvu_ac(o, 'cvu-input__not-empty');
        cvu_rc(o, 'cvu-input__empty');
    }
    if(i.is(":focus")){
        cvu_ac(o, 'cvu-input__focused');
        cvu_rc(o, 'cvu-input__empty');
    }else{
        cvu_rc(o, 'cvu-input__focused');
    }
    if(cvu_Validation){
        var attr = o.attr('cvu-input__required');
        if(typeof attr !== typeof undefined && attr !== false){
            if($.trim(i.val()) == ""){
                cvu_ac(o, 'cvu-input__invalid');
            }else{
                cvu_rc(o, 'cvu-input__invalid');
            }
        }
    }
    var attr = o.attr('cvu-input__phone');
    if(typeof attr !== typeof undefined && attr !== false){
        if($.trim(i.val()) == "" && i.is(":focus")){
            i.val('+');
        }else if($.trim(i.val()) == ""){
            i.val('');
        }
    }
}

function cvu_Textarea(o){
    var t = o.children('textarea');
    if($.trim(t.val()) == ""){
        cvu_ac(o, 'cvu-input__empty');
        if(!t.is(":focus")) t.val('');
    }else{
        cvu_ac(o, 'cvu-input__not-empty');
    }
    if(t.is(":focus")){
        cvu_ac(o, 'cvu-input__focused');
        cvu_rc(o, 'cvu-input__empty');
    }else{
        cvu_rc(o, 'cvu-input__focused');
    }
    if(cvu_Validation){
        var attr = o.attr('cvu-input__required');
        if(typeof attr !== typeof undefined && attr !== false){
            if($.trim(t.val()) == ""){
                cvu_ac(o, 'cvu-input__invalid');
            }else{
                cvu_rc(o, 'cvu-input__invalid');
            }
        }
    }
}
function formVerify(){

    if($('.cvu-form__after-send').length) cvu_Validation = true;

    $('.cvu-input:not(.cvu-input__file)').each(function (){
        cvu_Input($(this));
    });

    $('.cvu-input input').on('focus', function (e){
        $(this).parent().removeClass('cvu-input__invalid');
        $(this).next('span').text('');
        cvu_Validation = false;
        cvu_Input($(this).parent());
    }).on('keyup', function (e){
        cvu_Validation = true;
        cvu_Input($(this).parent());
    }).on('blur', function (e){
        cvu_Validation = true;
        cvu_Input($(this).parent());
    });

    $('.cvu-input textarea').on('focus', function (e){
        $(this).parent().removeClass('cvu-input__invalid');
        $(this).next('span').text('');
        cvu_Validation = false;
        cvu_Textarea($(this).parent());
    }).on('keyup', function (e){
        cvu_Validation = true;
        cvu_Textarea($(this).parent());
    }).on('blur', function (e){
        cvu_Validation = true;
        cvu_Textarea($(this).parent());
    });

}

$(document).ready(function(){

    if($('.cvu-form__after-send').length) cvu_Validation = true;

    $('.cvu-input').each(function (){
        cvu_Input($(this));
    });
    $('.cvu-input input[name!="file"]').on('change', function (e){
        var o=$(this).parent();
        cvu_rc(o, 'cvu-input__invalid');
        cvu_rc(o, 'cvu-input__empty');
        cvu_ac(o, 'cvu-input__not-empty');
        $(this).next('span').text('');
    });

    $('.cvu-input input[name!="file"]').on('focus', function (e){
        $(this).parent().removeClass('cvu-input__invalid');
        $(this).next('span').text('');
        cvu_Validation = false;
        cvu_Input($(this).parent());
    }).on('keyup', function (e){
        cvu_Validation = true;
        cvu_Input($(this).parent());
    }).on('blur', function (e){
        cvu_Validation = true;
        cvu_Input($(this).parent());
    });

    $('.cvu-input textarea').on('focus', function (e){
        $(this).parent().removeClass('cvu-input__invalid');
        $(this).next('span').text('');
        cvu_Validation = false;
        cvu_Textarea($(this).parent());
    }).on('keyup', function (e){
        cvu_Validation = true;
        cvu_Textarea($(this).parent());
    }).on('blur', function (e){
        cvu_Validation = true;
        cvu_Textarea($(this).parent());
    });

    $('input[name=phone]').mask('+099 (009) 009-009-009');

    $('textarea').each(function(){
        autosize($(this));
    }).on('autosize:resized', function(){
    });

});
