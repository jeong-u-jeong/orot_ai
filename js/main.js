(function ($) {

    $.fn.finiteStateMachine = function (options) {
        let settings = $.extend({
            stateSelector: '.tab-page',
            initialSelector: '.page-initial',
            page2Selector: '.page2',
            saveSelector : '.page-save',
            finalSelector: '.page-final',
        }, options);

        let $page = this;
        let $states = $page.find(settings.stateSelector);
        let $prev_button = $(settings.prevSelector);
        let page1check = $('.page1check');
        let page2check = $('.page2check');
        let page3_1check = $('.page3-1check');
        let page3_2check = $('.page3-2check');
        let page4check = $('.page4check');
        let unsuccess1 = $('.unsuccess1');
        let unsuccess2 = $('.unsuccess2');


        let stateData = $states.map(function () {
            return $(this).hide().data('state');
        }).get();

        let stateStack = [];

        let $curr_state = $page.find(settings.initialSelector);
        $curr_state.show();
        $prev_button.hide();


        page1check.click(function () {
            let termschk = $('#termschk');

            if (termschk.prop('checked') == true) {
                stateStack.push($curr_state);
                $prev_button.show();
                unsuccess1.hide();

                let next_state = window[$curr_state.data('evaluator')]();
                $curr_state.hide(0, function () {
                    $curr_state = $page.getState(next_state);
                    $curr_state.show();   
                });
            } else {
                unsuccess1.fadeIn(300);
                unsuccess1.delay(1400).fadeOut(300);
            }
        });


        page2check.click(function () {
            let name = $('#name');
            let birthDay = $('#birthDay');
            let pregnancy01 = $('#pregnancy01');
            let pregnancy02 = $('#pregnancy02');

            if (name.val() !== "") {
                if (birthDay.val() !== "") {
                    if(pregnancy01.prop('checked') || pregnancy02.prop('checked') == true){

                        stateStack.push($curr_state);
                        unsuccess2.hide();

                        let next_state = window[$curr_state.data('evaluator')]();
                        $curr_state.hide(0, function () {
                            $curr_state = $page.getState(next_state);
                            $curr_state.show();   
                        });
                    } else {
                        unsuccess2.fadeIn(300);
                        unsuccess2.delay(1400).fadeOut(300);
                    }
                } else {
                    unsuccess2.fadeIn(300);
                    unsuccess2.delay(1400).fadeOut(300);
                }

            } else {
                unsuccess2.fadeIn(300);
                unsuccess2.delay(1400).fadeOut(300);
            }
        });

        page3_1check.click(function () {
            let gestational = $('#gestational');
            let cancer01 = $('#cancer01');
            let cancer02 = $('#cancer02');
            let inoculation01 = $('#inoculation01');
            let inoculation02 = $('#inoculation02');

            if(gestational.val() !=="none"){
                if(cancer01.prop('checked') || cancer02.prop('checked') == true){
                    if(inoculation01.prop('checked') || inoculation02.prop('checked') == true){
                        
                        stateStack.push($curr_state);
                        unsuccess2.hide();

                        let next_state = window[$curr_state.data('evaluator')]();
                        $curr_state.hide(0, function () {
                            $curr_state = $page.getState(next_state);
                            $curr_state.show();   
        
                            if ($(settings.saveSelector).is($curr_state))
                                $prev_button.hide();
                        });
                    } else {
                        unsuccess2.fadeIn(300);
                        unsuccess2.delay(1400).fadeOut(300);
                    }
                } else {
                    unsuccess2.fadeIn(300);
                    unsuccess2.delay(1400).fadeOut(300);
                }

            } else {
                unsuccess2.fadeIn(300);
                unsuccess2.delay(1400).fadeOut(300);
            }
        });

        page3_2check.click(function () {
            let menarche01 = $('#menarche01');
            let menarche02 = $('#menarche02');

            if (menarche01.prop('checked') ||  menarche02.prop('checked') == true) {
                stateStack.push($curr_state);

                let next_state = window[$curr_state.data('evaluator')]();
                $curr_state.hide(0, function () {
                    $curr_state = $page.getState(next_state);
                    $curr_state.show();   
                    unsuccess2.hide();

                    if ($(settings.saveSelector).is($curr_state))
                        $prev_button.hide();
                });
            } else {
                unsuccess2.fadeIn(300);
                unsuccess2.delay(1400).fadeOut(300);
            }
        });
    

        page4check.click(function () {
            let itch01 = $('#itch01');
            let itch02 = $('#itch02');

            if (itch01.prop('checked') || itch02.prop('checked') == true) {

                stateStack.push($curr_state);
                unsuccess2.hide();

                let next_state = window[$curr_state.data('evaluator')]();
                $curr_state.hide(0, function () {
                    $curr_state = $page.getState(next_state);
                    $curr_state.show();   
                });
            } else {
                unsuccess2.fadeIn(300);
                unsuccess2.delay(1400).fadeOut(300);
            }
        });

        
        $prev_button.click(function () {

            let $next_state = stateStack.pop();
            $curr_state.hide(0, function () {
                $curr_state = $next_state;
                $curr_state.show();
            
                if ($(settings.initialSelector).is($curr_state))
                $prev_button.hide();
            });

        });


        $page.addClass('fsmachined');


        $('#pregnancy-lab01').click(function () {
            $('#page3-1').show()
            $('#page3-2').hide()
        });
        $('#pregnancy-lab02').click(function () {
            $('#page3-1').hide()
            $('#page3-2').show()
        });

        
    };

    $.fn.getState = function (index) {
        return this.find('.tab-page[data-state="' + index + '"]');
    }

    $.fn.getCurrentState = function () {
        return this.find('.tab-page:visible');
    }



}(jQuery));


