document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    if (!main) return;

    let openPanel = null;
    let openTile = null;

    // --- FIX: Scrollbar Compensation Logic START ---
    // Function to accurately measure the scrollbar width
    const getScrollbarWidth = () => {
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        // Force the appearance of a scrollbar so we can measure its width
        outer.style.overflow = 'scroll'; 
        document.body.appendChild(outer);

        const inner = document.createElement('div');
        outer.appendChild(inner);

        // Width = outer container width - inner content width
        const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

        outer.remove(); // Clean up the temporary element
        return scrollbarWidth;
    };

    // Global variable to store the calculated width
    let scrollbarCompensation = 0;
    // --- FIX: Scrollbar Compensation Logic END ---


    // helper: convert category string to valid class
    const slugify = (text) => text?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || '';

    // close existing panel
    const closePanel = () => {
        if (openPanel) {
            // pause any videos
            openPanel.querySelectorAll('video').forEach(v => {
                try { v.pause(); v.currentTime = 0; } catch(e) {}
            });
            
            // FIX: Remove compensation padding when closing to restore normal layout
            document.body.style.paddingRight = ''; 
            
            openPanel.remove();
            openPanel = null;
            openTile = null;
        }
    };

    // create panel from a tile
    const createPanel = (tile) => {
        closePanel();

        const title = tile.dataset.title || tile.querySelector('h3')?.textContent || '';
        const creator = tile.dataset.creator || tile.querySelector('.creator')?.textContent || '';
        const cat = tile.dataset.category || tile.querySelector('.cat')?.textContent || '';
        const slug = slugify(cat);

        // get media source
        let src = tile.dataset.src || tile.querySelector('img')?.src || tile.querySelector('video')?.dataset.src || tile.querySelector('video')?.src || '';
        const isVideo = /\.(mp4|mov|webm|ogg)$/i.test(src) || !!tile.querySelector('video');

        // panel wrapper
        const panel = document.createElement('div');
        panel.className = 'expanded-panel';
        if (slug) panel.classList.add('cat-' + slug);

        // close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'expanded-close';
        closeBtn.textContent = '✕';
        closeBtn.title = 'Close';
        closeBtn.addEventListener('click', closePanel);
        panel.appendChild(closeBtn);

        // inner layout
        const inner = document.createElement('div');
        inner.className = 'expanded-inner';

        // FIX: Corrected class name for centering (media-wrap)
        const mediaWrap = document.createElement('div');
        mediaWrap.className = 'media-wrap'; 

        if (isVideo) {
            const video = document.createElement('video');
            const vTag = tile.querySelector('video');
            video.src = vTag?.dataset.src || vTag?.src || src;
            video.controls = true;
            video.autoplay = true;
            video.playsInline = true;
            mediaWrap.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = src;
            img.alt = title;
            mediaWrap.appendChild(img);
        }

        const infoWrap = document.createElement('div');
        infoWrap.className = 'expanded-info';
        const h = document.createElement('h3'); h.textContent = title;
        const pCreator = document.createElement('p'); pCreator.className = 'meta-row'; pCreator.textContent = 'By ' + creator;
        infoWrap.appendChild(h);
        infoWrap.appendChild(pCreator);

        inner.appendChild(mediaWrap);
        inner.appendChild(infoWrap);
        panel.appendChild(inner);

        return panel;
    };

    // click handler for tiles
    main.addEventListener('click', (e) => {
        const tile = e.target.closest('.tile');
        if (!tile) return;

        // toggle if same tile
        if (tile === openTile) {
            closePanel();
            return;
        }
        
        // FIX: Apply compensation padding BEFORE opening the panel
        if (document.body.scrollHeight > window.innerHeight && scrollbarCompensation === 0) {
            scrollbarCompensation = getScrollbarWidth();
        }
        document.body.style.paddingRight = `${scrollbarCompensation}px`;


        const panel = createPanel(tile);

        // insert panel below the tile's category section
        const section = tile.closest('.category-section');
        if (section) section.after(panel);
        else tile.after(panel);

        // ✅ RESTORED: The original logic to scroll the page down to the panel
        setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80); 

        openPanel = panel;
        openTile = tile;
    });

    // close on ESC
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePanel(); });

    // click outside panel closes it
    document.addEventListener('click', (e) => {
        if (!openPanel) return;
        if (!openPanel.contains(e.target) && !e.target.closest('.tile')) {
            if (e.target.closest('main')) closePanel();
        }
    });
});
