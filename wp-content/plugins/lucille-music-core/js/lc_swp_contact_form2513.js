
jQuery(document).ready(function($) {
	'use strict';

	ajaxCF($);
});

var ajaxCF = function($) {
	if (!$('form.lucille_contactform').length) {
		return;
	}

	$("form.lucille_contactform").submit(function(event) {
		event.preventDefault();

		var name = $.trim($(this).find("input#contactName").val());
		var email = $.trim($(this).find("input#contactemail").val());
		var phone = $.trim($(this).find("input#phone").val());
		var message = $.trim($(this).find("textarea#commentsText").val());
		var required_is_empty = false;

		if ('' == name) {
			required_is_empty = true;
			$(this).find('.comment-form-author').find('.lucille_cf_error').show('slow');
		}

		if ('' == email) {
			required_is_empty = true;
			$(this).find('.comment-form-email').find('.lucille_cf_error').show('slow');
		}

		if ('' == message) {
			required_is_empty = true;
			$(this).find('.comment-form-comment').find('.lucille_cf_error').show('slow');
		}

		if (required_is_empty) {
			return;
		}

		var data = {
			action: 'lucillecontactform_action',
			data: $(this).find(":input").serialize()
		};

		$.post(DATAVALUES.ajaxurl, data, function(response) {
			var obj;
			
			try {
				obj = $.parseJSON(response);
			}
			catch(e) {
				alert("Unexpected problem occurred when sending the email.");
				return;
			}

			if(obj.success === true) {
				$("form.lucille_contactform").find(".formResultOK").find(".lucille_cf_error").show("slow");

				$("form.lucille_contactform").find("input#contactName").val('');
				$("form.lucille_contactform").find("input#contactemail").val('');
				$("form.lucille_contactform").find("input#phone").val('');
				$("form.lucille_contactform").find("textarea#commentsText").val('');
			} else {
				if (obj.error === 'wp_mail_failed') {
					$("form.lucille_contactform").find(".wp_mail_error").find(".lucille_cf_error").show("slow");
				}
			}
		});		

	});
}