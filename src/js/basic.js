function showInQueue(selector, offset, delay, time) {
    $(selector).each(function (index) {
        $(this).delay(offset + index * delay).queue(function (next) {
            setTimeout(function (elem) {
                elem.css("pointer-events", "all")
            }, 250, $(this))

            next()
        }).animate({
            opacity: 1
        }, {
            duration: time,
        })
    })
}


$(document).ready(function () {
    $(".name, .menu").fadeIn(1500, function () {
        showInQueue(".animated", 0, 1500, 1500)
    })

    $("button#projects").click(function () {
        $(".projects").toggle(1000)
    })

    $("button#contacts").click(function () {
        $(".contacts").toggle(1000)
    })
})
