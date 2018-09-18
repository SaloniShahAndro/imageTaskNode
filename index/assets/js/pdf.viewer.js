// --------------------------------------------------------------------------------------
//                              Left Navigation Code
// --------------------------------------------------------------------------------------

var jdocs; // need to be initalised from the left navigation bar
var doc_index = -1;

$(function(){
    $("body").addClass("full-container-width");

    $("body").on("click",".load-file",function(e){
        e.preventDefault();
        doc_index = $(this).data("doccounter");
        showDoc(doc_index ,true);
    });
    
    $("body").on("click",".show_summary",function(){
        showMeeting();
    });

    $("body").on("click","#navToggle",function(){
        $("#main_navigation").toggle();
        $("#meeting_nav").toggle();
    });
})

function showDoc(index , firstpage){
    $(".meeting-detail").hide();
    $(".agenda-detail").show();
    console.log("=======>",jdocs[doc_index]);
    var doc = jdocs[doc_index];
    var fileurl = doc.document_path;
    var password = doc.doc.split("-")[0];

    $("#agedaMenu li").removeClass("active");
    $("#doc"+doc_index).addClass("active");
    $("li.child-menu").removeClass("open-menu");
    $("#doc"+doc_index+".active").parents("li.child-menu").addClass("open-menu");

    showPDF(fileurl,password,firstpage);
    // $(".agenda-doc-title").text($(this).data("title")+" ( "+ doc.name +" ) ");
}

function showMeeting(){
    $(".meeting-detail").show();
    $(".agenda-detail").hide();
    __CURRENT_PAGE = undefined;
    __TOTAL_PAGES = undefined;
    doc_index = -1;
}

// --------------------------------------------------------------------------------------
//                              PDF View Code
// --------------------------------------------------------------------------------------

var __CANVAS ,__CANVAS_CTX;

$(function(){
    setWidth();
})

function setWidth(){
    $("#pdf-canvas").attr('width',$("#pdf-main-container").width());
    __CANVAS = $('#pdf-canvas').get(0),
    __CANVAS_CTX = __CANVAS.getContext('2d');
}

var __PDF_DOC,
	__CURRENT_PAGE,
    __TOTAL_PAGES,
    __PAGE_RENDERING_IN_PROGRESS = 0;


var currPage = 1; //Pages are 1-based not 0-based
var numPages = 0;
var thePDF = null;

function download(){
    var doc = jdocs[doc_index];
    var link = document.createElement("a");
    // link.download = doc.name;
    link.download = doc.doc;    
    link.href = doc.document_path;
    link.click();
}

function showPDF(pdf_url,password,first) {
    $("#pdf-loader").show();
    setWidth();
	PDFJS.getDocument({ url: pdf_url , password : password  }).then(function(pdf_doc) {
        
		__PDF_DOC = pdf_doc;
		__TOTAL_PAGES = __PDF_DOC.numPages;
		
		// Hide the pdf loader and show pdf container in HTML
		$("#pdf-loader").hide();
		$("#pdf-contents").show();
		$("#pdf-total-pages").text(__TOTAL_PAGES);

        if(first)
            showPage(1); // Show the first page
        else 
            showPage(__TOTAL_PAGES); // Show the last page

        loadNext();
        // $("#pdf-canvas").show();
		// $("#page-loader").hide();
        // pdf_doc.getPage( 1 ).then( handlePages );
	
    }).catch(function(error) {
		// If error re-show the upload button
		$("#pdf-loader").hide();
		$("#upload-button").show();
		
		alert(error.message);
    });
}

function loadNext(){
    if(doc_index < jdocs.length-1 ) {
        var doc = jdocs[doc_index+1];
        var fileurl = doc.document_path;
        var password = doc.doc.split("-")[0];
        PDFJS.getDocument({ url: fileurl , password : password  });
    }
}

function handlePages(page)
{
    //This gives us the page's dimensions at full scale
    var scale_required = $("#pdf-main-container").width() / page.getViewport(1).width;
    var viewport = page.getViewport( scale_required );

    //We'll create a canvas for each page to draw it on
    var canvas = document.createElement( "canvas" );
    canvas.style.display = "block";
    var context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    canvas.id = "pdf"+currPage;

    //Draw it on the canvas
    page.render({canvasContext: context, viewport: viewport});

    //Add it to the web page
    document.getElementById("pdf-canvas-all").appendChild( canvas );

    //Move to next page
    currPage++;
    if ( __PDF_DOC !== null && currPage <= __TOTAL_PAGES )
    {
        __PDF_DOC.getPage( currPage ).then( handlePages );
    }
}

function showPage(page_no) {
    __PAGE_RENDERING_IN_PROGRESS = 1;
    __CURRENT_PAGE = page_no;

    // Disable Prev & Next buttons while page is being loaded
    $("#pdf-next, #pdf-prev").attr("disabled", "disabled");

    // While page is being rendered hide the canvas and show a loading message
    // $("#pdf-canvas").hide();
    $("#page-loader").show();

    // Fetch the page
    __PDF_DOC.getPage(page_no).then(function(page) {

        // Update current page in HTML
        $("#pdf-current-page").text(page_no);
        $("#pagenumber").val(page_no);

        // alert($("#pdf-main-container").width());
        // As the canvas is of a fixed width we need to set the scale of the viewport accordingly
        var scale_required = __CANVAS.width / page.getViewport(1).width;

        // Get viewport of the page at required scale
        var viewport = page.getViewport(scale_required);

        // Set canvas height
        __CANVAS.height = viewport.height;

        var renderContext = {
            canvasContext: __CANVAS_CTX,
            viewport: viewport
        };
        
        // Render the page contents in the canvas
        page.render(renderContext).then(function() {
            __PAGE_RENDERING_IN_PROGRESS = 0;

            // Re-enable Prev & Next buttons
            $("#pdf-next, #pdf-prev").removeAttr("disabled");

            // Show the canvas and hide the page loader
            $("#pdf-canvas").show();
            $("#page-loader").hide();
        });
    });
}

// Previous page of the PDF
$("#pdf-prev").on("click", function() {
	if(__CURRENT_PAGE && __CURRENT_PAGE != 1) {
		showPage(--__CURRENT_PAGE);
    } else {
        if(doc_index > 0) {
            showDoc(--doc_index ,false );
        } else {
            showMeeting();
        }
    }
});

// Next page of the PDF
$("#pdf-next").on("click", function() {
	if(__CURRENT_PAGE && __CURRENT_PAGE != __TOTAL_PAGES) {
		showPage(++__CURRENT_PAGE);
    } else {
        ++doc_index;
        if(jdocs.length <= doc_index) {
            doc_index = jdocs.length-1;
            // $("#pdf-next").hide();
        } else {
            showDoc(doc_index , true);
        }
    }
});

$("#gotopage").on("click",function(){
    var pagenumber = $("#pagenumber").val();
    if(!isNaN(pagenumber)) {
        if(pagenumber > 0 && pagenumber <= __TOTAL_PAGES) {
            showPage(+pagenumber);
        } else {
            $("#pagenumber").val(__CURRENT_PAGE);
            alert("Please enter valid page");
        }
    } else {
        $("#pagenumber").val(__CURRENT_PAGE);
        alert("Please enter valid page");
    }
})