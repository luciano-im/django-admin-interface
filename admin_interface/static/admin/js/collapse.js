/*global gettext*/
/* copied from django 4.0.7 */
'use strict';
{
    window.addEventListener('load', function() {
        // Add anchor tag for Show/Hide link
        const fieldsets = document.querySelectorAll('fieldset.collapse');
        for (const [i, elem] of fieldsets.entries()) {
            // Don't hide if fields in this fieldset have errors
            if (elem.querySelectorAll('div.errors, ul.errorlist').length === 0) {
                const h2 = elem.querySelector('h2');
                const link = document.createElement('a');
                link.id = 'fieldsetcollapser' + i;
                link.className = 'collapse-toggle';
                link.href = '#';

                // State -> 0: Collapsed, 1: Expanded
                if ('fieldsetName' in elem.dataset) {
                    let fieldsetName = elem.dataset.fieldsetName;
                    // Return NaN if item is not found
                    let fieldsetState = parseInt(localStorage.getItem(fieldsetName));
                    if (isNaN(fieldsetState)) {
                        // Add a new fieldset to localStorage
                        let state = elem.classList.contains('expanded') ? 1 : 0;
                        localStorage.setItem(fieldsetName, state);
                    } else {
                        // Set current fieldset state
                        if (fieldsetState === 1) {
                            elem.classList.add('expanded');
                        } else if (fieldsetState === 0) {
                            elem.classList.remove('expanded');
                        }
                    }
                }

                // changed: can opt into starting visible
                if (elem.classList.contains('expanded')) {
                  link.textContent = gettext('Hide');
                } else {
                  link.textContent = gettext('Show');
                  elem.classList.add('collapsed');
                }
                h2.appendChild(document.createTextNode(' ('));
                h2.appendChild(link);
                h2.appendChild(document.createTextNode(')'));
            }
        }
        // Add toggle to hide/show anchor tag
        const toggleFunc = function(ev) {
            if (ev.target.matches('.collapse-toggle')) {
                ev.preventDefault();
                ev.stopPropagation();
                const fieldset = ev.target.closest('fieldset');
                if (fieldset.classList.contains('collapsed')) {
                    // Show
                    ev.target.textContent = gettext('Hide');
                    fieldset.classList.remove('collapsed');
                    // Change fieldset state
                    if ('fieldsetName' in fieldset.dataset) {
                        localStorage.setItem(fieldset.dataset.fieldsetName, 1);
                    }
                } else {
                    // Hide
                    ev.target.textContent = gettext('Show');
                    fieldset.classList.add('collapsed');
                    // Change fieldset state
                    if ('fieldsetName' in fieldset.dataset) {
                        localStorage.setItem(fieldset.dataset.fieldsetName, 0);
                    }
                }
            }
        };
        document.querySelectorAll('fieldset.module').forEach(function(el) {
            el.addEventListener('click', toggleFunc);
        });
    });
}
