/* Numscrubber.js | https://mburakerman.github.io/numscrubberjs/ | @mburakerman | License: MIT */

var Numscrubber = {};

Numscrubber.init = function() {

  var input = document.querySelectorAll('input');
  for (var i = 0; i < input.length; i++) {
    if (input[i].type == "number" && input[i].getAttribute("data-numscrubber") !== null) {
      //设置只读或读写
      input[i].readOnly = false;

      // Hide input spinners in Mozilla
      input[i].setAttribute("style","-moz-appearance: textfield;width:54px;position:absolute;top:20px;left:2px");

      // Create wrapper span
      var span = document.createElement("span");
      document.body.appendChild(span);
      // Don't change the position of inputs in the DOM
      input[i].parentElement.replaceChild(span, input[i]);
      span.style.position = "absolute";
      span.appendChild(input[i]);
      
      // Make span height & width equal to input number
      span.style.width = "60px";
      span.style.height = "60px";
      span.style.left="0px";
      span.style.top="0px";
      // Create input range
      var range = document.createElement("input");
      range.setAttribute("type", "range");
      span.appendChild(range);
      
      // Check if input has disabled attribute
      if (input[i].getAttribute("disabled") == "" || input[i].getAttribute("disabled") == true) {
       range.setAttribute("disabled",true);
      }
      
      // Make range step equal to input number
      range.setAttribute("step", input[i].getAttribute("step"));

      // Make range & input number value, min and max attributes equal
      range.value = input[i].value;
      range.min = input[i].min;
      range.max = input[i].max;

      // Since we can't get element's margin with element.style,
      // we use currentStyle property or getComputedStyle function
      var input_style = input[i].currentStyle || window.getComputedStyle(input[i]);
      
      // Range style
      range.style.position = "absolute";
      range.style.margin = input_style.margin;
      range.style.left = 0;
      range.style.top = "40px";
      range.style.border = "1px solid transparent";
      range.style.opacity = 0;
      range.style.cursor = "e-resize";

      // Make range width & height equal to input number
      range.style.width = "100%";
      range.style.height = "20px";
      
      
      (function(j) {
        range.addEventListener("input", function() {
          input[j].value = this.value;
          // Trigger 'input' event on input number
          var event = new Event('input');
          input[j].dispatchEvent(event);
        });
      })(i);

    }
  }
  
};
