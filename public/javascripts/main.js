// var AddForm = $('#AddBook')
// AddForm.submit((e) => {
//     e.preventDefault();
//     $.ajax({
//         url: '/admin/Add-book',
//         method: 'post',
//         data: AddForm.serialize(),
//         succes: (response) => {
//             if (response.status) {
//                 $('#books').load(window.location.href+' #books')
//             }
//         }
//     })
// })
function book(bookid) {
    console.log(bookid);
    let onOffBtn = document.getElementById('book'+bookid)
    if (!onOffBtn.checked) {
        console.log('test');
        $.ajax({
            url: '/admin/deleteBook',
            method: 'post',
            data: { book: bookid },
            success: () => {
                // $("#responsive-data-table").load(window.location.href + " #responsive-data-table")
                location.reload()


            }
        })
    } else if (onOffBtn.checked) {
        $.ajax({
            url: '/admin/EnableMainCat',
            method: 'post',
            data: { MainCatId: maincategoryId },
            success: (response) => {
                if(response.status){
                    // $("#responsive-data-table").load(window.location.href + " #responsive-data-table")
                    location.reload()

                    // location.reload()
                }
            }
        })
    }
}