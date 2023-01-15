/**----------------------------------------------------------------------------
 * #TOC
 *
 * ## ファイルアップロード
 * ## セレクトボックス 値が空の時 文字色をplaceholderと同色にする
 * ## 住所検索ボタンの動作
 * ## カレンダー
 * ## プライバシーポリシー同意チェック時にsubmitボタン有効化
 * ## バリデーション
 *----------------------------------------------------------------------------*/

/**----------------------------------------------------------------------------
 * ファイルアップロード
 *----------------------------------------------------------------------------*/
$(function(){
  let form_file_name_default = '選択されていません';

  $('.form_file .form_file_name').text(form_file_name_default);

  $('.form_file input[type="file"]').on('change', function(){

    let form_file_name = $(this).val()?
      $(this).val() : form_file_name_default;

    $(this).closest('.form_file').find('.form_file_name').text(form_file_name);

  });
});

/**----------------------------------------------------------------------------
 * ファイルアップロード 値が空の時 文字色をplaceholderと同色にする
 *----------------------------------------------------------------------------*/
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
 * 値が空の時 文字色をplaceholderと同色にする
 * @param {object} input セレクタ
 */
function control_input_txt_color(input) {
  if(input.val() == ''){
    input.closest('.form_file').find('.form_file_name').css('color', '#757575');
    return;
  }

  input.closest('.form_file').find('.form_file_name').css('color', '');
}

/**----------------------------------------------------------------------------
 * セレクトボックス 値が空の時 文字色をplaceholderと同色にする
 *----------------------------------------------------------------------------*/
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
 * 値が空の時 文字色をplaceholderと同色にする
 * @param {object} select セレクタ
 */
function control_select_txt_color(select) {
  if(select.val() == ''){
    select.css('color', '#757575');
    return;
  }

  select.css('color', '');
}


/**----------------------------------------------------------------------------
 * 住所検索ボタンの動作
 *----------------------------------------------------------------------------*/
(function() {
  //該当フォーム
  let hadr = document.querySelector(".h-adr"),
      cancelFlag = true;

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



/**----------------------------------------------------------------------------
 * カレンダー
 *
 * flatpicker pluginを使用。
 * カレンダーを機能を付与したいinput要素に.form_calendarのクラス名付与。
 *----------------------------------------------------------------------------*/
$('.form_calendar').flatpickr({
  dateFormat: 'Y/m/d',
  'locale': 'ja'
});


/**----------------------------------------------------------------------------
 * プライバシーポリシー同意チェック時にsubmitボタン有効化
 *----------------------------------------------------------------------------*/
$('#privacy_checkbox').on('change', function(){
  if($(this).prop('checked')){
    $('#form_submit').attr('disabled', false)
    return;
  }

  $('#form_submit').attr('disabled', true)
  return;
});


/**----------------------------------------------------------------------------
 * バリデーション
 *----------------------------------------------------------------------------*/
/**--------------------------------------
 * バリデーションメッセージ
 *--------------------------------------*/
$.extend($.validator.messages, {
  required : '必須項目です。入力してください。',
  require_from_group : '必須項目です。入力してください。',
  remote : 'この入力欄を修正してください。',
  email : '有効なEメールアドレスを入力してください。',
  url : '有効なURLを入力してください。',
  date : '有効な日付を入力してください。',
  dateISO : '有効な日付（ISO）を入力してください。',
  number : '有効な数字を入力してください。',
  digits : '数字のみを入力してください。',
  creditcard : '有効なクレジットカード番号を入力してください。',
  equalTo : 'メールアドレスが一致しません。',
  extension : '有効な拡張子を含む値を入力してください。',
  maxlength : $.validator.format( '{0} 文字以内で入力してください。' ),
  minlength : $.validator.format( '{0} 文字以上で入力してください。' ),
  range : $.validator.format( '{0} から {1} までの値を入力してください。' ),
  rangelength: $.validator.format( '{0} 文字から {1} 文字までの値を入力してください。' ),
  step : $.validator.format( '{0} の倍数を入力してください。' ),
  max : $.validator.format( '{0} 以下の値を入力してください。' ),
  min : $.validator.format( '{0} 以上の値を入力してください。' )
});

/**--------------------------------------
 * バリデーショングループ作成関連
 *--------------------------------------*/
/**
 * バリデーショングループ取得
 * @param {object} valid_groups バリデーショングループ配列
 */
function get_valid_groups(valid_groups){
  let result = {};

  $.each(
    valid_groups,
    function(index, valid_group){
      result[valid_group.group_name] = get_validation_group_field_name_attr(
        '.'+valid_group.group_name
      );
    }
  );

  return result;
}

/**
 * バリデーショングループフィールドのname属性値を半角スペース区切りで取得
 * @param selector_fields {object} フィールドのセレクタ
 */
  function get_validation_group_field_name_attr(rule_group_class){
  let field_name = '';

  $(rule_group_class).each(
    function(i){
      if(i > 0) field_name += ' ';
      field_name += $(this).attr('name');
  });

  return field_name;
}

/**--------------------------------------
 * グループ ルール付与 各メソッド
 *--------------------------------------*/
/**
 * グループルール付与 必須
 * @param valid_groups {object} バリデーショングループの配列
 */
  function add_rules_valid_groups(valid_groups){
  $.each(
    valid_groups,
    function(index, valid_group){

      switch(valid_group.rule){
        case 'required_tel': //電話番号
          add_required_tel_group_rule(
            valid_group.group_name
          );
          break;
        case 'required_radio': //ラジオボタン
          add_required_radio_group_rule(
            valid_group.group_name
          );
          break;
        default: //その他は必須のみ
          add_required_group_rule(
            valid_group.group_name
          );
      }
    }
  );
}

/**
 * グループルール付与 必須
 * @param group_name {string} 入力欄タグの共通クラス名
 */
function add_required_group_rule(group_name){
  let group_class_name = '.' + group_name;

  $(group_class_name).each(function(){
    $(this).rules('add', {
      require_from_group : [$(group_class_name).length, group_class_name]
    });
  });
}

/**
 * グループルール付与電話番号(必須 + 数値のみ)
 * @param group_name {string} 入力欄タグの共通クラス名
 */
function add_required_tel_group_rule(group_name){
  let group_class_name = '.' + group_name;

  $(group_class_name).each(function(){
    $(this).rules('add', {
      number : true,
      require_from_group : [$(group_class_name).length, group_class_name],
      messages : {
        number : '正しい電話番号を入力してください。'
      }
    });
  });
}

/**
 * グループルール付与ラジオボタン
 * @param group_name {string} 入力欄タグの共通クラス名
 */
function add_required_radio_group_rule(group_name){
  let group_class_name = '.' + group_name;
  $(group_class_name).each(function(){
    $(this).rules('add', {
      require_from_group: [1, group_class_name]
    });
  });
}
