
document.addEventListener("DOMContentLoaded", () => { 

    const timestampEl = document.getElementById('timestamp');
    const learnMoreButtons = document.querySelectorAll('.learn-more');   
    const dialogs = document.querySelectorAll('.membership-dialog');
    
    
    if (timestampEl) {
        timestampEl.value = new Date().toISOString();
    }

    
    learnMoreButtons.forEach(button => {

        button.addEventListener('click', function() {

            const dialogId = this.getAttribute('data-modal');
            const dialog = document.getElementById(dialogId);
            if (dialog) dialog.showModal();
        });

        dialogs.forEach(dialog => {
            dialog.addEventListener('click', function(event) {
   
               if (event.target === dialog) dialog.close();
           });
       });
    });

    //  dialogs.forEach(dialog => {
    //      dialog.addEventListener('click', function(event) {

    //         if (event.target === dialog) dialog.close();
    //     });
    // });
    


    


     if (window.location.pathname.includes('thankyou.html')) {
         console.log("On thank you page, URL params:", window.location.search); 
        
        function getUrlParam(param) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
         }
        
         const firstNameEl = document.getElementById('firstName');
         const lastNameEl = document.getElementById('lastName');
        const emailEl = document.getElementById('email');
        const phoneEl = document.getElementById('mobileNumber');
        const businessEl = document.getElementById('businessName');
         const dateEl = document.getElementById('dateSubmitted');
        
         if (firstNameEl) firstNameEl.textContent = getUrlParam('fname') || "Not provided";
         if (lastNameEl) lastNameEl.textContent = getUrlParam('lname') || "Not provided";
         if (emailEl) emailEl.textContent = getUrlParam('email') || "Not provided";
         if (phoneEl) phoneEl.textContent = getUrlParam('phone') || "Not provided";
         if (businessEl) businessEl.textContent = getUrlParam('business') || "Not provided";
        if (dateEl) dateEl.textContent = getUrlParam('timestamp') || new Date().toLocaleString();
     }
});