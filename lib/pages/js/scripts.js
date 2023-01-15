/**----------------------------------------------------------------------------
 * バリデーション
 *----------------------------------------------------------------------------*/
$(function(){
  /**--------------------------------------
   * バリデーショングループ作成
   * 複数の入力欄をグループ化してバリデーションさせる場合は
   * 下記の配列に追加
   *
   *  - group_name : 入力欄にCSSクラス名として追加しておく
   *                 入力欄を囲う要素に.valid_groupを付与しておく
   *  - rule : 適用したルールを設定。ルールの一覧は下記
   *           @see /form/common_form.js
   *--------------------------------------*/
  let valid_groups = [
    {
      //お名前(別々)
      'group_name' : 'form_require_name_group',
      'rule' : 'required'
    },{
      //電話番号(別々)
      'group_name' : 'form_require_tel_group',
      'rule' : 'required_tel'
    }
  ];


  /**--------------------------------------
   * バリデーショングループ 制御
   *--------------------------------------*/
  $('#area_form').validate({
    groups: get_valid_groups(valid_groups),
    errorPlacement: function(error, element){

      let result = valid_groups.some(function(u){{
        return u.group_name === error.attr('id').replace('-error', '');
      }});

      if(result){
        element.closest('.valid_group').after(error);
        return;
      }

      $(element).after(error);
    },
    success: function(error, element) {
      $(error).remove();
    },
    onfocusout: function(element) {
      this.element(element);
    }
  });


  /**--------------------------------------
   * 個別ルール付与
   *--------------------------------------*/
  /**
   * 必須のみ
   * 必須にしたい入力欄タグに.form_requireを付与
   */
  $('.form_require').each(function(){
    $(this).rules('add', {
      required: true
    });
  });

  //メールアドレス
  $('#your_email').rules('add', {
    required: true,
    email: true
  });

  // メールアドレス(確認用)
  $('#your_mail_confirm').rules('add', {
    required: true,
    email: true,
    equalTo: '#your_mail'
  });


  /**--------------------------------------
   * グループ ルール付与
   *--------------------------------------*/
  add_rules_valid_groups(valid_groups);


  /**--------------------------------------
   * ルール可変処理
   *--------------------------------------*/
  /**
   * Todo:その他選択時の動き
   */


});
