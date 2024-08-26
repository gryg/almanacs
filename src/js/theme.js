'use strict';

const storedTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

document.documentElement.setAttribute('data-theme', storedTheme || systemTheme);

const $themeToggler = document.querySelector('[data-theme-btn]');
$themeToggler.addEventListener('click', function () {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});