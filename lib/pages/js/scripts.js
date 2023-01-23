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

  let valid_group_rules = get_valid_group_rules(),
      $area_form = $('#area_form');

  $area_form.validate({
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

  $area_form.trigger('after.validate_setting');

  $area_form.on('after.validate_setting', function(){
    // Add Validation group rule
    add_rule_to_valid_groups(valid_group_rules);
  });
});
