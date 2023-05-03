(function ($) {

    $.fn.finiteStateMachine = function (options) {
        let settings = $.extend({
            stateSelector: '.tab-page',
            initialSelector: '.page-initial',
            finalSelector: '.page-final',
            before: null,
            after: null
        }, options);

        let $page = this;
        let $states = $page.find(settings.stateSelector);
        let $next_button = $(settings.nextSelector);
        let $prev_button = $(settings.prevSelector);

        let stateData = $states.map(function () {
            return $(this).hide().data('state');
        }).get();

        let stateStack = [];

        let $curr_state = $page.find(settings.initialSelector);
        $curr_state.show();
        $prev_button.hide();

        $next_button.click(function () {
            if (settings.before)
                settings.before();

            stateStack.push($curr_state);
            $prev_button.show();

            let next_state = window[$curr_state.data('evaluator')]();
            $curr_state.hide(0, function () {
                $curr_state = $page.getState(next_state);

                if (settings.after)
                    settings.after();

                $curr_state.show();

                if ($(settings.finalSelector).is($curr_state))
                    $next_button.hide();

            });
        });

        $prev_button.click(function () {
            if (settings.before)
                settings.before();

            $next_button.show();

            var $next_state = stateStack.pop();
            $curr_state.hide(0, function () {
                $curr_state = $next_state

                if (settings.after)
                    settings.after();

                $curr_state.show();

                if ($(settings.initialSelector).is($curr_state))
                    $prev_button.hide();
            });
        });
        $page.addClass('fsmachined');
    };

    $.fn.getState = function (index) {
        return this.find('.tab-page[data-state="' + index + '"]');
    }

    $.fn.getCurrentState = function () {
        return this.find('.tab-page:visible');
    }

}(jQuery));

