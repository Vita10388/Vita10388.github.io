/* ---------- gallery.js ----------
   Inline expand gallery behavior:
   - Click any .tile to open an inline expanded panel
   - Only one panel open at a time
   - Click again or press ESC to close
*/

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('art-grid');
  if (!grid) return;

  let openPanel = null;
  let openForTile = null;

  const slugFromCategory = (cat) => {
    if (!cat) return '';
    return cat.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  };

  function closePanel() {
    if (openPanel) {
      const vids = openPanel.querySelectorAll('video');
      vids.forEach(v => {
        try {
          v.pause();
          v.currentTime = 0;
        } catch (e) {}
      });
      openPanel.remove();
      openPanel = null;
      openForTile = null;
    }
  }

  function createPanelForTile(tile) {
    closePanel();

    const title = tile.dataset.title || tile.querySelector('h3')?.textContent || '';
    const creator = tile.dataset.creator || tile.querySelector('.creator')?.textContent || '';
    let src = tile.dataset.src || tile.querySelector('img')?.getAttribute('src') || tile.querySelector('video')?.getAttribute('data-src') || tile.querySelector('video')?.getAttribute('src') || '';
    const isVideo = /\.(mp4|mov|webm|ogg)$/i.test(src) || !!tile.querySelector('video');

    const panel = document.createElement('div');
    panel.className = 'expanded-panel';

    const cat = tile.dataset.category || tile.querySelector('.cat')?.textContent || '';
    const slug = slugFromCategory(cat);
    if (slug) panel.classList.add('cat-' + slug);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'expanded-close';
    closeBtn.innerHTML = '✕';
    closeBtn.title = 'Close';
    closeBtn.addEventListener('click', closePanel);
    panel.appendChild(closeBtn);

    const inner = document.createElement('div');
    inner.className = 'expanded-inner';

    const mediaWrap = document.createElement('div');
    mediaWrap.className = 'expanded-media';

    if (isVideo) {
      const video = document.createElement('video');
      const vTag = tile.querySelector('video');
      let vsrc = '';
      if (vTag) vsrc = vTag.getAttribute('data-src') || vTag.getAttribute('src') || src;
      else vsrc = src;
      video.src = vsrc;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.style.maxHeight = '70vh';
      mediaWrap.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.src = src;
      img.alt = title;
      mediaWrap.appendChild(img);
    }

    const infoWrap = document.createElement('div');
    infoWrap.className = 'expanded-info';
    const h = document.createElement('h3');
    h.textContent = title;
    const pCreator = document.createElement('p');
    pCreator.className = 'meta-row';
    pCreator.textContent = 'By ' + creator;

    infoWrap.appendChild(h);
    infoWrap.appendChild(pCreator);

    inner.appendChild(mediaWrap);
    inner.appendChild(infoWrap);
    panel.appendChild(inner);

    return panel;
  }

  grid.addEventListener('click', (e) => {
    const tile = e.target.closest('.tile');
    if (!tile) return;

    if (openForTile === tile) {
      closePanel();
      return;
    }

    const panel = createPanelForTile(tile);
    tile.after(panel);

    setTimeout(() => {
      panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);

    openPanel = panel;
    openForTile = tile;

    document.querySelectorAll('.expanded-panel').forEach(p => {
      if (p !== openPanel) p.remove();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePanel();
  });

  document.addEventListener('click', (e) => {
    if (!openPanel) return;
    const clickInsidePanel = openPanel.contains(e.target);
    const clickOnTile = e.target.closest('.tile');
    const clickedInGridArea = e.target.closest('#art-grid') !== null;
    if (!clickInsidePanel && !clickOnTile && clickedInGridArea) {
      closePanel();
    }
  });
});
