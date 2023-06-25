$(function() {

    const triggerRoute = "/4ktransReserve",
        stage = "/prod";
    
    const apiUrl = `https://4jtzwjgt99.execute-api.eu-central-1.amazonaws.com${stage}${triggerRoute}`;
    

    if($('#first_passenger').length){
        var first_passenger_empty_html=$('#first_passenger').html();
    }

    $('.cvu-select > select').each(function(){
        $(this).formSelect();
    });


    $(document).on('click', 'form.cvu-form #cart_send', function (e) {
        e.preventDefault();
        var formEl = $(this).closest('form.cvu-form');        
        var error = checkData(formEl);
        if (!error) {
            let form = new FormData(
                document.getElementById("cart_form")
            );
            
            const data = JSON.stringify(Object.fromEntries(form.entries()));

            var button_el=formEl.find('.cvu-form_send');
            var button_memory=button_el.html();
            formEl.find('.cvu-form_send').html('<div class="lds-ellipsis"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>');
            const initDetails = {
                method: 'PUT',
                body: data,
                mode: "cors"
            }

            let response = fetch(apiUrl, initDetails);
            response.then(respData =>{
                setTimeout(function () {
                    formEl.html(
                        '<div class="cvu_feed">'+
                        "Надіслано" +
                        '</div>'
                    );
                    $('html,body').animate({scrollTop: $('div[id=book_form_cont]').offset().top-45}, 500);
                }, 2000);
            }).catch(err=>{
                console.log(`sending error\n ${err}`)
            });
            
        } else {
            show_error(formEl);
        }
    });

    // -------------------------------------------------------------------------

    if($('input[name=ttn]').length){
        $('input[name=ttn]').mask('00 0000 0000 0000');
    }

    $(document).on('click', 'form.cvu-form #crm_search_go', function (e) {
        $('form.cvu-form#crm_form').submit();
    });

    $(document).on('submit', 'form.cvu-form#crm_form', function (e) {
        var form = $(this).closest('form.cvu-form');
        var error = checkData(form);
        if(error){
            return false;
        }
    });

    // -------------------------------------------------------------------------

});
$(function() {

    // -------------------------------------------------------------------------

    if( $('.pswp').length && $('.photoswipe').length ){
        var $pswp = $('.pswp')[0];
        var image = [];
        var items = [];
        $('amp-img.photoswipe_zoom').each( function() {
            var attr = $(this).attr('itemprop');
            var $href   = $(this).attr('src'),
                $size   = $(this).data('size').split('x'),
                $width  = $size[0],
                $height = $size[1];
            var item = {
                src : $href,
                w   : $width,
                h   : $height
            }
            if($(this).next('figcaption').length) {
                item.title = $(this).next('figcaption').html();
            }
            items.push(item);
        });
        $.each(items, function(index, value) {
            image[index]     = new Image();
            image[index].src = value['src'];
        });
        $(document).on('click','amp-img.photoswipe_zoom',function(){
            event.preventDefault();
            var $index = $('amp-img.photoswipe_zoom').index($(this));
            var options = {
                index: $index,
                bgOpacity: 0.7,
                showHideOpacity: true
            }
            var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
            lightBox.init();
        });
    }

    // -------------------------------------------------------------------------

});
$(function() {

    $('.collapsible').each(function(){
        $(this).collapsible({
            accordion: false
        });
    });

});
$(function() {

    if($('textarea[name=question]').length){
        if($('textarea[name=question]').val()){
            $('textarea[name=question]').focus().blur();
        }
    }

    $(document).on('keyup','form.cvu-form .cvu-input input',function(e) {
        e=e||window.event;
        if(e.keyCode===13){
            if($('form.cvu-form .cvu_submit').length){
                $('form.cvu-form .cvu_submit').trigger('click');
            }
        }
    });

    // TODO cleanup
    $(document).on('click', 'form.cvu-form #feedback_send', function (e) {
        e.preventDefault();
        console.log("feedback")
    });


});
