if(typeof $ == 'undefined'){
	var $ = jQuery;
}
(function($) {
	
    $(document).ready(function () { 
	
	   "use strict";
        /*-------------------- EXPANDABLE PANELS ----------------------*/
        var panelspeed = 500; //panel animate speed in milliseconds
        var totalpanels = 3; //total number of collapsible panels   
        var defaultopenpanel = 1; //leave 0 for no panel open   
        var accordian = false; //set panels to behave like an accordian, with one panel only ever open at once      
 
        var panelheight = new Array();
        var currentpanel = defaultopenpanel;
        var iconheight = parseInt($('.icon-close-open').css('height'));
        var highlightopen = true;
         
        //Initialise collapsible panels
        // function panelinit() {
        //         for (var i=1; i<=totalpanels; i++) {
        //             panelheight[i] = parseInt($('#cp-'+i).find('.expandable-panel-content').css('height'));
        //             $('#cp-'+i).find('.expandable-panel-content').css('margin-top', -panelheight[i]);
        //             if (defaultopenpanel == i) {
        //                 $('#cp-'+i).find('.icon-close-open').css('background-position', '0px -'+iconheight+'px');
        //                 $('#cp-'+i).find('.expandable-panel-content').css('margin-top', 0);
        //             }
        //         }
        // }
 
        $('.expandable-panel-heading').click(function() {           
            var obj = $(this).next();
            var objid = parseInt($(this).parent().attr('ID').substr(3,2));  
            currentpanel = objid;
            if (accordian == true) {
                resetpanels();
            }
             
            if (parseInt(obj.css('margin-top')) <= (panelheight[objid]*-1)) {
                obj.clearQueue();
                obj.stop();
                obj.prev().find('.icon-close-open').css('background-position', '0px -'+iconheight+'px');
                obj.animate({'margin-top':0}, panelspeed);
                if (highlightopen == true) {
                    $('#cp-'+currentpanel + ' .expandable-panel-heading').addClass('header-active');
                }
            } else {
                obj.clearQueue();
                obj.stop();
                obj.prev().find('.icon-close-open').css('background-position', '0px 0px');
                obj.animate({'margin-top':(panelheight[objid]*-1)}, panelspeed); 
                if (highlightopen == true) {
                    $('#cp-'+currentpanel + ' .expandable-panel-heading').removeClass('header-active');   
                }
            }
        });
         
        function resetpanels() {
            for (var i=1; i<=totalpanels; i++) {
                if (currentpanel != i) {
                    $('#cp-'+i).find('.icon-close-open').css('background-position', '0px 0px');
                    $('#cp-'+i).find('.expandable-panel-content').animate({'margin-top':-panelheight[i]}, panelspeed);
                    if (highlightopen == true) {
                        $('#cp-'+i + ' .expandable-panel-heading').removeClass('header-active');
                    }
                }
            }
        }


        /********** radio box ************/
		$(window).load(function(){
			$('.form_in_submit #radio_default').attr('checked', true);
			if ($('#radio_audio').is(':checked')) {
				// $('#in_audio_url').attr('checked', true);
				// $('#in_audio_url').attr('checked', true);
				$('#box_url_audio').find('.with_required').addClass('validate[required]');
			}
			if ($('#radio_video').is(':checked')) {
				$('#video_info').slideDown();
				$('.box_url_video').find('.with_required').addClass('validate[required]');
			}

			var chk_radio_body = $('form').find('input[type="radio"]');
    		chk_radio_body.each(function(index){
    			var vas = $(this);
    			if (vas.is(':checked')) {
            		var ceeble = vas.val();
            		if (ceeble == 'audio') {
            			$('#audio_info').slideDown();
            			$('#video_info').slideUp();
            			$('input[name="post_url_video"]').val('');
            			$('.box_url_video').find('.with_required').removeClass('validate[required]');
            			$('#box_url_audio').find('.with_required').addClass('validate[required]');
            			// $('#in_audio_url').attr('checked', true);
            			$('.box_url_musique').find('.with_required').addClass('validate[required]');
            			$('#box_upload_audio').slideUp();		
            			$('#box_url_audio').slideDown(); 
            		}

            		else if (ceeble == 'in_audio_url') {
            			$('#box_url_audio').slideDown();
            			$('#box_upload_audio').slideUp();
            			$('#box_url_audio').find('.with_required').addClass('validate[required]');
            			$("#box_upload_audio").find('a.uu-photopost-delete').trigger('click');
            		}
            		else if(ceeble == 'in_audio_upload') {
            			$('#box_upload_audio').slideDown();
            			$('#box_url_audio').slideUp();
            			$('#box_url_audio').find('.with_required').removeClass('validate[required]');
            			$('input[name="post_url_audio"]').val('');	
            		}

            		else if(ceeble == 'video') {
            			$('#video_info').slideDown();
            			$('#audio_info').slideUp();
            			$('input[name="post_url_audio"]').val('');
            			$('#in_audio_url').attr('checked', false);
            			$('.box_url_video').find('.with_required').addClass('validate[required]');
            			$('#box_url_audio').find('.with_required').removeClass('validate[required]');
            			$('.box_url_musique').find('.with_required').removeClass('validate[required]');
            			$("#box_upload_audio").find('a.uu-photopost-delete').trigger('click');
            		}
            		else {
            			$('#video_info').slideUp();
            			$('#audio_info').slideUp();
            			$('input[name="post_url_video"]').val('');
            			$('input[name="post_url_audio"]').val('');
            			$('#in_audio_url').attr('checked', false);
            			$("#box_upload_audio").find('a.uu-photopost-delete').trigger('click');
            			$('#box_url_audio').find('.with_required').removeClass('validate[required]');
            			$('.box_url_musique').find('.with_required').removeClass('validate[required]');
            			$('.box_url_video').find('.with_required').removeClass('validate[required]');
            		}
            	}
    		});

		})		
		var ck_audio = $(' .box_type_format').find('input[type="radio"]');
    	ck_audio.each(function(index){
    		var vis = $(this);
    		vis.click(function(){
        		if (ck_audio.is(':checked')) {
            		var cible = vis.val();
            		if (cible == 'audio') {
            			$('#audio_info').slideDown();
            			$('#video_info').slideUp();
            			$('input[name="post_url_video"]').val('');
            			$('.box_url_video').find('.with_required').removeClass('validate[required]');
            			$('#box_url_audio').find('.with_required').addClass('validate[required]');
            			$('#in_audio_url').attr('checked', true);
            			$('.box_url_musique').find('.with_required').addClass('validate[required]');
            			$('#box_upload_audio').slideUp();		
            			$('#box_url_audio').slideDown();            			
            		}
            		else if(cible == 'video') {
            			$('#video_info').slideDown();
            			$('#audio_info').slideUp();
            			$('input[name="post_url_audio"]').val('');
            			$('#in_audio_url').attr('checked', false);
            			$('.box_url_video').find('.with_required').addClass('validate[required]');
            			$('#box_url_audio').find('.with_required').removeClass('validate[required]');
            			$('.box_url_musique').find('.with_required').removeClass('validate[required]');
            			$("#box_upload_audio").find('a.uu-photopost-delete').trigger('click');
            		}
            		else {
            			$('#video_info').slideUp();
            			$('#audio_info').slideUp();
            			$('input[name="post_url_video"]').val('');
            			$('input[name="post_url_audio"]').val('');
            			$('#in_audio_url').attr('checked', false);
            			$("#box_upload_audio").find('a.uu-photopost-delete').trigger('click');
            			$('#box_url_audio').find('.with_required').removeClass('validate[required]');
            			$('.box_url_musique').find('.with_required').removeClass('validate[required]');
            			$('.box_url_video').find('.with_required').removeClass('validate[required]');
            		}
            	}
        	})
    	})

     	// Url audio
		var ck_input_audio = $('.box_type_url').find('input[name="audio_insert"]');
    	ck_input_audio.each(function(index){
    		var vis = $(this);
    		vis.click(function(){
        		if (vis.is(':checked')) {
            		var cible = vis.val();
            		if (cible == 'in_audio_url') {
            			$('#box_url_audio').slideDown();
            			$('#box_upload_audio').slideUp();
            			$('#box_url_audio').find('.with_required').addClass('validate[required]');
            			$("#box_upload_audio").find('a.uu-photopost-delete').trigger('click');
            		}
            		else if(cible == 'in_audio_upload') {
            			$('#box_upload_audio').slideDown();
            			$('#box_url_audio').slideUp();
            			$('#box_url_audio').find('.with_required').removeClass('validate[required]');
            			$('input[name="post_url_audio"]').val('');	
            		}
            	}
        	})
    	})

		/* ---------- Tag ---------- */
		$('.input_tags').tagsinput({
			'maxTags': 3,
			'maxChars': 25
		});	
		
		//add new gallery
		
		$('#add_gallery').click(function() {
			
			
			$( "#new_gallery_div" ).slideDown( "slow", function() {			
				// Animation complete.
			
			});			
					 
			 return false; 
    		e.preventDefault();

				
        });
		
			
		$('body').on('click', '.display_gallery_pictures', function() {
			
			
			var gal_id =  jQuery(this).attr("data-id");
			var page_id_val =   $('#page_id').val(); 		
					
			jQuery.ajax({
				type: 'POST',
				url: ajaxurl,
				data: {"action": "reload_photos", "gal_id": gal_id  , "page_id": page_id_val },
				
				success: function(data){					
					$('#xoouserultra_current_gal').text(gal_id);					
					$("#usersultra-gallerylist").html(data);				
					
					
					}
			});
		});
		
		
		$('#close_add_gallery').click(function() {
			
			
			$( "#new_gallery_div" ).slideUp( "slow", function() {			
				// Animation complete.
			
			});			
					 
			 return false; 
    		e.preventDefault();

				
        });
		
		$('#close_add_video').click(function() {
			
			
			$( "#new_video_div" ).slideUp( "slow", function() {			
				// Animation complete.
			
			});			
					 
			 return false; 
    		e.preventDefault();

				
        });
		
		$('#add_new_video').click(function() {			
			
			$( "#new_video_div" ).slideDown( "slow", function() {			
				// Animation complete.
			
			});			
					 
			 return false; 
    		e.preventDefault();
				
        });  
		$('#add_new_files').click(function() {			
			
			$( "#resp_t_image_list" ).slideDown( "slow", function() {			
				// Animation complete.
			
			});			
					 
			 return false; 
    		e.preventDefault();
				
        });  
		
		
		
				
		$('#new_gallery_add').click(function() {
			
	
			var gall_name = $('#new_gallery_name').val();
			var gall_desc = $('#new_gallery_desc').val();
		
			jQuery.ajax({
				type: 'POST',
				url: ajaxurl,
				data: {"action": "add_new_gallery", "gall_name": gall_name , "gall_desc": gall_desc },
				
				success: function(data){
					
					$('#new_gallery_name').text("");
					$('#new_gallery_desc').text("");
					
					reload_gallery_list();					
					
					
					}
			});
			
			 // Cancel the default action
			 return false;
    		e.preventDefault();			 

				
        });
		
		//add new video confirm		
		$(document).on("click", "#new_video_add_confirm", function(e) {
			
			e.preventDefault();
			
	
			var video_name = $('#new_video_name').val();
			var video_id = $('#new_video_unique_vid').val();
			var video_type = $('#new_video_type').val();
			
			if(video_name==""){alert(video_empy_field_name);return}
			if(video_id==""){alert(video_empy_field_id);return}
		
			jQuery.ajax({
				type: 'POST',
				url: ajaxurl,
				data: {"action": "add_new_video", "video_name": video_name , "video_id": video_id , "video_type": video_type },
				
				success: function(data){
					
					$('#new_video_name').text("");
					$('#new_video_unique_vid').text("");
					
					reload_video_list();					
					
					
					}
			});
			
    		e.preventDefault();
			 

				
        });
		
		function reload_gallery_list ()
		{
			
			var page_id_val =   jQuery('#page_id').val(); 
			 jQuery.post(ajaxurl, {
							action: 'reload_galleries', 'page_id':  page_id_val 
									
							}, function (response){
									
																
							jQuery("#usersultra-gallerylist").html(response);
									
									
					
			});
			
			
			
		}
		
		function reload_photo_list (gal_id)
		{
			var page_id_val =   jQuery('#page_id').val(); 	
			
			 jQuery.post(ajaxurl, {
							action: 'reload_photos', 'gal_id':  gal_id,  'page_id':  page_id_val 
									
							}, function (response){									
																
							jQuery("#usersultra-photolist").html(response);
					
			});
		}
		
		/* suppression d'article */
        var all_post_types = ['post', 'video', 'enseignement', 'parole', 'musique', 'citation', 'lifestyle', 'pensee', 'temoignage'];
  
      	$.each( all_post_types, function( key, posttype ) {
        	//delete temoignage
			$('body').on('click',".uultra-del-user-"+ posttype +"link", function(e) {		
				e.preventDefault();			
				var doIt = false;	
				var post_id =  jQuery(this).attr("data-id");		
				doIt=confirm(post_del_confirmation_message + ' ID = ' + post_id);		  
				if(doIt)
				{				
					// var post_id =  jQuery(this).attr("data-id");
					jQuery('#uultra-delete-'+ posttype).val('uultra-del-'+ posttype +'-conf');
					jQuery('#post_id').val(post_id);
					jQuery('#uultra-form-publisher_' + posttype).submit();
				}
				return false;			
	    		e.preventDefault();	
	        });
			
		});

      	// Test MP3
		// $('.form_show_front').submit(function(e){
		// 	var post_url_audio = $('#post_url_audio').val();
		// 	var res = post_url_audio.split(".");
		// 	var last = res[res.length - 1];

		// 	if ($('#in_audio_url').is(':checked')) {
		// 		if (last != 'mp3') {
		// 			alert(post_url_audio + ' \n n\'est pas un MP3, Veuillez renseigner un bon URL');
		// 			e.preventDefault();
		// 		}
		// 	}			
			
		// })




		function reload_video_list ()
		{			
			jQuery.post(ajaxurl, {
				action: 'reload_videos'				
				}, function (response){	
				jQuery("#usersultra-videolist").html(response);											
			});
		}
		
			
		jQuery(document).on("click", "a[href='#resp_del_photo']", function(e) {
			
			e.preventDefault();
			
			var photo_id =  jQuery(this).attr("id");
			var gal_id =  jQuery(this).attr("data-id");	
			
								
			jQuery.ajax({
				type: 'POST',
				url: ajaxurl,
				data: {"action": "delete_photo", "photo_id": photo_id },
				
				success: function(data){
					reload_photo_list(gal_id);
					
					
					}
			});
			
    		e.preventDefault();
			 
				
        });
		
		//delete account
		
		jQuery('body').on('click',"#xoouserultra-close-acc-btn", function(e) {
		
		   
			e.preventDefault();
			
			var doIt = false;
			
			doIt=confirm(delete_account_confirmation_mesage);
		  
			if(doIt)
			{
				
				jQuery('#uultra-close-account').submit();
				
						
			}
			
    		e.preventDefault();
			 
				
        });
		
		
		//delete video
		
		jQuery(document).on("click", "a[href='#resp_del_video']", function(e) {
			
			e.preventDefault();
			
			var doIt = false;
			
			doIt=confirm(video_delete_confirmation_message);
		  
			if(doIt)
			{
				
				var video_id =  jQuery(this).attr("data-id");	
									
				jQuery.ajax({
					type: 'POST',
					url: ajaxurl,
					data: {"action": "delete_video", "video_id": video_id },
					
					success: function(data){
						//reload_photo_list(gal_id);
						
						reload_video_list();
						
						
						}
						
										});			
			
			}
			
    		e.preventDefault();
			 
				
        });
		
		//close edit box
		jQuery(document).on("click", ".btn-photo-close", function(e) {
			
			e.preventDefault();				
			var photo_id =  jQuery(this).attr("data-id");						
			jQuery( "#photo-edit-div-"+photo_id ).slideUp();								
			
    		e.preventDefault();
			 
				
        });
		
		jQuery("body").on("click", ".btn-photo-conf", function(e) {
			
			e.preventDefault();		
			
			
				var photo_id =  jQuery(this).attr("data-id");	
				var photo_name= $("#uultra_photo_name_edit_"+photo_id).val()	;
				var photo_desc =  $("#uultra_photo_desc_edit_"+photo_id).val();
				
				var photo_tags =  $("#uultra_photo_tags_edit_"+photo_id).val();				
				var photo_category =  $("#uultra_photo_category_edit_"+photo_id).val();
				jQuery.ajax({
					type: 'POST',
					url: ajaxurl,
					data: {"action": "edit_photo_confirm", "photo_id": photo_id , "photo_name": photo_name , "photo_desc": photo_desc , "photo_tags": photo_tags , "photo_category": photo_category },
					
					success: function(data){					
						
												
						jQuery( "#photo-edit-div-"+photo_id ).slideUp();
						//reload_gallery_list();
						
						
						}
				});
			
			
			 // Cancel the default action
    		e.preventDefault();
			 
				
        });		
		//edit photo
		jQuery(document).on("click", "a[href='#resp_edit_photo']", function(e) {
			
			e.preventDefault();
			
			
				
				var photo_id =  jQuery(this).attr("data-id");	
									
				jQuery.ajax({
					type: 'POST',
					url: ajaxurl,
					data: {"action": "edit_photo", "photo_id": photo_id },
					
					success: function(data){
						
						
						jQuery("#photo-edit-div-"+photo_id).html(data);						
						jQuery( "#photo-edit-div-"+photo_id ).slideDown();
						
						
						}
				});
			
    		e.preventDefault();
			 
				
        });		
		
		//close video edit box
		jQuery(document).on("click", ".btn-video-close-conf", function(e) {
			
			e.preventDefault();				
			var p_id =  jQuery(this).attr("data-id");
									
			jQuery( "#video-edit-div-"+p_id ).slideUp();			
    		e.preventDefault();
			 
				
        });		
		//edit video
		
		jQuery(document).on("click", "a[href='#resp_edit_video']", function(e) {
			
			e.preventDefault();
					
				
				var video_id =  jQuery(this).attr("data-id");	
									
				jQuery.ajax({
					type: 'POST',
					url: ajaxurl,
					data: {"action": "edit_video", "video_id": video_id },
					
					success: function(data){
						
						
						jQuery("#video-edit-div-"+video_id).html(data);						
						jQuery( "#video-edit-div-"+video_id ).slideDown();
						
						
						}
				});
			
    		e.preventDefault();
			 
				
        });
		
		
		
		//edit gallery
		jQuery(document).on("click", "a[href='#resp_edit_gallery']", function(e) {
			
			e.preventDefault();
			
			
				
				var gal_id =  jQuery(this).attr("data-id");	
									
				jQuery.ajax({
					type: 'POST',
					url: ajaxurl,
					data: {"action": "edit_gallery", "gal_id": gal_id },
					
					success: function(data){
						
						
						jQuery("#gallery-edit-div-"+gal_id).html(data);
						
						jQuery( "#gallery-edit-div-"+gal_id ).slideDown();
						
						
						}
				});
			
    		e.preventDefault();
			 
				
        });
		
		//edit gallery confirm					
		jQuery(document).on("click", ".btn-gallery-conf", function(e) {
			
			e.preventDefault();		
			
			
				var gal_id =  jQuery(this).attr("data-id");	
				var gal_name= $("#uultra_gall_name_edit_"+gal_id).val()	;
				var gal_desc =  $("#uultra_gall_desc_edit_"+gal_id).val();
				var gal_visibility =  $("#uultra_gall_visibility_edit_"+gal_id).val();
									
				jQuery.ajax({
					type: 'POST',
					url: ajaxurl,
					data: {"action": "edit_gallery_confirm", "gal_id": gal_id , "gal_name": gal_name , "gal_desc": gal_desc , "gal_visibility": gal_visibility },
					
					success: function(data){					
						
												
						$( "#gallery-edit-div-"+gal_id ).slideUp();
						reload_gallery_list();
						
						
						}
				});
			
    		e.preventDefault();
			 
				
        });
		
		//close gallery edit box
		jQuery(document).on("click", ".btn-gallery-close-conf", function(e) {
			
			e.preventDefault();				
			var p_id =  jQuery(this).attr("data-id");
									
			jQuery( "#gallery-edit-div-"+p_id ).slideUp();			
			return false;
    		e.preventDefault();
			 
				
        });
		
		
		//edit gallery confirm					
		jQuery(document).on("click", ".btn-video-edit-conf", function(e) {
			
			e.preventDefault();		
			
			
				var video_id =  jQuery(this).attr("data-id");	
				var video_name= $("#uultra_video_name_edit_"+video_id).val()	;
				var video_unique_id =  $("#uultra_video_id_edit_"+video_id).val();
				var video_type =  $("#uultra_video_type_edit_"+video_id).val();
									
				jQuery.ajax({
					type: 'POST',
					url: ajaxurl,
					data: {"action": "edit_video_confirm", "video_id": video_id , "video_name": video_name , "video_unique_id": video_unique_id , "video_type": video_type },
					
					success: function(data){					
						
												
						$( "#video-edit-div-"+video_id ).slideUp();
						reload_video_list();
						
						
						}
				});
			
    		e.preventDefault();
			 
				
        });
		
		
		jQuery(document).on("click", "a[href='#resp_del_gallery']", function(e) {
			
			e.preventDefault();
			
			var doIt = false;
			
			doIt=confirm(gallery_delete_confirmation_message);
		  
			if(doIt)
			{
				
				var gal_id =  jQuery(this).attr("data-id");	
									
				jQuery.ajax({
					type: 'POST',
					url: ajaxurl,
					data: {"action": "delete_gallery", "gal_id": gal_id },
					
					success: function(data){
						//reload_photo_list(gal_id);
						
						reload_gallery_list();
						
						
						}
				});			
			
			}
    		e.preventDefault();
			 
				
        });
		
		jQuery(document).on("click", "a[href='#resp_set_main']", function(e) {
		
			
			e.preventDefault();
			
			var photo_id =  jQuery(this).attr("id");
			var gal_id =  jQuery(this).attr("data-id");	
			
								
			jQuery.ajax({
				type: 'POST',
				url: ajaxurl,
				data: {"action": "set_as_main_photo", "photo_id": photo_id , "gal_id": gal_id },
				
				success: function(data){
					reload_photo_list(gal_id);
					
					
					}
			});
			
			 // Cancel the default action
    		e.preventDefault();
			 
				
        });
		
		
		jQuery(document).on("click", "#btn-delete-user-avatar", function(e) {
			
			e.preventDefault();
			
    		jQuery.ajax({
					type: 'POST',
					url: ajaxurl,
					data: {"action": "delete_user_avatar" },
					
					success: function(data){
												
						refresh_my_avatar();
						
						
						}
				});
			
			
			 // Cancel the default action
    		e.preventDefault();
			 
				
        });
		
		function refresh_my_avatar ()
		{
			
			 jQuery.post(ajaxurl, {
							action: 'refresh_avatar'}, function (response){									
																
							jQuery("#uu-backend-avatar-section").html(response);
									
									
					
			});
			
		}
		
 
    //     $(window).load(function() {
 			// panelinit();
    //     }); //END LOAD
    }); //END READY
})(jQuery);

