$(function() {

    $('body').removeClass('loading');

    /* ---------------------------------------------------------------------- */

    scroll_to_sid = function(sid) {
        if(sid.length>3){
            var oper=sid.substring(0,2);
            if(oper=='s2'){
                var target_id=sid.substring(2);
                if(target_id.length>0){
                    var target=$('#'+target_id);
                    if( target.length ){
                        setTimeout(function(){
                            $('html,body').animate({scrollTop: target.offset().top}, 300);
                            var focus_input=target.find('input[name=name]');
                            if(!focus_input.length) var focus_input=target.next().find('input[name=name]');
                            if(focus_input.length){
                                setTimeout(function(){
if(target_id!='cid48')
                                    focus_input.focus();
                                }, 600);
                            }
                        }, 300);
                        window.location.href.split('#')[0];
                        history.replaceState(null, null, ' ');
                        return false;
                    }
                }
            }
        }
        return true;
    }

    if(window.location.hash){
        var sid=window.location.hash.substring(1);
        scroll_to_sid(sid);
    }

    $(document).on('click','a',function(e) {
        if($(this).attr('href')!=undefined){
            var i=$(this).attr('href').indexOf("#");
            if(i>=0){
                if($('.sidenav').length){
                    var instance = M.Sidenav.getInstance($(".sidenav"));
                    if (instance.isOpen){
                        $('.sidenav').sidenav('close');
                    }
                }
                var sid=$(this).attr('href').substring(i+1);
                return scroll_to_sid(sid);
            }
        }
    });

    /* ---------------------------------------------------------------------- */

    lc = function(s) {
        var l=$('html').attr('lang');
        if(s[l]!==undefined){
            return s[l];
        }else if(s['uk']!==undefined){
            return s['uk'];
        }else{
            return '';
        }
    }

    /* ---------------------------------------------------------------------- */

    show_error = function(form=false) {
        if(form.length){
            var scroll_found=false;
            form.find('.cvu-input__invalid').each(function(){
                if(!scroll_found){
                    $('html,body').animate({scrollTop: $(this).offset().top-72}, 500);
                    scroll_found=true;
                }
            });
            form.find('.cvu-select__invalid').each(function(){
                if(!scroll_found){
                    $('html,body').animate({scrollTop: $(this).offset().top-72}, 500);
                    scroll_found=true;
                }
            });
        }
    }

    /* ---------------------------------------------------------------------- */

});
$(function() {

    // -------------------------------------------------------------------------


    // -------------------------------------------------------------------------

});
$(function() {

    // -------------------------------------------------------------------------


    // -------------------------------------------------------------------------

});
$(function() {

    // -------------------------------------------------------------------------

    $('.sidenav').sidenav({
        inDuration: 250,
        onCloseStart: function() {
            $('.sidenav-trigger').removeClass('active');
        }
    });

    $(document).on('click','.sidenav .dropdown-trigger',function(e) {
        if($(this).hasClass('expanded')){
            $(this).removeClass('expanded');
            $(this).parent('li').next('ul').hide(100);
        }else{
            $(this).addClass('expanded');
            $(this).parent('li').next('ul').show(200);
        }
        return false;
    });

    // $('.sidenav').sidenav('open');

    // -------------------------------------------------------------------------

    olymp_up = function() {
        var scroll_offset=$(window).scrollTop();
        if(scroll_offset>500){
            $('#olymp-up').addClass('show');
        }else if($('#olymp-up').hasClass('show')){
            $('#olymp-up').removeClass('show');
        }
    }

    olymp_up();
    $(window).scroll(function () {
        olymp_up();
    });

    $(document).on('click','#olymp-up.show',function(e) {
        $('html,body').animate({scrollTop: 0}, 300);
    });

    // -------------------------------------------------------------------------

});
