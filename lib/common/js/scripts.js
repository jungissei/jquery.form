// ----------------------------------------------------------------------------
// 【Table Of Content】
//
// Form
// ----------------------------------------------------------------------------


// ----------------------------------------------------------------------------
// Form
//    Input File
//    Select
//    Address (yubinbango)
//    Input Date (flatpickr)
//    Privacy policy
//    jquery-validation
// ----------------------------------------------------------------------------
// --------------------------------------
// Input File
// --------------------------------------
$(function () {
  let $input = $('.form_file input[type="file"]');

  if ($input.length > 0) {

    add_default_text_to_input_file($input);
    change_text_input_file_text_color($input);
  }
});

/**
 * Add default text when input file is empty
 */
function add_default_text_to_input_file($input) {
  let form_file_name_default = '選択されていません';

  $('.form_file .form_file_name').text(form_file_name_default);

  $input.on('change', function () {

    let form_file_name = $(this).val() ?
      $(this).val() : form_file_name_default;

    $(this).closest('.form_file').find('.form_file_name').text(form_file_name);
  });
}


/**
 * Change text color when input file is empty
 */
function change_text_input_file_text_color($input) {

  $input.each(function () {
    control_input_txt_color($(this));
  });

  $input.on('change', function () {
    control_input_txt_color($(this));
  });
}


/**
 * @param {object} $input
 */
function control_input_txt_color($input) {
  if ($input.val() == '') {
    $input.closest('.form_file').find('.form_file_name').css('color', '#757575');
    return;
  }

  $input.closest('.form_file').find('.form_file_name').css('color', '');
}


// --------------------------------------
// Select
// --------------------------------------
/**
 * Change text color when input file is empty
 */
$(function () {
  let select = $('.form_wrp .form_select select');

  control_select_txt_color(select);

  select.on('focus', function () {
    select.css('color', '');
  });

  select.on('blur change', function () {
    control_select_txt_color($(this));
  });
});

/**
 * @param {object} select
 */
function control_select_txt_color(select) {
  if (select.val() == '') {
    select.css('color', '#757575');
    return;
  }

  select.css('color', '');
}



// --------------------------------------
// Address (yubinbango)
// --------------------------------------
(function () {

  let h_adr_all = document.querySelectorAll('.h-adr');
  if (h_adr_all.length === 0) return;

  h_adr_all.forEach(function (h_adr) {

    add_address_by_postal_code(h_adr);
  });
})();

function add_address_by_postal_code(h_adr) {
  let cancel_flag = true,
    on_keyup_canceller = function (e) {

      if (cancel_flag) {
        e.stopImmediatePropagation();
      }

      return false;
    },
    postal_code = h_adr.querySelectorAll('.p-postal-code'),
    postalField = postal_code[postal_code.length - 1];

  //通常の挙動をキャンセルできるようにイベントを追加
  postalField.addEventListener('keyup', on_keyup_canceller, false);


  //ボタンクリック時
  let btn = h_adr.querySelector('.postal-search');
  btn.addEventListener('click', function (e) {

    //キャンセルを解除
    cancel_flag = false;

    //発火
    let event;
    if (typeof Event === 'function') {
      event = new Event('keyup');
    } else {
      event = document.createEvent('Event');
      event.initEvent('keyup', true, true);
    }
    postalField.dispatchEvent(event);

    //キャンセルを戻す
    cancel_flag = true;
  });
}

// --------------------------------------
// Input Date (flatpickr)
// --------------------------------------
$(function () {

  let $calendar = $('.form_calendar');

  if ($calendar.length > 0) {

    $calendar.flatpickr({
      dateFormat: 'Y/m/d',
      'locale': 'ja'
    });
  }
});





// --------------------------------------
// Privacy policy
// --------------------------------------
$('#privacy_checkbox').on('change', function () {
  if ($(this).prop('checked')) {
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
function get_valid_group_rules() {

  let rules = [];

  $('[data-valid-group]').each(function () {

    let group = $(this).data('valid-group');
    if (rules.indexOf(group) < 0) rules.push(group);
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
function get_validate_params_groups(rules) {

  let = groups = {};

  $.each(rules, function (rule_index, rule) {

    $('[data-valid-group="' + rule + '"]').each(function (group_index) {

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
function get_valid_group_names($group) {

  let names = '';

  $group.find('[data-valid-group-item]').each(function (index) {

    if (index > 0) names += ' ';
    names += $(this).attr('name');
  });

  return names;
}


/**
 * @param {object} rules valid group rules
 * ex : ['required_all', 'required_tel', 'required_checkbox']
 */
function add_rule_to_valid_groups(rules) {

  $.each(rules, function (rule_index, rule) {

    $('[data-valid-group="' + rule + '"]').each(function () {

      add_rule_to_valid_group[rule].bind(this)();
    });
  });
}


let add_rule_to_valid_group = {
  // all required
  'required_all': function () {

    let $items = $(this).find('[data-valid-group-item]');

    $items.each(function () {

      $(this).rules('add', {
        require_from_group: [$items.length, '[data-valid-group-item]'],
        messages: {
          require_from_group: 'このフィールドは必須です。'
        }
      });
    });
  },
  'required_all_tel': function () {

    let $items = $(this).find('[data-valid-group-item]');

    $items.each(function () {
      $(this).rules('add', {
        number: true,
        require_from_group: [$items.length, '[data-valid-group-item]'],
        messages: {
          number: '電話番号を入力してください。',
          require_from_group: 'このフィールドは必須です。'
        }
      });
    });
  },
  'required_checkbox': function () {


  }
};


// Add Validation rule
let add_rule_to_valid_item = [
  function () {

    $input = $('#area_form input[type="email"]');
    if ($input.length === 0) return;

    $input.rules('add', {
      email: true,
      messages: {
        email: 'メールアドレスを入力してください。'
      }
    });
  },
  function () {

    $input = $('#area_form input[data-double-check-for]');
    if ($input.length === 0) return;

    $input.each(function () {

      $(this).rules('add', {
        equalTo: $(this).data('double-check-for'),
        messages: {
          equalTo: '同じメールアドレスを入力してください。'
        }
      });
    });
  },
  function () {

    $input = $('#area_form input[type="tel"]');
    if ($input.length === 0) return;

    $input.each(function () {

      $(this).rules('add', {
        number: true,
        messages: {
          number: '電話番号を入力してください。'
        }
      });
    });
  }
];

$('#area_form').on('after.validate_setting', function () {

  for (let i = 0; i < add_rule_to_valid_item.length; i++) {
    add_rule_to_valid_item[i].bind()();
  }
})
