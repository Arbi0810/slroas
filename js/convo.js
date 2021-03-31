/*
 * NOTE: all actions are prefixed by plugin shortnam_action_name
 */

jQuery(function($) {

	// stylings
	$('#wooconvo-send').find('textarea').css({
		'width' : '100%'
	});
	
	
	//showing/hiding convos
	$(".nm-wooconvo-subject").click(function(){
		
		var _convo_item = $(this).parent();
		_convo_item.find(".nm-wooconvo-message, .nm-wooconvo-files").slideToggle(500);		
	});
	
	//expand all message
	$("a.nm-wooconvo-expand-all").click(function(){
		
		if(wooconvo_vars.collapse_all === $(this).html()){
			$(this).html(wooconvo_vars.expand_all);	
			$(".nm-wooconvo-message, .nm-wooconvo-files").slideUp(500);
		}else{
			$(this).html(wooconvo_vars.collapse_all);
			$(".nm-wooconvo-message, .nm-wooconvo-files").slideDown(500);
		}
			
		
	});

	
});

function send_order_message() {

	show_working('sending-order-message', false);

	var _wrapper = jQuery("#wooconvo-send");
	var message = _wrapper.find('.wooconvo-textarea').val();

	if (message != '') {
		
		_wrapper.find('.wooconvo-textarea').css({'border':''});
		
		var files_attached = Array();
		jQuery('input[name^="thefile_wooconvo_file"]').each(function(i, item){
			//console.log(item);
			files_attached.push( jQuery(item).val() );
		});
		
	
		var data = 'message=' + message;
		data = data + '&is_admin='+ _wrapper.find('input[name="is_admin"]').val();
		data = data + '&existing_convo_id='+ jQuery('input[name="existing_convo_id"]').val();
		data = data + '&order_id='+ _wrapper.find('input[name="order_id"]').val();
		data = data + '&wooconvo_nonce='+ jQuery('input[name="wooconvo_nonce"]').val();
		data = data + '&files='+ files_attached;
		data = data + '&action=wooconvo_send_message';

		jQuery.post(wooconvo_vars.ajaxurl, data, function(resp) {
			// console.log(resp);
			if(resp.status == 'error'){
				jQuery('#sending-order-message').html(resp.message);
			}else{
				jQuery('#sending-order-message').html(resp.message);
				
				// remove first/default messag
				jQuery(".wooconvo-first-message").remove();
				
				var last_msg = resp.last_message;
				jQuery('ol.chat').append(resp.last_message);
				_wrapper.find('.wooconvo-textarea').val('');
			}
			

		});
	}else{
		
		_wrapper.find('.wooconvo-textarea').effect('shake');
		// _wrapper.find('.wooconvo-textarea').css({'border':'1px solid red'});
		show_working('sending-order-message', true);
	}

	return false;
}

function get_option(key) {

	/*
	 * TODO: change plugin shortname
	 */
	var keyprefix = 'wooconvo';

	key = keyprefix + key;

	var req_option = '';

	jQuery.each(wooconvo_vars.settings, function(k, option) {

		// console.log(k);

		if (k == key)
			req_option = option;
	});

	// console.log(req_option);
	return req_option;

}

// a function showing working gif
function show_working(element, off) {

	var _html = '';
	if (off == false) {
		var _html = '<img src="' + wooconvo_vars.plugin_url
				+ '/images/loading.gif">';
	}

	jQuery('#' + element).html(_html);
}

jQuery(document).ready(function($){ 
	//add modal to all conversations
	// $(".modal-convo").iziModal({
	// 	width: 900,
	// 	padding: 30,
	// 	top: 60,
	// 	zindex: 10000,
	// 	closeButton: true,
	// });
	// console.log($(".modal-convo"));
	$('a[class*="convo"]').each(function(index, val){
		var modal_id  = $(this).attr('class').split(' ').pop();
		// get order id by spliting the convo-904 ( convo-order_id ) class
		var order_id = modal_id.split('convo-');
		
		// console.log( order_id[1] );
		modal_id  = '#modal-'+modal_id;
		var data = {
			'action' : 'get_wooconvo',
			'order_id' : order_id[1]
		}
		var target = modal_id+" .iziModal-content";
		$(modal_id).iziModal({
			width: 900,
			padding: 30,
			top: 60,
			zindex: 10000,
			closeButton: true,
			onOpening: function(modal){
 
		        modal.startLoading();
		 
		        $.post(wooconvo_vars.ajaxurl, data, function(data) {
		            $(target).html(data);
		 
		            modal.stopLoading();
		        });
		        $('.modal-convo').append('<button data-izimodal-close="modal-convo-'+order_id[1]+'" data-izimodal-transitionout="bounceOutDown" class="button conversation-btn">x</button>');
		    },
		});
	});

	$('a[class*="convo"]').on( 'click', function(event){
		event.preventDefault();

		var modal_id  = $(this).attr('class').split(' ').pop();
		modal_id  = '#modal-'+modal_id;

		$(modal_id).iziModal('open');
	});
});