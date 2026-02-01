
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.accessibility-toggle');
    const body = document.body;

    if (!toggle) return;

    const enabled = localStorage.getItem('accessibility') === 'true';
    
    if (enabled) body.classList.add('accessibility');

    toggle.addEventListener('click', () => {
        body.classList.toggle('accessibility');
        localStorage.setItem(
            'accessibility',
            body.classList.contains('accessibility')
        );
    })
});
