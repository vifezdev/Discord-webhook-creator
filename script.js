document.getElementById('send-btn').addEventListener('click', function() {
    const webhookUrl = document.getElementById('webhook-url').value;
    const content = document.getElementById('content').value;
    const enableEmbed = document.getElementById('enable-embed').checked;

    const embed = enableEmbed ? {
        author: {
            name: document.getElementById('author').value,
            icon_url: document.getElementById('icon-url').value
        },
        title: document.getElementById('title').value,
        url: document.getElementById('title-url').value,
        description: document.getElementById('description').value,
        color: parseInt(document.getElementById('color').value.replace('#', ''), 16),
        image: {
            url: document.getElementById('image-url').value
        },
        thumbnail: {
            url: document.getElementById('thumbnail-url').value
        },
        footer: {
            text: document.getElementById('footer-text').value,
            icon_url: document.getElementById('footer-icon-url').value
        }
    } : null;

    const payload = JSON.stringify({
        content: content,
        embeds: embed ? [embed] : []
    });

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: payload
    }).then(response => {
        if (response.ok) {
            alert('Message sent!');
        } else {
            alert('Error sending message.');
        }
    }).catch(error => {
        alert('Error: ' + error);
    });
});

function updatePreview() {
    const embedPreview = document.getElementById('embed-preview');
    embedPreview.innerHTML = '';

    if (!document.getElementById('enable-embed').checked) {
        return;
    }

    const author = document.getElementById('author').value;
    const iconUrl = document.getElementById('icon-url').value;
    const title = document.getElementById('title').value;
    const titleUrl = document.getElementById('title-url').value;
    const description = document.getElementById('description').value;
    const color = document.getElementById('color').value;
    const imageUrl = document.getElementById('image-url').value;
    const thumbnailUrl = document.getElementById('thumbnail-url').value;
    const footerText = document.getElementById('footer-text').value;
    const footerIconUrl = document.getElementById('footer-icon-url').value;

    if (author || iconUrl) {
        const authorDiv = document.createElement('div');
        authorDiv.className = 'embed-author';
        if (iconUrl) {
            const authorImg = document.createElement('img');
            authorImg.src = iconUrl;
            authorDiv.appendChild(authorImg);
        }
        const authorSpan = document.createElement('span');
        authorSpan.textContent = author;
        authorDiv.appendChild(authorSpan);
        embedPreview.appendChild(authorDiv);
    }

    if (title) {
        const titleDiv = document.createElement('div');
        titleDiv.className = 'embed-title';
        if (titleUrl) {
            const titleLink = document.createElement('a');
            titleLink.href = titleUrl;
            titleLink.textContent = title;
            titleLink.style.color = '#00aff4';
            titleDiv.appendChild(titleLink);
        } else {
            titleDiv.textContent = title;
        }
        embedPreview.appendChild(titleDiv);
    }

    if (description) {
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'embed-description';
        descriptionDiv.textContent = description;
        embedPreview.appendChild(descriptionDiv);
    }

    if (thumbnailUrl) {
        const thumbnailImg = document.createElement('img');
        thumbnailImg.src = thumbnailUrl;
        thumbnailImg.className = 'embed-thumbnail';
        embedPreview.appendChild(thumbnailImg);
    }

    if (imageUrl) {
        const imageImg = document.createElement('img');
        imageImg.src = imageUrl;
        imageImg.className = 'embed-image';
        embedPreview.appendChild(imageImg);
    }

    if (footerText || footerIconUrl) {
        const footerDiv = document.createElement('div');
        footerDiv.className = 'embed-footer';
        if (footerIconUrl) {
            const footerImg = document.createElement('img');
            footerImg.src = footerIconUrl;
            footerDiv.appendChild(footerImg);
        }
        const footerTextSpan = document.createElement('span');
        footerTextSpan.textContent = footerText;
        footerDiv.appendChild(footerTextSpan);
        embedPreview.appendChild(footerDiv);
    }
}

document.querySelectorAll('input, textarea').forEach(element => {
    element.addEventListener('input', updatePreview);
});

document.getElementById('enable-embed').addEventListener('change', updatePreview);

updatePreview();