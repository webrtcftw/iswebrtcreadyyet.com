(function() {
  var animationTime = 500;


  $.getJSON('/feedback-data.json', function(data) {

    $('.rating').each(function() {
      var $el = $(this);
      var browser = $el.attr('data-browser');
      var metric = $el.attr('data-metric');
      var unit = $el.attr('data-metric-unit');
      
      var score = Math.floor(parseFloat(data[browser][metric][unit]));
      var current = 0;
      
      var interval = setInterval(function() {
        current += 1;
        $el.text(current+'%');
        if (current >= score) clearInterval(interval);
      }, score/animationTime)
    });

    $('.report-card-browser').each(function() {
      var $browser = $(this);
      var browser = $(this).attr('data-browser');
      
      $browser.find('.bar-chart').each(function() {
        var metricName = $(this).attr('data-metric');
        var metric = data[browser][metricName];
        var unit = $(this).attr('data-metric-unit');

        if ( unit === 'percentage' ) {
          $(this).find('.bar-chart-bar').animate({
            width: metric.percentage
          }, animationTime);
        }

        if ( unit === 'percentage-inverted') {
          var percentage = parseFloat(metric.percentage);
          var inverted = 100 - percentage;
          $(this).find('.bar-chart-bar').animate({
            width: inverted+'%'
          }, animationTime);
        }
      });
    });
  })
})()
