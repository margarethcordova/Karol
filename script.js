document.addEventListener('DOMContentLoaded', function () {
    var imageContainer = document.getElementById('imageContainer');
    var messageContainer = document.getElementById('messageContainer');
    var printButton = document.getElementById('yesBtn');
    var counter = 0;

    // Array de URLs de las imágenes

    var imageUrls = [
        'https://i.ibb.co/gWsnxjk/foto1.jpg',
        'https://i.ibb.co/pPJ9GMJ/foto2.jpg',
        'https://i.ibb.co/Wv8MgpJ/foto3.jpg',
        'https://i.ibb.co/WzJHsh0/foto4.jpg',
        'https://i.ibb.co/MDfQ2xL/foto5.jpg',
        'https://i.ibb.co/sth63gn/foto6.jpg',
        'https://i.ibb.co/YXnm2B4/foto7.jpg',
        'https://i.ibb.co/vks4Q4t/foto8.jpg',
        'https://i.ibb.co/rvVrhP4/foto9.jpg',
        'https://i.ibb.co/qD0YvjL/foto10.jpg'
    ];

    // Función para imprimir las imágenes
    function printImages() {
        var angle = 0;
        var increment = (2 * Math.PI) / imageUrls.length;

        for (var i = 0; i < imageUrls.length; i++) {
            var image = document.createElement('div');
            image.classList.add('image');
            image.style.backgroundImage = 'url(' + imageUrls[i] + ')';

            var radius = 300;
            var x = imageContainer.offsetWidth / 2 + radius * Math.cos(angle);
            var y = imageContainer.offsetHeight / 2 + radius * Math.sin(angle);

            image.style.left = x + 'px';
            image.style.top = y + 'px';

            imageContainer.appendChild(image);

            angle += increment;
        }

            // Hacer las imágenes manipulables
            makeImagesDraggable();

            // Mostrar el mensaje cuando se terminen de imprimir las imágenes
            showMessage();
        }

        // Función para hacer las imágenes manipulables
        function makeImagesDraggable() {
            var images = document.querySelectorAll('.image');
            images.forEach(function (image) {
                makeElementDraggable(image);
            });
        }

        // Función para hacer un elemento manipulable
        function makeElementDraggable(element) {
            var pos1 = 0,
                pos2 = 0,
                pos3 = 0,
                pos4 = 0;

            element.addEventListener('mousedown', dragMouseDown);

            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            }

            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                element.style.top = (element.offsetTop - pos2) + 'px';
                element.style.left = (element.offsetLeft - pos1) + 'px';
            }

            function closeDragElement() {
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }

        // Función para mostrar el mensaje
        function showMessage() {
            messageContainer.style.display = 'block';

            // Hacer el mensaje manipulable
            makeElementDraggable(messageContainer);
        }

        // Manejador de clic en el botón
        printButton.addEventListener('click', function () {
            printImages();
        });
    });
