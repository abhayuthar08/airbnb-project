(() => {
    "use strict";

    const forms = document.querySelectorAll('.needs-validation');

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        } , false);
    });

    // Example starter JavaScript for disabling form submissions if there are invalid fields
    // const form = document.getElementById('listingForm');
    // form.addEventListener('submit', function(event) {
    //     if (!form.checkValidity()) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //     }
    //     form.classList.add('was-validated');
    // });

    // Example starter JavaScript for disabling form submissions if there are invalid fields
    // const form = document.getElementById('editListingForm');
    // form.addEventListener('submit', function(event) {
    //     if (!form.checkValidity()) {
    //         event.
})