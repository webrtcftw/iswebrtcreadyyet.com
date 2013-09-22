(function() {
  var animationTime = 500;

  $.getJSON('http://static.iswebrtcreadyyet.com/feedback-data.json', function(data) {
    var getMetricValue = function($el) {
      var browser = $el.attr('data-browser');
      var metricName = $el.attr('data-metric');
      var unit = $el.attr('data-metric-unit');
      var animate = !$el.attr('data-no-animate')

      var datapoint = data[browser][metricName];

      var metric = {
        value: null,
        animate: animate,
        percentage: false
      }

      //Shortcut overall/browser count
      if (metricName === 'count') metric.value = datapoint
      if (unit === 'count') metric.value = datapoint.count;

      if (unit === 'percentage') {
        metric.percentage = true;
        metric.value = datapoint.percentage
      }

      if (unit === 'percentage-inverted') {
        metric.percentage = true;
        metric.value = 100 - datapoint.percentage;
      }

      return metric
    }

    var runAnimation = function() {
      $('.rating').each(function() {
        var $el = $(this);
        var metric = getMetricValue($el)
        var current = 0;

        if (!metric.animate) {
          if (metric.percentage) {
            $el.text(metric.value+'%');
          } else {
            $el.text(metric.value);
          }
          return;
        }

        var interval = setInterval(function() {
          current += 1;
          if (metric.percentage) {
            $el.text(current+'%');
          } else {
            $el.text(current);
          }

          if (current >= metric.value) clearInterval(interval);
        }, metric.value/animationTime)
      });

      $('.bar-chart').each(function() {
        var $el = $(this);
        var metric = getMetricValue($el);
        var $bar = $el.find('.bar-chart-bar');

        if (metric.animate) {
          $bar.animate({
            width: metric.value+'%'
          }, animationTime);
        } else {
          $bar.css({ width: metric.value+'%' });
        }
      });
    }

    window.scrollCheck = function() {
      var feedbackTop = $('#feedback')[0].offsetTop;
      var pageTop = window.pageYOffset;
      var pageHeight = $(window).innerHeight();
      if (pageTop + pageHeight/2 > feedbackTop) {
        $(document).off('scroll', scrollCheck)
        runAnimation()
      }
    };
    $(document).on('scroll', scrollCheck);
    scrollCheck()
  })
})()
