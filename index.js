const loginButtons = document.querySelectorAll('.btn-login');
loginButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        this.classList.add('clicked');
        setTimeout(() => {
          this.classList.remove('clicked');
        }, 150);
      });
})