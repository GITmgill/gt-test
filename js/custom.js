$(function() {
	function gtHeader() {
		$.get('components/header.html', function(data) {
	        $(first).html(data);
	    });
	}
	gtHeader();

	function gtFooter() {
		$.get('components/footer.html', function(data) {
	        $(last).html(data);
	    });
	}
	gtFooter();

	function prismTime() {
		Prism.highlightAll();
	}
	setTimeout(prismTime, 100);

	function newSection() {
		$('#saveButton').on('click', function() {
			$('.gt-control').hide();
			$('.active').removeClass('active');
			Prism.highlightAll();
			$.get('components/secs.html', function(data) {
				$(preview).append(data);
			});
		});
	}
	newSection();

	function removeSection() {
		$(document).on('click', '.removeButton', function() {
			var removeButton = $(this).parent();
			if (removeButton.hasClass('stay')) {
				removeButton.empty();
				$('.gt-control').hide();
			} else {
				removeButton.remove();
			}
			$('#preview').find('section:last-child').addClass('active');
		});
	}

	function htmlMachine() {
	    // When you click radio class layout option
	    $('.layoutOption').on('click', function() {
	    	var stay = $('.active.stay').length;
	    	//Show Controls
	    	$('.gt-control').show();
	        //set a variable for whichever radio clicked, and grab its data attr "comp"
	        var dataChecker = $(this).data('comp');
	        // if radio is checked
	        if($(this).parent().find('input').is(':checked')) {
	        // get the html partial
	        removeSection(stay);
	        getComponent(dataChecker);
	        }
	    });
	}
	htmlMachine();
	//make request to grab specific item in components 
	function getComponent(dataChecker) {
	    var active = $('.active');
	    //set the correct path
	    var pathCrawl = "components/" + dataChecker;
	    //get the html file and add it to the preview element
	    $.get(pathCrawl, function(data) {
	        $(active).html(data);
	    });
	}
});