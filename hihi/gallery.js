/* ---------- gallery.js (drop into project) ---------- */
/* This script adds inline expand behavior:
   - Click any .tile to open an inline .expanded-panel inserted into the grid (spans full width)
   - Clicking the same tile again closes the panel
   - Only one panel open at a time
   - Esc key closes panel
   - Video playback handled for video tiles
*/

document.addEventListener('DOMContentLoaded', () => {
  // We'll target the main element that contains category sections
  const main = document.querySelector('main');
  if (!main) return;

  let openPanel = null;
  let openForTile = null;

  // helper: convert category string to a valid class suffix
  const slugFromCategory = (cat) => {
    if (!cat) return '';
    return cat.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  };

  function closePanel() {
    if (openPanel) {
      // pause any playing videos inside panel
      const vids = openPanel.querySelectorAll('video');
      vids.forEach(v=>{ try{ v.pause(); v.currentTime = 0; } catch(e){} });
      openPanel.remove();
      openPanel = null;
      openForTile = null;
    }
  }

  function createPanelForTile(tile) {
    closePanel();

    // read data
    const title = tile.dataset.title || tile.querySelector('h3')?.textContent || '';
    const creator = tile.dataset.creator || tile.querySelector('.creator')?.textContent || '';
    // prefer data-src if exists (videos originally use data-src in your markup), otherwise look for <img src> or <video src>
    let src = tile.dataset.src || tile.querySelector('img')?.getAttribute('src') || tile.querySelector('video')?.getAttribute('data-src') || tile.querySelector('video')?.getAttribute('src') || '';
    const isVideo = /\.(mp4|mov|webm|ogg)$/i.test(src) || !!tile.querySelector('video');

    // build panel element
    const panel = document.createElement('div');
    panel.className = 'expanded-panel';

    // add category class for accent strip
    const cat = tile.dataset.category || tile.querySelector('.cat')?.textContent || '';
    const slug = slugFromCategory(cat);
    if (slug) panel.classList.add('cat-' + slug);

    // close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'expanded-close';
    closeBtn.innerHTML = '✕';
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
      // try to find actual video src: prefer data-src from tile's <video> tag if present
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
    const h = document.createElement('h3'); h.textContent = title;
    const pCreator = document.createElement('p'); pCreator.className = 'meta-row'; pCreator.textContent = 'By ' + creator;
    const pDesc = document.createElement('p'); pDesc.textContent = ''; // optional description

    infoWrap.appendChild(h);
    infoWrap.appendChild(pCreator);
    infoWrap.appendChild(pDesc);

    inner.appendChild(mediaWrap);
    inner.appendChild(infoWrap);
    panel.appendChild(inner);

    return panel;
  }

  // delegate click handling across the main area
  main.addEventListener('click', (e) => {
    const tile = e.target.closest('.tile');
    if (!tile) return;

    // if clicked the same tile that's already open -> close
    if (openForTile === tile) {
      closePanel();
      return;
    }

    // create new panel for this tile
    const panel = createPanelForTile(tile);

    // insert the panel right after the tile's section (we want it between rows)
    // find the parent row
    const parentRow = tile.closest('.row');
    if (parentRow) {
      // insert after the parent section (so panel spans full width under the section)
      const section = parentRow.closest('.category-section');
      if (section) {
        section.after(panel);
      } else {
        parentRow.after(panel);
      }
    } else {
      // fallback: insert after tile
      tile.after(panel);
    }

    // small delay so CSS animation can run, then scroll
    setTimeout(() => {
      panel.scrollIntoView({behavior:'smooth', block:'center'});
    }, 80);

    openPanel = panel;
    openForTile = tile;

    // close any other open panels that might remain (ensures single panel)
    document.querySelectorAll('.expanded-panel').forEach(p => {
      if (p !== openPanel) p.remove();
    });
  });

  // close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePanel();
  });

  // clicking outside panel but inside main (and not on a tile) closes the panel
  document.addEventListener('click', (e) => {
    if (!openPanel) return;
    const clickInsidePanel = openPanel.contains(e.target);
    const clickOnTile = e.target.closest('.tile');
    if (!clickInsidePanel && !clickOnTile) {
      const clickedInMainArea = e.target.closest('main') !== null;
      if (clickedInMainArea) closePanel();
    }
  });

});
