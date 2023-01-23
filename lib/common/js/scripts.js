// ----------------------------------------------------------------------------
// 【Table Of Content】
//
// Form
// ----------------------------------------------------------------------------


// ----------------------------------------------------------------------------
// Form
//    Input File
//    Select
//    Address
//    Input Date (flatpickr)
//    Privacy policy
//    jquery-validation
// ----------------------------------------------------------------------------
// --------------------------------------
// Input File
// --------------------------------------
/**
 * Add default text when input file is empty
 */
$(function(){
  $input_file = $('.form_file input[type="file"]');

  if($input_file.length > 0) return;

  let form_file_name_default = '選択されていません';

  $('.form_file .form_file_name').text(form_file_name_default);

  $input_file.on('change', function(){

    let form_file_name = $(this).val()?
      $(this).val() : form_file_name_default;

    $(this).closest('.form_file').find('.form_file_name').text(form_file_name);

  });
});



/**
 * Change text color when input file is empty
 */
$(function(){
  let input = $('.form_wrp .form_file input');
  input.each(function(){
    control_input_txt_color($(this));
  });

  input.on('change', function(){
    control_input_txt_color($(this));
  });
});


/**
 * @param {object} input
 */
function control_input_txt_color(input) {
  if(input.val() == ''){
    input.closest('.form_file').find('.form_file_name').css('color', '#757575');
    return;
  }

  input.closest('.form_file').find('.form_file_name').css('color', '');
}


// --------------------------------------
// Select
// --------------------------------------
/**
 * Change text color when input file is empty
 */
$(function(){
  let select = $('.form_wrp .form_select select');

  control_select_txt_color(select);

  select.on('focus', function(){
    select.css('color', '');
  });

  select.on('blur change', function(){
    control_select_txt_color($(this));
  });
});

/**
 * @param {object} select
 */
function control_select_txt_color(select) {
  if(select.val() == ''){
    select.css('color', '#757575');
    return;
  }

  select.css('color', '');
}



// --------------------------------------
// Address
// --------------------------------------
(function() {
  //該当フォーム
  let hadr = document.querySelector(".h-adr"),
      cancelFlag = true;

  if(hadr === null) return;

  //イベントをキャンセルするリスナ
  let onKeyupCanceller = function(e) {
    if(cancelFlag){
      e.stopImmediatePropagation();
    }
    return false;
  };

  // 郵便番号の入力欄
  let postalcode = hadr.querySelectorAll(".p-postal-code"),
      postalField = postalcode[postalcode.length - 1];

  //通常の挙動をキャンセルできるようにイベントを追加
  postalField.addEventListener("keyup", onKeyupCanceller, false);

  //ボタンクリック時
  let btn = hadr.querySelector(".postal-search");
  btn.addEventListener("click", function(e) {
    //キャンセルを解除
    cancelFlag = false;

    //発火
    let event;
    if (typeof Event === "function") {
        event = new Event("keyup");
    } else {
        event = document.createEvent("Event");
        event.initEvent("keyup", true, true);
    }
    postalField.dispatchEvent(event);

    //キャンセルを戻す
    cancelFlag = true;
  });
})();


// --------------------------------------
// Input Date (flatpickr)
// --------------------------------------
// $('.form_calendar').flatpickr({
//   dateFormat: 'Y/m/d',
//   'locale': 'ja'
// });




// --------------------------------------
// Privacy policy
// --------------------------------------
$('#privacy_checkbox').on('change', function(){
  if($(this).prop('checked')){
    $('#form_submit').attr('disabled', false)
    return;
  }

  $('#form_submit').attr('disabled', true)
  return;
});


// --------------------------------------
// jquery-validation
// --------------------------------------
/**
 * @return {object} rules valid group rules
 *   ex) ['required_all', 'required_tel', 'required_checkbox']
 */
function get_valid_group_rules(){

  let rules = [];

  $('[data-valid-group]').each(function(){

    let group = $(this).data('valid-group');
    if(rules.indexOf(group) < 0) rules.push(group);
  });

  return rules;
}

/**
 * @param {object} rules valid group rules
 * ex : ['required_all', 'required_tel', 'required_checkbox']
 * @return {object} groups valid groups
 * ex :
 *    {
 *      required_1 : 'family_name1 given_name1',
 *      required_2 : 'family_name2 given_name2',
 *      required_tel : 'tel1 tel2 tel3'
 *    }
 */
function get_validate_params_groups(rules){

  let = groups = {};

  $.each(rules, function(rule_index, rule){

    $('[data-valid-group="' + rule + '"]').each(function(group_index){

      groups[rule + '_' + group_index] = get_valid_group_names($(this));
    });
  });

  return groups;
}


/**
 * @param {object} $group jQuery object
 * @return {string} names
 * ex : 'family_name1 given_name1'
 */
function get_valid_group_names($group){

  let names = '';

  $group.find('[data-valid-group-item]').each(function(index){

    if(index > 0) names += ' ';
    names += $(this).attr('name');
  });

  return names;
}


/**
 * @param {object} rules valid group rules
 * ex : ['required_all', 'required_tel', 'required_checkbox']
 */
function add_rule_to_valid_groups(rules){

  $.each(rules, function(rule_index, rule){

    $('[data-valid-group="' + rule + '"]').each(function(){

      add_rule_to_valid_group[rule].bind(this)();
    });
  });
}


let add_rule_to_valid_group = {
  // all required
  'required_all' : function(){

    let $items = $(this).find('[data-valid-group-item]');

    $items.each(function(){

      $(this).rules('add', {
        require_from_group : [$items.length, '[data-valid-group-item]'],
        messages :{
          require_from_group : 'このフィールドは必須です。'
        }
      });
    });
  },
  'required_all_tel' : function(){

    let $items = $(this).find('[data-valid-group-item]');

    $items.each(function(){
      $(this).rules('add', {
        number : true,
        require_from_group : [$items.length, '[data-valid-group-item]'],
        messages :{
          number : '電話番号を入力してください。',
          require_from_group : 'このフィールドは必須です。'
        }
      });
    });
  },
  'required_checkbox' : function(){


  }
};


// Add Validation rule
let add_rule_to_valid_item = [
  function(){

    $input = $('#area_form input[type="email"]');
    if($input.length === 0) return;

    $input.rules('add', {
      email: true,
      messages :{
        email : 'メールアドレスを入力してください。'
      }
    });
  },
  function(){

    $input = $('#area_form input[data-double-check-for]');
    if($input.length === 0) return;

    $input.each(function(){

      $(this).rules('add', {
        equalTo: $(this).data('double-check-for'),
        messages :{
          equalTo : '同じメールアドレスを入力してください。'
        }
      });
    });
  },
  function(){

    $input = $('#area_form input[type="tel"]');
    if($input.length === 0) return;

    $input.each(function(){

      $(this).rules('add', {
        number: true,
        messages :{
          number : '電話番号を入力してください。'
        }
      });
    });
  }
];

$('#area_form').on('after.validate_setting', function(){

  for(let i = 0; i < add_rule_to_valid_item.length; i++){
    add_rule_to_valid_item[i].bind()();
  }
})
