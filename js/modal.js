import { helpModel } from './models/helpModel.js';
import { settingsModel } from './models/settingsModel.js';

export function modal() {
    var modal;
    function openModal(prop) {
        modal = prop;
        console.log(modal);
        var modalContent = document.getElementById('modal-content');
        document.getElementById('modal').classList.add('modal-open');
        if (modal === 'help') {
            modalContent.querySelector('h2').innerText = helpModel.title;
            modalContent.querySelector('p').innerText = helpModel.content;
        }
        else if (modal === 'settings') {
            modalContent.querySelector('h2').innerText = settingsModel.title;
            modalContent.querySelector('p').innerText = settingsModel.content;
            modalContent.insertAdjacentHTML('beforeend', '<input type="color" id="color" value="#3D3D3D">');
            document.getElementById('color').addEventListener('change', (e) => {
                document.body.style.backgroundColor = e.target.value;
            });
        }
    }

    function closeModal() {
        document.getElementById('modal').classList.remove('modal-open');
        document.getElementById('modal-content').querySelector('input') ? document.getElementById('modal-content').querySelector('input').remove() : null;
    }

    document.getElementById('help').addEventListener('click', () => openModal('help'));
    document.getElementById('settings').addEventListener('click', () => openModal('settings'));
    document.getElementById('close').addEventListener('click', () => closeModal());
}