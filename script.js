document.addEventListener('DOMContentLoaded', function() {
    // Define openSettingsBtn here
    const openSettingsBtn = document.getElementById('openSettingsBtn');
    
    // Sample data for folders and photos
    const folders = [
        { id: 'vacations', name: 'Vacations' },
        { id: 'family', name: 'Family' },
        { id: 'friends', name: 'Friends' },
        { id: 'nature', name: 'Nature' }

    ];

    const photos = [
        { id: 1, folderId: 'vacations', src: './images/vocation1.jpg', alt: 'Vacation Photo 1' },
        { id: 2, folderId: 'family', src: './images/family1.jpg', alt: 'Family Photo 1' },
        { id: 3, folderId: 'friends', src: './images/friends3.jpg', alt: 'Friend Photo 1' },
        { id: 4, folderId: 'vacations', src: './images/vocation2.jpg', alt: 'Vacation Photo 2' },
        { id: 5, folderId: 'friends', src: './images/friends1.jpg', alt: 'Friends Photo 2' },
        { id: 6, folderId: 'friends', src: './images/friends.jpg', alt: 'Friend Photo 2' },
        { id: 6, folderId: 'nature', src: './images/nature.jpg', alt: 'Nature Photo 2' },
        { id: 6, folderId: 'nature', src: './images/nature1.jpg', alt: 'Nature Photo 2' }
    ];

    const folderList = document.getElementById('folders');
    const photoGrid = document.getElementById('photo-grid');
    const searchInput = document.getElementById('search');
    const settingsModal = document.getElementById('settingsModal');
    const closeBtn = settingsModal.querySelector('.close');
    const primaryColorInput = document.getElementById('primaryColor');
    const backgroundImageInput = document.getElementById('backgroundImage');
    const layoutSelect = document.getElementById('layout');
    const applyChangesBtn = document.getElementById('applyChangesBtn');

    // Function to display folders
    function displayFolders() {
        // Loop through folders array and create folder elements
        folders.forEach(folder => {
            const folderElement = document.createElement('a');
            folderElement.href = '#';
            folderElement.className = 'list-group-item list-group-item-action';
            folderElement.textContent = folder.name;
            folderElement.dataset.folderId = folder.id;
            folderElement.addEventListener('click', function(event) {
                event.preventDefault();
                filterPhotosByFolder(folder.id);
                document.querySelectorAll('#folders a').forEach(el => el.classList.remove('active'));
                folderElement.classList.add('active');
            });
            folderList.appendChild(folderElement);
        });

        // Add event listener for 'All Photos' folder
        const allPhotosElement = document.querySelector('[data-folder-id="all"]');
        allPhotosElement.addEventListener('click', function(event) {
            event.preventDefault();
            filterPhotosByFolder('all');
            document.querySelectorAll('#folders a').forEach(el => el.classList.remove('active'));
            allPhotosElement.classList.add('active');
        });
    }

    // Function to display photos
    function displayPhotos(filteredPhotos) {
        photoGrid.innerHTML = '';
        // Loop through filtered photos and create photo elements
        filteredPhotos.forEach(photo => {
            const photoCol = document.createElement('div');
            photoCol.className = 'col-6 col-md-4 col-lg-3';
            photoCol.innerHTML = `
                <div class="card">
                    <img src="${photo.src}" alt="${photo.alt}" class="card-img-top">
                </div>
            `;
            photoGrid.appendChild(photoCol);
        });
    }

    // Function to filter photos by folder
    function filterPhotosByFolder(folderId) {
        const filteredPhotos = folderId === 'all' ? photos : photos.filter(photo => photo.folderId === folderId);
        displayPhotos(filteredPhotos);
    }

    // Function to filter photos by search query
    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();
        const filteredPhotos = photos.filter(photo => photo.alt.toLowerCase().includes(query));
        displayPhotos(filteredPhotos);
    });

    // Open settings modal
    openSettingsBtn.addEventListener('click', function() {
        settingsModal.style.display = 'block';
    });

    // Close settings modal
    closeBtn.addEventListener('click', function() {
        settingsModal.style.display = 'none';
    });

    // Apply changes
    applyChangesBtn.addEventListener('click', function() {
        const primaryColor = primaryColorInput.value;
        const backgroundImage = backgroundImageInput.files[0];
        const layout = layoutSelect.value;

        applyColor(primaryColor);
        applyBackgroundImage(backgroundImage);
        applyLayout(layout);

        settingsModal.style.display = 'none';
    });

    // Function to apply color changes
    function applyColor(color) {
        // Remove existing background color classes
        document.querySelectorAll('.bg-custom-primary').forEach(element => {
            element.classList.remove('bg-custom-primary');
        });

        // Set new primary color
        document.documentElement.style.setProperty('--primary-color', color);

        // Apply new background color class
        document.querySelectorAll('.bg-primary, .navbar, .navbar').forEach(element => {
            element.classList.add('bg-custom-primary');
        });

        // Set new text color for buttons
        document.querySelectorAll('.btn-primary').forEach(btn => {
            btn.style.backgroundColor = color;
            btn.style.borderColor = color;
        });

        // Remove active class from all folders
        document.querySelectorAll('.list-group-item').forEach(item => {
            item.classList.remove('active');
            item.style.backgroundColor = ''; // Reset background color
            item.style.color = ''; // Reset text color
        });

        // Reapply active class and color to currently active folder
        const activeFolder = document.querySelector('.list-group-item.active');
        if (activeFolder) {
            activeFolder.classList.add('active');
            activeFolder.style.backgroundColor = color;
            activeFolder.style.color = '#fff'; // Change the text color as needed
        }
    }

    // Function to apply background image
    function applyBackgroundImage(image) {
        if (image) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.body.style.backgroundImage = `url('${event.target.result}')`;
            };
            reader.readAsDataURL(image);
        }
    }

    // Function to apply layout
    function applyLayout(layout) {
        const photoGrid = document.getElementById('photo-grid');

        if (layout === 'grid') {
            // Toggle Bootstrap grid layout classes
            photoGrid.classList.remove('list-group');
            photoGrid.classList.add('row', 'g-3');
        } else if (layout === 'list') {
            // Toggle Bootstrap list layout classes
            photoGrid.classList.remove('row', 'g-3');
            photoGrid.classList.add('list-group');
        }
    }

    // Initial color setup
    applyColor('#007bff');

    // Display folders and photos
    displayFolders();
    displayPhotos(photos);
});

