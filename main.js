$(function() {

  var output_selector = "#output";
  var input_selector = "#input";

  var detect_indentation = function(input) {
    var first_index = input.match(/\n+(\s+)/) || [];
    return first_index[1] ? first_index[1].length : null;
  };

  var get_selected_output_indentation = function() {
    return $("#output-indentation").val();
  };

  var get_input = function() {
    return $('#input').val();
  };

  var chomp = function(str) {
    return str.substr(0, str.length - 1);
  };

  var format = function(input, input_indentation, output_indentation) {
      var lines = input.split("\n");
      var output = "";
      lines.forEach(function(line) {
        var outputLine = line;
        var spaces = line.match(/^\s+/);
        if (spaces) {
          var num_indents = Math.ceil(spaces[0].length / input_indentation);
          var replace = Array(num_indents * output_indentation + 1).join(" ");
          outputLine = line.replace(/^\s+/, replace);
        }
        
        output += outputLine + "\n";
      });
      
    return chomp(output); 
  }

  var highlight_on_focus = function() {
    var $this = $(this);
    $this.select();
  };

  var update_input_indentation = function(indentation) {
    var indentation = detect_indentation(get_input());
    $("#detected-indentation").html(indentation);
  }

  var update_output = function(text) {
    $("#output").val(text);
  }

  var update = function() {
    var input = get_input();
    var input_indentation = detect_indentation(input);
    update_input_indentation(input_indentation);

    if (input_indentation) {
      var output_indentation = get_selected_output_indentation();
      var output = format(input, input_indentation, output_indentation);
      update_output(output);  
    }
  }


  $(output_selector).click(highlight_on_focus);
  $(input_selector).bind('input propertychange', update);
  update_input_indentation(detect_indentation(get_input()));
  $("#format").click(update);
});