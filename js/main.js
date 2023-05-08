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
        let $next_button = $(settings.nextSelector);
        let $prev_button = $(settings.prevSelector);
        let $save_button = $('.save-btn');
        let $final_button = $('.final-btn');
        let page1check = $('.page1check');
        let page2check = $('.page2check');
        let page3_1check = $('.page3-1check');
        let page3_2check = $('.page3-2check');
        let page4check = $('.page4check');


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

                let next_state = window[$curr_state.data('evaluator')]();
                $curr_state.hide(0, function () {
                    $curr_state = $page.getState(next_state);
                    $curr_state.show();   
                });
            }
        });

        page2check.click(function () {
            let name = $('#name');
            let birthDay = $('#birthDay');
            let hospital = $('#hospital');
            let pregnancy01 = $('#pregnancy01');
            let pregnancy02 = $('#pregnancy02');

            if (name.val() !== "") {
                if (birthDay.val() !== "") {
                    if (hospital.val() !=="none") {
                        if(pregnancy01.prop('checked') || pregnancy02.prop('checked') == true){

                            stateStack.push($curr_state);

                            let next_state = window[$curr_state.data('evaluator')]();
                            $curr_state.hide(0, function () {
                                $curr_state = $page.getState(next_state);
                                $curr_state.show();   
                            });
                        }
                    }
                }

            }
        });

        page3_1check.click(function () {
            let gestational = $('#gestational');
            let lastperiod = $('#lastperiod');
            let duedate = $('#duedate');
            let sex01 = $('#sex01');
            let sex02 = $('#sex02');
            let cancer01 = $('#cancer01');
            let cancer02 = $('#cancer02');
            let inoculation01 = $('#inoculation01');
            let inoculation02 = $('#inoculation02');

            if(gestational.val() !=="none"){
                if(lastperiod.val() !== ""){
                    if(duedate.val() !== ""){
                        if (sex01.prop('checked') || sex02.prop('checked') == true) {
                            if(cancer01.prop('checked') || cancer02.prop('checked') == true){
                                if(inoculation01.prop('checked') || inoculation02.prop('checked') == true){
                                    
                                    stateStack.push($curr_state);
            
                                    let next_state = window[$curr_state.data('evaluator')]();
                                    $curr_state.hide(0, function () {
                                        $curr_state = $page.getState(next_state);
                                        $curr_state.show();   
                    
                                        if ($(settings.saveSelector).is($curr_state))
                                            $prev_button.hide();
                                    });
                                }
                            }
                        }
                    }
                }
            }
        });

        page3_2check.click(function () {
            let menarche01 = $('#menarche01');
            let menarche02 = $('#menarche02');
            let cycle = $('#cycle');
            let monthlyperiod01 = $('#monthlyperiod01');
            let monthlyperiod02 = $('#monthlyperiod02');

            if (menarche01.prop('checked') ||  menarche02.prop('checked') == true) {
                if(cycle.val() !=="none"){
                    if(monthlyperiod01.prop('checked') || monthlyperiod02.prop('checked') == true){
                        stateStack.push($curr_state);

                        let next_state = window[$curr_state.data('evaluator')]();
                        $curr_state.hide(0, function () {
                            $curr_state = $page.getState(next_state);
                            $curr_state.show();   

                            if ($(settings.saveSelector).is($curr_state))
                                $prev_button.hide();
                        });
                    }
                }
            }
        });
    

        page4check.click(function () {
            let itch01 = $('#itch01');
            let itch02 = $('#itch02');

            if (itch01.prop('checked') || itch02.prop('checked') == true) {

                stateStack.push($curr_state);

                let next_state = window[$curr_state.data('evaluator')]();
                $curr_state.hide(0, function () {
                    $curr_state = $page.getState(next_state);
                    $curr_state.show();   
                });
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

