'use strict';
/**
 * Attaches a tooltip behavior to a given DOM element. 
 * When the element is hovered over, a tooltip is automaticcally shown below the element hovered.
 * @param {HTMLElement} $element 
 */
export const Tooltip = function ($element) {
    const $tooltip = document.createElement('span');
    $tooltip.classList.add('tooltip', 'text-body-small');
    $element.addEventListener('mouseenter', function () {
        $tooltip.textContent = this.dataset.tooltip;
        const {
            top,
            left,
            height,
            width
        } = this.getBoundingClientRect();

        $tooltip.style.top = top + height + 4 + 'px';
        $tooltip.style.left = left + width / 2 + 'px';
        $tooltip.style.transform = 'translateX(-50%)';
        document.body.appendChild($tooltip);
    });

    $element.addEventListener('mouseleave', $tooltip.remove.bind($tooltip));
}