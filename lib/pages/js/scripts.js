// ----------------------------------------------------------------------------
// 【Table Of Content】
//
// Form
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Form
//    jquery-validation
// ----------------------------------------------------------------------------
// --------------------------------------
// jquery-validation
// --------------------------------------
$(function(){

  let valid_group_rules = get_valid_group_rules();
  // Setting Validation

  $('#area_form').validate({
    groups: get_validate_params_groups(valid_group_rules),
    errorPlacement: function($error, $element){


      if($element.attr('data-valid-group-item')){

        $element.closest('[data-valid-group]').after($error);
      }else{

        $element.after($error);
      }
    },
    success: function(error, element) {
      $(error).remove();
    },
    onfocusout: function(element) {
      this.element(element);
    }
  });


  // Add Validation rule
  // Email
  $('#your_email').rules('add', {
    required: true,
    email: true
  });

  // Email double check
  $('#your_mail_confirm').rules('add', {
    required: true,
    email: true,
    equalTo: '#your_mail'
  });

  // Add Validation group rule
  add_rule_to_valid_groups(valid_group_rules);


});
