/**
 * 
 */
 
    var btnOpen = document.querySelector('.site-btn .mt-3 .open_modal_btn')
    var modal = document.querySelector('.modal')
    var iconClose = document.querySelector('.modal_header i')
    var btnClose = document.querySelector('.modal_footer button')

    function toggleModal() {
        modal.classList.toggle('hide')
    }

    function getTextComment(){
        var text = document.querySelector("#comment").value;
        console.log(text);
        modal.classList.toggle('hide')
    }

    btnOpen.addEventListener('click', toggleModal)
    btnClose.addEventListener('click', getTextComment)
    iconClose.addEventListener('click', toggleModal)
    modal.addEventListener('click', function (e) {
        if (e.target == e.currentTarget) {
            toggleModal()
        }
    })

    function checkStart(item) {
        var start = item;
        console.log(start);
    }