/* eslint-env browser */

(function($, Quill) {
  $(document).ready(function() {
    var quillOptions = {
      modules: {
        formula: true,
        toolbar: [["bold", "italic", "underline", "formula"]]
      },
      placeholder:
        "Skriv text här eller tryck CTRL+E eller på formel-knappen för att skriva en formel..",
      theme: "snow"
    };

    var options = {};

    $("input[type='checkbox'].option").each(function() {
      var $option = $(this);
      var name = $option.attr("data-name");
      var isOptionEnabled =
        window.location.href.indexOf("&" + name + "=true") !== -1;

      if (isOptionEnabled) {
        $option.prop("checked", true);
        options[name] = JSON.parse($option.attr("data-value"));
      }

      $option.change(function(event) {
        var url = window.location.href;
        var checked = event.target.checked;

        if (url.indexOf("?") === -1) {
          url += "?";
        }

        url = url.replace("&" + name + "=" + !checked, "");
        url += "&" + name + "=" + checked;

        window.location.href = url;
      });
    });

    var enableMathQuillFormulaAuthoring = window.mathquill4quill();
    var quill = new Quill("#editor", quillOptions);
    enableMathQuillFormulaAuthoring(quill, options);
  });
})(window.jQuery, window.Quill);
