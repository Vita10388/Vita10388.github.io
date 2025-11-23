document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  if (!main) return;

  let openPanel = null;
  let openTile = null;

  // helper: convert category string to valid class
  const slugify = (text) => text?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || '';

  // close existing panel
  const closePanel = () => {
    if (openPanel) {
      // pause any videos
      openPanel.querySelectorAll('video').forEach(v => {
        try { v.pause(); v.currentTime = 0; } catch(e) {}
      });
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

    const mediaWrap = document.createElement('div');
    mediaWrap.className = 'expanded-media';

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

    const panel = createPanel(tile);

    // insert panel below the tile's category section
    const section = tile.closest('.category-section');
    if (section) section.after(panel);
    else tile.after(panel);

    // scroll into view
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
