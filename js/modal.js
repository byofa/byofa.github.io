import { helpModel } from './models/helpModel.js';
import { settingsModel } from './models/settingsModel.js';

export function modal() {
    var color = '#161F3C';
    function openModal(prop) {
        modal = prop;
        console.log(modal);
        var modalContent = document.getElementById('modal-content');
        document.getElementById('modal').classList.add('modal-open');
        if (modal === 'help') {
            modalContent.querySelector('h1').innerText = helpModel.title;
            modalContent.querySelector('p').innerText = helpModel.content;
        }
        else if (modal === 'settings') {
            modalContent.querySelector('h1').innerText = settingsModel.title;
            modalContent.querySelector('p').innerText = settingsModel.content;
            modalContent.insertAdjacentHTML('beforeend', '<label for="color">Background Color:</label>');
            modalContent.insertAdjacentHTML('beforeend', '<br>');
            modalContent.insertAdjacentHTML('beforeend', '<br>');
            modalContent.insertAdjacentHTML('beforeend', '<input type="color" id="color" value="' + color + '">');
            modalContent.insertAdjacentHTML('beforeend', '<br>');
            modalContent.insertAdjacentHTML('beforeend', '<p>OR</p>');
            modalContent.insertAdjacentHTML('beforeend', '<label for="file">Background Image:</label>');
            modalContent.insertAdjacentHTML('beforeend', '<br>');
            modalContent.insertAdjacentHTML('beforeend', '<br>');
            modalContent.insertAdjacentHTML('beforeend', '<input type="file" id="file" name="background" accept="image/png, image/jpeg">');

            document.getElementById('color').addEventListener('input', (e) => {
                document.body.style.backgroundColor = e.target.value;
                color = e.target.value;
            });

            document.getElementById('file').addEventListener('change', (e) => {
                var reader = new FileReader();
                reader.onload = function (e) {
                    document.body.style.backgroundImage = 'url(' + e.target.result + ')';
                };
                reader.readAsDataURL(e.target.files[0]);
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