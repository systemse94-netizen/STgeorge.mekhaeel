// Simple content loader for React web (assumes files are in /STgeorge-main/assets/data/... and served statically)
export async function loadJSON(path) {
  try {
    const resp = await fetch(path);
    if (!resp.ok) throw new Error('Failed to fetch ' + path);
    return await resp.json();
  } catch (e) {
    console.error('loadJSON error', e);
    return null;
  }
}

export async function loadAgpeyaList() {
  // adjust filename as needed
  return await loadJSON('/STgeorge-main/assets/data/agpeya/index.json');
}

export async function loadBibleIndex() {
  return await loadJSON('/STgeorge-main/assets/data/bible/index.json');
}
