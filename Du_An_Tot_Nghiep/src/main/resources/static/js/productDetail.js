var btnOpen = document.querySelector('.open_modal_btn')
    var modal = document.querySelector('.modal1')
    var iconClose = document.querySelector('.modal1_header i')
    var btnClose = document.querySelector('.modal1_footer button')
	var tag = document.querySelectorAll(".tag");
    var comment = document.getElementById("comment");
    var AllComment = '';
    
    function toggleModal() {
        modal.classList.toggle('hide')
    }
	
    btnOpen.addEventListener('click', toggleModal)
    btnClose.addEventListener('click', toggleModal)
    iconClose.addEventListener('click', toggleModal)
    modal.addEventListener('click', function (e) {
        if (e.target == e.currentTarget) {
            toggleModal()
        }
    })
    
    function tagNodeList(index){
    	var tagindex = tag.item(index);
        if(comment.value.length == 0){
            AllComment = tagindex.textContent;
        }else{
            AllComment += ', '+tagindex.textContent; 
        }

        comment.innerText = AllComment;
    }