//-------USERS PHOTO SORTABLE

function sortable_list ()
{
	 var itemList = jQuery('#usersultra-photolist');

    itemList.sortable({
        update: function(event, ui) {

            opts = {
                url: ajaxurl, // ajaxurl is defined by WordPress and points to /wp-admin/admin-ajax.php
                type: 'POST',
                async: true,
                cache: false,
                dataType: 'json',
                data:{
                    action: 'sort_photo_list', // Tell WordPress how to handle this ajax request
                    order: itemList.sortable('toArray').toString() // Passes ID's of list items in  1,3,2 format
                },
                success: function(response) {
                    jQuery('#loading-animation').hide(); // Hide the loading animation
                    return; 
                },
                error: function(xhr,textStatus,e) {  // This can be expanded to provide more information
                    alert(e);
                    // alert('There was an error saving the updates');
                    jQuery('#loading-animation').hide(); // Hide the loading animation
                    return; 
                }
            };
            $.ajax(opts);
        }
    }); 
	
}

//-------USERS GALLERY SORTABLE
function sortable_gallery_list ()
{
	 var itemList = jQuery('#usersultra-gallerylist');

    itemList.sortable({
        update: function(event, ui) {
           // $('#loading-animation').show(); // Show the animate loading gif while waiting

            opts = {
                url: ajaxurl, // ajaxurl is defined by WordPress and points to /wp-admin/admin-ajax.php
                type: 'POST',
                async: true,
                cache: false,
                dataType: 'json',
                data:{
                    action: 'sort_gallery_list', // Tell WordPress how to handle this ajax request
                    order: itemList.sortable('toArray').toString() // Passes ID's of list items in  1,3,2 format
                },
                success: function(response) {
                   jQuery('#loading-animation').hide(); // Hide the loading animation
                    return; 
                },
                error: function(xhr,textStatus,e) {  // This can be expanded to provide more information
                    alert(e);
                    // alert('There was an error saving the updates');
                   jQuery('#loading-animation').hide(); // Hide the loading animation
                    return; 
                }
            };
            jQuery.ajax(opts);
        }
    }); 
	
}

jQuery(document).ready(function($) 
{ 
   if (jQuery('#usersultra-photolist').length > 0) {
	    sortable_list();
	}
	
	if (jQuery('#usersultra-gallerylist').length > 0) {
	    sortable_gallery_list();
	}
  
   
});