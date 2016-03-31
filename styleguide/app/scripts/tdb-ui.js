// $(document).ready(function() {
//     $(".sortable-list").sortable({
//         connectWith: ".connectList"
//     }).disableSelection();
// });

$(window).load(function() {
    $('.cards-box').masonry({
        // options
        columnWidth: '.cards-size',
        gutter: 15,
        percentPosition: true
    });
});