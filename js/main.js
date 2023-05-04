(function ($) {

    $.fn.finiteStateMachine = function (options) {
        let settings = $.extend({
            stateSelector: '.tab-page',
            initialSelector: '.page-initial',
            saveSelector : '.page-save',
            finalSelector: '.page-final',
        }, options);

        let $page = this;
        let $states = $page.find(settings.stateSelector);
        let $next_button = $(settings.nextSelector);
        let $prev_button = $(settings.prevSelector);
        let $save_button = $('.save-btn');
        let $final_button = $('.final-btn');

        let stateData = $states.map(function () {
            return $(this).hide().data('state');
        }).get();

        let stateStack = [];

        let $curr_state = $page.find(settings.initialSelector);
        $curr_state.show();
        $prev_button.hide();

        $next_button.click(function () {
            stateStack.push($curr_state);
            $prev_button.show();

            let next_state = window[$curr_state.data('evaluator')]();
            $curr_state.hide(0, function () {
                $curr_state = $page.getState(next_state);
                $curr_state.show();

                if ($(settings.saveSelector).is($curr_state))
                    $next_button.hide(),
                    $prev_button.hide(),
                    $save_button.show();
            });
        });

        $prev_button.click(function () {
            $next_button.show();

            let $next_state = stateStack.pop();
            $curr_state.hide(0, function () {
                $curr_state = $next_state
                $curr_state.show();

                if ($(settings.initialSelector).is($curr_state))
                    $prev_button.hide();
            });
        });

        $save_button.click(function () {
            stateStack.push($curr_state);
            $save_button.hide();

            let next_state = window[$curr_state.data('evaluator')]();
            $curr_state.hide(0, function () {
                $curr_state = $page.getState(next_state);
                $curr_state.show();
                $final_button.show();
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

